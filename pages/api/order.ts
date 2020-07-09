import moment from "moment";
import cuid from "cuid";
import aws from "aws-sdk";
import { NowRequest, NowResponse } from "@now/node";
import config from "../../config";

const Bucket = "locals-orders-store";

export default async (req: NowRequest, res: NowResponse) => {
  if (req.method !== "POST") {
    res.status(400);
    res.json({ done: false });
    return;
  }

  const prefix = config.id;

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
        Bucket: Bucket,
        Key: documentKey,
        Body: html,
        ACL: "public-read",
        ContentType: "text/html",
        Metadata: {
          brand: config.id,
        },
      })
      .promise();
  } catch (err) {
    console.error(err);
  }

  const baseUrl = `https://${Bucket}.s3.amazonaws.com`;

  res.json({
    done: true,
    url: `${baseUrl}/${documentKey}`,
  });
};
