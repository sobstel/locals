import * as R from "remeda";
import moment from "moment";
import cuid from "cuid";
import aws from "aws-sdk";
import { NowRequest, NowResponse } from "@now/node";
import { google } from "googleapis";
import { getBrand } from "../../../config/getBrand";

export default async (req: NowRequest, res: NowResponse) => {
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

  const id = req.query.id as string;
  const brand = getBrand(id);
  const prefix = brand.storage.prefix;

  const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACESS_KEY,
    region: process.env.AWS_REGION,
  });

  try {
    const uid = cuid();
    await s3
      .putObject({
        Bucket: "locals-store",
        Key: `u/${prefix}/${moment().format("YYYY/MM/DD")}/${uid}.html`,
        Body: `<html><body><h1>${uid}</h1></body></html`,
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

  res.json({ done: true });
};
