import { createTransport } from "nodemailer";
import { SUPPORT_EMAIL, SUPPORT_EMAIL_PASSWORD } from "config";

const transporter =
  SUPPORT_EMAIL && SUPPORT_EMAIL_PASSWORD
    ? createTransport({
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        auth: {
          user: SUPPORT_EMAIL,
          pass: SUPPORT_EMAIL_PASSWORD,
        },
      })
    : null;

type EmailContent = {
  to: string;
  subject: string;
  content: string;
};

export async function sendEmail({ to, subject, content }: EmailContent) {
  if (!transporter) {
    return;
  }

  const result = await transporter.sendMail({
    from: "hello@dremuli.com",
    to,
    subject,
    text: content,
  });

  return result;
}

export function sendEmailBackground(content: EmailContent) {
  sendEmail(content).catch((error) => console.error("Error mail send", error));
}
