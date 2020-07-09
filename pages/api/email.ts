import mailgun from "mailgun-js";

export const sesSendEmail = () => {};

export const mbSendEmail = async (email: string, message: string) => {
  try {
    const mg = mailgun({
      host: "api.eu.mailgun.net",
      apiKey: "xxx-xxx",
      domain: "xxx.locals.xxx",
    });

    const data = {
      from: "Locals <mail@xxx.locals.xxx>",
      to: email,
      subject: "New order",
      text: message,
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
    return null;
  }
};
