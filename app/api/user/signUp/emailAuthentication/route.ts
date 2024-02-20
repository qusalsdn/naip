import { NextRequest, NextResponse } from "next/server";

const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "yja05092@gmail.com",
    pass: process.env.MAIL_PW,
  },
});

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const email = searchParams.get("email");
  const authNumber = Math.floor(10000 + Math.random() * 90000).toString();
  try {
    const info = await transporter.sendMail({
      from: "인증번호<yja05092@gmail.com>",
      to: [email],
      subject: "인증번호",
      text: authNumber,
    });
    return NextResponse.json({ ok: true, authNumber });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ ok: false });
  }
}
