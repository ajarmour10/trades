import jwt from 'jsonwebtoken';
import { authenticate, authorize, AuthRequest } from '../src/middleware/authenticate';
import { Request, Response, NextFunction } from 'express';

const secret = 'testsecret';

describe('authenticate middleware', () => {
  const user = { id: '1', role: 'CUSTOMER' };
  const token = jwt.sign(user, secret);

  it('should attach user to request', () => {
    const req = { headers: { authorization: `Bearer ${token}` } } as AuthRequest;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    process.env.JWT_SECRET = secret;
    const next = jest.fn();
    authenticate(req, res, next);
    expect(req.user).toEqual(user);
    expect(next).toBeCalled();
  });
});
