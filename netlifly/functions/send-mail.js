// netlify/functions/send-mail.js
import nodemailer from "nodemailer";

export const handler = async (event) => {
  // só aceitamos POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Método não permitido",
    };
  }

  try {
    const data = JSON.parse(event.body || "{}");
    const { nome, email, assunto, mensagem, telefone } = data;

    // validação básica
    if (!nome || !email || !mensagem) {
      return {
        statusCode: 400,
        body: "Campos obrigatórios em falta.",
      };
    }

    // criar transporte SMTP (mailbox.pt)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,          // ex: "mail4.mailbox.pt"
      port: Number(process.env.SMTP_PORT),  // ex: 587
      secure: false,
      auth: {
        user: process.env.SMTP_USER,        // "info@tagusgardenvillas.pt"
        pass: process.env.SMTP_PASS,        // password dessa conta
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // enviar email
    await transporter.sendMail({
      from: `"Site Tagus Garden Villas" <${process.env.SMTP_USER}>`,
      to: "info@tagusgardenvillas.pt",
      replyTo: email,
      subject: assunto || "Novo contacto do site",
      text: `
Novo contacto do site:

Nome: ${nome}
Email: ${email}
Telefone: ${telefone || "-"}
Mensagem:
${mensagem}
      `,
      html: `
        <div style="font-family:Arial,sans-serif;">
          <h2 style="color:#d4af37;">Novo contacto do site</h2>
          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefone:</strong> ${telefone || "-"}</p>
          <p><strong>Mensagem:</strong><br>${(mensagem || "").replace(/\n/g, "<br>")}</p>
        </div>
      `
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true }),
    };

  } catch (err) {
    console.error("Erro ao enviar email:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, error: "Erro ao enviar email." }),
    };
  }
};
