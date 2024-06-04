'use server';

import { cookies } from 'next/headers';
import { AUTH_COOKIE } from '@exchange-gateway/shared/api/authentication/consts';
import { decrypt } from '@exchange-gateway/shared/api/authentication/encrypt';

export default async function getSession(): Promise<unknown | null> {
  const session = cookies().get(AUTH_COOKIE)?.value;

  if (!session) {
    return null;
  }
  return decrypt(session);
}
