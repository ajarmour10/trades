import cron from 'node-cron';
import { PrismaClient, LeadStatus } from '@prisma/client';
import { calculateTradeInValue } from '../api/src/services/valuation';
import { sendEmail, sendSMS } from '../api/src/services/notifications';
import dotenv from 'dotenv';

dotenv.config({ path: '../api/.env' });
const prisma = new PrismaClient();

async function recalcValuations() {
  const leads = await prisma.lead.findMany({ where: { status: { not: LeadStatus.WON } }, include: { valuations: { orderBy: { createdAt: 'desc' }, take: 1 } } });
  for (const lead of leads) {
    const lastValuation = lead.valuations[0];
    const newValue = await calculateTradeInValue(lead.vin, lead.year, lead.make, lead.model, lead.mileage, lead.condition);
    if (!lastValuation || Math.abs(newValue - lastValuation.value) / lastValuation.value > 0.1) {
      await prisma.valuation.create({ data: { leadId: lead.id, value: newValue, source: 'BaseAlgorithmV1' } });
      if (lead.customer.phone) await sendSMS(lead.customer.phone, `Your vehicle valuation is now $${newValue}`);
      await sendEmail(lead.customer.email, 'Valuation Update', `<p>Your vehicle valuation is now $${newValue}</p>`);
    }
  }
}

cron.schedule('0 2 * * *', recalcValuations);
