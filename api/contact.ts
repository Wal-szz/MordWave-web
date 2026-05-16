import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createTransport } from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Solo aceptar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { name, email, service, message, website } = req.body ?? {};

  // Honeypot: si viene con valor es un bot, respondemos 200 para no alertarlos
  if (website) {
    return res.status(200).json({ success: true });
  }

  // Validación básica
  if (!name || !email || !service || !message) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  const serviceLabels: Record<string, string> = {
    landing: 'Landing Page',
    website: 'Sitio Web completo',
    pyme: 'Pyme / Negocio local',
    other: 'Otro',
  };

  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: process.env['GMAIL_USER'],
      pass: process.env['GMAIL_APP_PASSWORD'],
    },
  });

  await transporter.sendMail({
    from: `"Mordwave Contacto" <${process.env['GMAIL_USER']}>`,
    to: process.env['GMAIL_USER'],
    replyTo: email,
    subject: `✉️ Nuevo contacto de ${name} — ${serviceLabels[service] ?? service}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d0d0d; color: #ffffff; border-radius: 12px; overflow: hidden;">
        <div style="background: #5B3FD4; padding: 24px 32px;">
          <h1 style="margin: 0; font-size: 20px; color: #fff;">Mordwave — Nuevo contacto</h1>
        </div>
        <div style="padding: 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 13px; width: 120px;">Nombre</td>
              <td style="padding: 8px 0; color: #fff; font-size: 15px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 13px;">Email</td>
              <td style="padding: 8px 0; color: #7C5CE8; font-size: 15px;">
                <a href="mailto:${email}" style="color: #7C5CE8;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 13px;">Servicio</td>
              <td style="padding: 8px 0; color: #fff; font-size: 15px;">${serviceLabels[service] ?? service}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 20px; background: #1a1624; border-radius: 8px; border-left: 3px solid #5B3FD4;">
            <p style="margin: 0; color: #aaa; font-size: 13px; margin-bottom: 8px;">Mensaje</p>
            <p style="margin: 0; color: #fff; font-size: 15px; line-height: 1.6;">${message}</p>
          </div>
          <p style="margin-top: 24px; color: #555; font-size: 12px;">
            Podés responder directamente a este correo para contactar a ${name}.
          </p>
        </div>
      </div>
    `,
  });

  return res.status(200).json({ success: true });
}
