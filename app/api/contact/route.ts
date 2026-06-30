import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiting (resets on serverless cold start — acceptable for low-traffic portfolio)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 }); // 1 min window
    return true;
  }

  if (entry.count >= 2) return false; // max 2 per minute

  entry.count += 1;
  return true;
}

function sanitize(str: string): string {
  return str.replace(/[<>]/g, "").trim().slice(0, 2000);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  // Get IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  // Rate limit
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Çok fazla istek gönderdiniz. Lütfen bir dakika bekleyip tekrar deneyin." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  // Honeypot check
  if (body.honeypot && typeof body.honeypot === "string" && body.honeypot.length > 0) {
    // Silently reject bots
    return NextResponse.json({ ok: true });
  }

  // Validate fields
  const firstName = sanitize(String(body.firstName ?? ""));
  const lastName = sanitize(String(body.lastName ?? ""));
  const email = sanitize(String(body.email ?? ""));
  const message = sanitize(String(body.message ?? ""));
  const kvkk = Boolean(body.kvkk);

  if (!firstName || firstName.length < 2) {
    return NextResponse.json({ error: "Ad alanı gereklidir (en az 2 karakter)." }, { status: 422 });
  }
  if (!lastName || lastName.length < 2) {
    return NextResponse.json({ error: "Soyad alanı gereklidir (en az 2 karakter)." }, { status: 422 });
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Geçerli bir e-posta adresi giriniz." }, { status: 422 });
  }
  if (!message || message.length < 10) {
    return NextResponse.json({ error: "Mesaj alanı en az 10 karakter olmalıdır." }, { status: 422 });
  }
  if (!kvkk) {
    return NextResponse.json({ error: "KVKK onayı gereklidir." }, { status: 422 });
  }

  // Send email via Resend
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Sunucu yapılandırma hatası. Lütfen daha sonra tekrar deneyin." },
      { status: 500 }
    );
  }

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["ozgebilici40@gmail.com"],
        subject: `Portfolyo İletişim: ${firstName} ${lastName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0B1120; color: #F1F5F9; border-radius: 8px;">
            <h2 style="color: #818CF8; margin-bottom: 16px;">Yeni Mesaj — Portfolyo İletişim Formu</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #94A3B8; width: 100px;">Ad Soyad:</td><td style="color: #F1F5F9;">${firstName} ${lastName}</td></tr>
              <tr><td style="padding: 8px 0; color: #94A3B8;">E-posta:</td><td><a href="mailto:${email}" style="color: #818CF8;">${email}</a></td></tr>
            </table>
            <div style="margin-top: 20px; padding: 16px; background: #0F1729; border-radius: 6px; border-left: 3px solid #6366F1;">
              <p style="color: #94A3B8; margin-bottom: 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Mesaj</p>
              <p style="color: #F1F5F9; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="margin-top: 16px; color: #475569; font-size: 12px;">KVKK onayı: Evet · IP: ${ip}</p>
          </div>
        `,
        reply_to: email,
      }),
    });

    if (!resendRes.ok) {
      const errData = await resendRes.json().catch(() => ({}));
      console.error("Resend API error:", errData);
      return NextResponse.json(
        { error: "E-posta gönderilemedi. Lütfen daha sonra tekrar deneyin." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { error: "Sunucu hatası. Lütfen daha sonra tekrar deneyin." },
      { status: 500 }
    );
  }
}
