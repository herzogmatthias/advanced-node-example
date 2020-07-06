import { NativeError, Query, DocumentQuery } from "mongoose";
import redis from "redis";

import { promisify } from "util";
import ICacheOptions from "../interfaces/ICacheOptions";
import { getKeys } from "../config/keys";
const keys = getKeys();
const client = redis.createClient(keys!.redisUrl);
const hget = promisify(client.hget).bind(client);

Query.prototype.cache = function (options: ICacheOptions = {}) {
  console.log("Get Cached");
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || "");
  return this;
};

type Exec = (callback?: (err: NativeError, res: any) => void) => Promise<any>;

const exec = Query.prototype.exec;
(Query.prototype.exec as Exec) = async function (
  this: DocumentQuery<any, any>
) {
  if (!this.useCache) {
    return exec.apply(this);
  }
  const key: string = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );
  const cacheValue = await hget(this.hashKey, key);
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc)
      ? doc.map((val) => new this.model(val))
      : new this.model(doc);
  }
  const result = await exec.apply(this);
  client.hset(this.hashKey, key, JSON.stringify(result));
  client.expire(this.hashKey, 10);
  return result;
};

export function clearHash(hashKey: string | number) {
  client.del(JSON.stringify(hashKey));
}
