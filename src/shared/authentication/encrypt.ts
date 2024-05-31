import { jwtVerify, SignJWT } from 'jose';
import { ENCRYPTION_KEY } from '@exchange-gateway/shared/authentication/consts';

const secretKey = new TextEncoder().encode(ENCRYPTION_KEY);

export async function encrypt(sessionTimeInSeconds: number, payload: any): Promise<string> {
  return new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime(`${sessionTimeInSeconds} sec from now`)
    .sign(secretKey);
}

export async function decrypt(input: string): Promise<unknown> {
  return jwtVerify(input, secretKey, { algorithms: ['HS256'] });
}
