import e from "express";
import { clearHash } from "../services/cache";

export async function cleanCache(req: e.Request, res: e.Response, next: any) {
  await next();

  clearHash(req.user!._id);
}
