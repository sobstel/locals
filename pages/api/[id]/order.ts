import moment from "moment";
import cuid from "cuid";
import aws from "aws-sdk";
import { NowRequest, NowResponse } from "@now/node";
import brands from "../../../config/brands";

const STORAGE_BASE_URL = "https://locals-store.s3.eu-central-1.amazonaws.com";

export default async (req: NowRequest, res: NowResponse) => {
  const id = req.query.id as string;
  const validId = id && brands[id];

  if (req.method !== "POST" || !validId) {
    res.status(400);
    res.json({ done: false });
    return;
  }

  const prefix = id;

  const s3 = new aws.S3({
    accessKeyId: process.env.AMZ_ACCESS_KEY,
    secretAccessKey: process.env.AMZ_SECRET_KEY,
    region: process.env.AMZ_REGION,
  });

  const uid = cuid();
  const documentKey = `u/${prefix}/${moment().format(
    "YYYY/MM/DD"
  )}/${uid}.html`;

  try {
    const html = req.body.order;
    await s3
      .putObject({
        Bucket: "locals-store",
        Key: documentKey,
        Body: html,
        ACL: "public-read",
        ContentType: "text/html",
        Metadata: {
          brand: id,
        },
      })
      .promise();
  } catch (err) {
    console.error(err);
  }

  res.json({
    done: true,
    url: `${STORAGE_BASE_URL}/${documentKey}`,
  });
};
