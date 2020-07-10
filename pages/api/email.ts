import fs from "fs";
import path from "path";
import os from "os";
import crypto from "crypto";
import mailgun from "mailgun-js";

function tmpFile(ext) {
  return path.join(
    os.tmpdir(),
    `archive.${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.${ext}`
  );
}
export const sesSendEmail = () => {};

export const mbSendEmail = async (
  email: string,
  message: string,
  order: string
): Promise<{ id: string } | null> => {
  try {
    const mg = mailgun({
      host: process.env.MG_HOST,
      apiKey: process.env.MG_API_KEY,
      domain: process.env.MG_DOMAIN,
    });

    const path = tmpFile("html");
    fs.writeFileSync(path, order);

    const data = {
      from: `Locals <mail@${process.env.MG_DOMAIN}>`,
      to: email,
      subject: "Nowe zamówienie",
      text: message,
      attachment: path,
    };

    return await mg.messages().send(data);
    /*
          {
            "response":{
                "id":"<20200621112248.1.5ED071923FC8FA7C@mail.timerto.xyz>",
                "message":"Queued. Thank you."
            }
          }
          */
  } catch (err) {
    console.error(err);
    return null;
  }
};
