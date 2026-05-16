import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createTransport } from 'nodemailer';

// Rate limiting simple en memoria (se reinicia con cada instancia serverless)
const rateLimit = new Map<string, { count: number; ts: number }>();
const LIMIT = 5;        // máximo de requests
const WINDOW = 60_000;  // por minuto

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now - entry.ts > WINDOW) {
    rateLimit.set(ip, { count: 1, ts: now });
    return false;
  }
  if (entry.count >= LIMIT) return true;
  entry.count++;
  return false;
}

// Sanitización: elimina tags HTML para evitar inyección en el correo
function sanitize(str: unknown): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .slice(0, 2000); // límite de longitud
}

const ALLOWED_ORIGINS = [
  'https://mord-wave-web.vercel.app',
  'http://localhost:4200',
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS — solo aceptar desde el dominio propio
  const origin = req.headers['origin'] ?? '';
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  // Rate limiting por IP
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Demasiados intentos. Esperá un momento.' });
  }

  const { name, email, service, message, website } = req.body ?? {};

  // Honeypot
  if (website) return res.status(200).json({ success: true });

  // Validación básica
  if (!name || !email || !service || !message) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  // Sanitización
  const safeName    = sanitize(name);
  const safeEmail   = sanitize(email);
  const safeMessage = sanitize(message);
  const safeService = sanitize(service);

  const serviceLabels: Record<string, string> = {
    landing: 'Landing Page',
    website: 'Sitio Web completo',
    pyme:    'Pyme / Negocio local',
    other:   'Otro',
  };

  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: process.env['GMAIL_USER'],
      pass: process.env['GMAIL_APP_PASSWORD'],
    },
  });

  await transporter.sendMail({
    from:    `"Mordwave Contacto" <${process.env['GMAIL_USER']}>`,
    to:      process.env['GMAIL_USER'],
    replyTo: safeEmail,
    subject: `✉️ Nuevo contacto de ${safeName} — ${serviceLabels[safeService] ?? safeService}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d0d0d; color: #ffffff; border-radius: 12px; overflow: hidden;">
        <div style="background: #5B3FD4; padding: 24px 32px;">
          <h1 style="margin: 0; font-size: 20px; color: #fff;">Mordwave — Nuevo contacto</h1>
        </div>
        <div style="padding: 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 13px; width: 120px;">Nombre</td>
              <td style="padding: 8px 0; color: #fff; font-size: 15px;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 13px;">Email</td>
              <td style="padding: 8px 0; color: #7C5CE8; font-size: 15px;">
                <a href="mailto:${safeEmail}" style="color: #7C5CE8;">${safeEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 13px;">Servicio</td>
              <td style="padding: 8px 0; color: #fff; font-size: 15px;">${serviceLabels[safeService] ?? safeService}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 20px; background: #1a1624; border-radius: 8px; border-left: 3px solid #5B3FD4;">
            <p style="margin: 0; color: #aaa; font-size: 13px; margin-bottom: 8px;">Mensaje</p>
            <p style="margin: 0; color: #fff; font-size: 15px; line-height: 1.6;">${safeMessage}</p>
          </div>
          <p style="margin-top: 24px; color: #555; font-size: 12px;">
            Podés responder directamente a este correo para contactar a ${safeName}.
          </p>
        </div>
      </div>
    `,
  });

  return res.status(200).json({ success: true });
}
