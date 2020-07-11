import dayjs from "dayjs";
import cuid from "cuid";
import aws from "aws-sdk";
import { NowRequest, NowResponse } from "@now/node";
import config from "../../config";
import { mbSendEmail } from "../../utils/email";

const Bucket = "locals-orders-store";

export default async (req: NowRequest, res: NowResponse) => {
  if (req.method !== "POST") {
    res.status(400);
    res.json({ done: false });
    return;
  }

  // TODO: add more defensive checks

  const { client, orderHtml, orderNumber } = req.body;
  const prefix = config.id;

  if (process.env.MAILER === "MG") {
    const r = await mbSendEmail(
      config.email,
      `[${prefix}] Zamówienie nr ${orderNumber}`,
      orderHtml,
      `${client.firstname} ${client.lastname}`,
      client.email
    );
    if (r) {
      res.json({
        done: true,
        id: r.id,
      });
    } else {
      res.status(400);
      res.json({ done: false });
    }
    return;
  }

  const s3 = new aws.S3({
    accessKeyId: process.env.AMZ_ACCESS_KEY,
    secretAccessKey: process.env.AMZ_SECRET_KEY,
    region: process.env.AMZ_REGION,
  });

  const uid = cuid();
  const documentKey = `u/${prefix}/${dayjs().format("YYYY/MM/DD")}/${uid}.html`;

  try {
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
