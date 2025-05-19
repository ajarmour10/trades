import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authenticate';
import { sendEmail, sendSMS } from '../services/notifications';

export default function notificationRoutes(prisma: PrismaClient) {
  const router = Router();

  router.post('/email', async (req: AuthRequest, res) => {
    const { to, subject, html } = req.body;
    await sendEmail(to, subject, html);
    res.json({ status: 'sent' });
  });

  router.post('/sms', async (req: AuthRequest, res) => {
    const { to, message } = req.body;
    await sendSMS(to, message);
    res.json({ status: 'sent' });
  });

  return router;
}
