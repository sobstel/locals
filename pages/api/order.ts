import fs from "fs";
import path from "path";
import os from "os";
import crypto from "crypto";
import dayjs from "dayjs";
import cuid from "cuid";
import aws from "aws-sdk";

import { NowRequest, NowResponse } from "@now/node";
import config from "../../config";
import { mbSendEmail } from "../../utils/email";
import { getPDF } from "../../utils/screenshot";

const Bucket = "locals-orders-store";

function tmpFile(ext: string) {
  return path.join(
    os.tmpdir(),
    `zamowienie.${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.${ext}`
  );
}

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
    let attachmentPath: string;

    let fallbackToHtml = !config.generatePdf;
    if (!fallbackToHtml) {
      try {
        attachmentPath = tmpFile("pdf");
        const pdf = await getPDF(orderHtml);
        fs.writeFileSync(attachmentPath, pdf);
      } catch (e) {
        console.warn(e);
        fallbackToHtml = true;
      }
    }

    if (fallbackToHtml) {
      attachmentPath = tmpFile("html");
      fs.writeFileSync(attachmentPath, orderHtml);
    }

    try {
      // mail from a customer to a store
      await mbSendEmail(
        config.email,
        `[${prefix}] Zamówienie nr ${orderNumber}`,
        orderHtml,
        `${client.firstname} ${client.lastname}`,
        client.email,
        attachmentPath
      );
    } catch (e) {
      // TODO: catch error
      res.status(400);
      res.json({ done: false });
      return;
    }

    if (client.email && config.emailCustomer) {
      try {
        // mail from a store to a customer
        await mbSendEmail(
          client.email,
          `Zamówienie nr ${orderNumber}`,
          orderHtml,
          config.name,
          config.email,
          attachmentPath
        );
      } catch (e) {
        /** noop */
      }
    }

    res.json({ done: true });
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
        Body: orderHtml,
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
