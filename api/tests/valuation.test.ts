import { calculateTradeInValue } from '../src/services/valuation';

test('calculates lower value for older cars', async () => {
  const newer = await calculateTradeInValue('vin', 2020, 'Make', 'Model', 10000, 'GOOD');
  const older = await calculateTradeInValue('vin', 2010, 'Make', 'Model', 10000, 'GOOD');
  expect(older).toBeLessThan(newer);
});
