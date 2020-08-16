import e from "express";
import { S3 } from "aws-sdk";
import { getKeys } from "../config/keys";

const s3 = new S3({
  credentials: {
    accessKeyId: getKeys()!.accessKeyId,
    secretAccessKey: getKeys()!.secretAccessKey,
  },
});
export const uploadRoutes = (app: e.Express) => {
  app.get("api/upload", (req, res) => {});
};
