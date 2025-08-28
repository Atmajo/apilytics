import { sendEmail } from "@/lib/sendEmail";
import { verifyAccountTemplate } from "@/templates/verifyAccount";

export const sendVerifyMail = async (to: string, link: string) => {
  const subject = "Password Reset Request";

  const html = verifyAccountTemplate(link);

  await sendEmail(to, subject, html);
};
