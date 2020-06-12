import { Query, NativeError, DocumentQuery } from "mongoose";

type Exec = (callback?: (err: NativeError, res: any) => void) => Promise<any>;

const exec = Query.prototype.exec;
(Query.prototype.exec as Exec) = function (this: typeof Query) {
  console.log("Execute Query");
  return exec.apply(this);
};
