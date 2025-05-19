import sgMail from '@sendgrid/mail';
import twilio from 'twilio';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID || '', process.env.TWILIO_AUTH_TOKEN || '');

export async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  if (!process.env.SENDGRID_API_KEY) throw new Error('SendGrid not configured');
  await sgMail.send({ to, from: 'no-reply@tradein.com', subject, html });
}

export async function sendSMS(to: string, message: string): Promise<void> {
  if (!process.env.TWILIO_ACCOUNT_SID) throw new Error('Twilio not configured');
  await twilioClient.messages.create({ to, from: process.env.TWILIO_FROM || '', body: message });
}
