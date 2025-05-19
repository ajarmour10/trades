import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authenticate';
import { calculateTradeInValue } from '../services/valuation';

export default function valuationRoutes(prisma: PrismaClient) {
  const router = Router();

  router.post('/:leadId', async (req: AuthRequest, res) => {
    const { leadId } = req.params;
    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    const value = await calculateTradeInValue(lead.vin, lead.year, lead.make, lead.model, lead.mileage, lead.condition);
    const valuation = await prisma.valuation.create({ data: { value, source: 'BaseAlgorithmV1', leadId } });
    res.json(valuation);
  });

  return router;
}
