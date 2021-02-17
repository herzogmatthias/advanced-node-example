import e from "express";
import { S3 } from "aws-sdk";
import { getKeys } from "../config/keys";
import { v1 } from "uuid";
import { requireLogin } from "../middlewares/requireLogin";

const s3 = new S3({
  region: "eu-central-1",
  credentials: {
    accessKeyId: getKeys()!.accessKeyId,
    secretAccessKey: getKeys()!.secretAccessKey,
  },
});
export const uploadRoutes = (app: e.Express) => {
  app.get("/api/upload", requireLogin, async (req, res) => {
    const key = `${req.user?._id}/${v1()}.jpeg`;

    const signedUrl = await s3.getSignedUrlPromise("putObject", {
      Bucket: "nodejs-advanced-example-bucket",
      ContentType: "image/jpeg",
      Key: key,
    });

    res.send({ key, signedUrl });
  });
};
