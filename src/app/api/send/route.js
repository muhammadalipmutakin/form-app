import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import "dotenv/config";

export async function POST(req) {
  try {
    // Baca dan parsing JSON dari request body
    const { corporateName, picName, forecast, event, rangeDateStart, rangeDateEnd, desc } = await req.json();

    // Validasi Data
    if (!corporateName || !picName || !forecast || !event || !rangeDateStart || !rangeDateEnd || !desc) {
      return NextResponse.json({ message: "Semua data harus diisi!" }, { status: 400 });
    }

    console.log("🔍 Data yang diterima:");
    console.log("🏢 Corporate Name:", corporateName);
    console.log("👤 PIC Name:", picName);
    console.log("📊 Estimasi Volume:", forecast);
    console.log("🎟️ Event:", event);
    console.log("📅 Date Range:", rangeDateStart, "-", rangeDateEnd);
    console.log("📝 Desc:", desc);

    /** =======================
     *  ✉️ Kirim Email dengan Nodemailer
     *  ======================= */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Lion Parcel" <${process.env.EMAIL_USER}>`,
      to: "alipmutakin24@gmail.com",
      subject: "📌 New Forecast Submission",
      text: `
🏢 Corporate Name: ${corporateName}
👤 PIC Name: ${picName}
📅 Date: ${rangeDateStart} - ${rangeDateEnd}
📊 Forecast: ${forecast}
🎟️ Event: ${event}
📝 Desc: ${desc}
      `,
    };

    const emailResult = await transporter.sendMail(mailOptions);
    console.log("📩 Email Sent:", emailResult.response);

    return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 });

  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    return NextResponse.json({ message: "Failed to send email", error: error.message }, { status: 500 });
  }
}
