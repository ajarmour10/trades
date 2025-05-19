import { sendEmail, sendSMS } from '../src/services/notifications';

jest.mock('@sendgrid/mail', () => ({ setApiKey: jest.fn(), send: jest.fn() }));
jest.mock('twilio', () => () => ({ messages: { create: jest.fn() } }));

test('sendEmail throws when not configured', async () => {
  await expect(sendEmail('test@example.com', 'Hi', '<p>Hi</p>')).rejects.toThrow();
});

test('sendSMS throws when not configured', async () => {
  await expect(sendSMS('+123456', 'Hi')).rejects.toThrow();
});
