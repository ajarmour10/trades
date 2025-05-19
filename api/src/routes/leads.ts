import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authenticate';
import { calculateTradeInValue } from '../services/valuation';

export default function leadRoutes(prisma: PrismaClient) {
  const router = Router();

  router.post('/', async (req: AuthRequest, res) => {
    const { vin, year, make, model, mileage, condition } = req.body;
    const value = await calculateTradeInValue(vin, year, make, model, mileage, condition);
    const lead = await prisma.lead.create({
      data: {
        vin, year, make, model, mileage, condition,
        customerId: req.user!.id,
        valuations: { create: { value, source: 'BaseAlgorithmV1' } }
      },
      include: { valuations: true }
    });
    res.json(lead);
  });

  router.get('/', async (req: AuthRequest, res) => {
    const leads = await prisma.lead.findMany({ where: { customerId: req.user!.id }, include: { valuations: true } });
    res.json(leads);
  });

  return router;
}
