import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  /** formDataで来たらformData()で受け取る必要がある */
  const data = await req.formData();

  // データの取り出し
  const name = data.get("name");
  const email = data.get("email");
  const content = data.get("content");
  const subject = data.get("subject");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SEND_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_SEND_USER,
    to: process.env.EMAIL_RECEIVE_USER,
    subject: subject,
    text: `送信者：${email}\n\n内容:${content}`,
  };

  try {
    await transporter.sendMail(mailOptions)
    return new Response(JSON.stringify({ message: "送信成功" }), { status: 200 })
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "送信失敗" }), { status: 500 })
  }
}
