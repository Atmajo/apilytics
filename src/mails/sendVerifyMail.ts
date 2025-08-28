import { sendEmail } from "@/lib/sendEmail";
import { resetPasswordTemplate } from "@/templates/resetPassword";

export const sendVerifyMail = async (to: string, link: string) => {
  const subject = "Password Reset Request";
  
  const html = resetPasswordTemplate(link);

  await sendEmail(to, subject, html);
};
