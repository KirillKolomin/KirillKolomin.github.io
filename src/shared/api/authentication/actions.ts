'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { encrypt } from '@exchange-gateway/shared/api/authentication/encrypt';
import { AUTH_COOKIE, SESSION_TIME_IN_SEC } from '@exchange-gateway/shared/api/authentication/consts';

export const login = async (redirectUrl: string, formData: FormData): Promise<any> => {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
    return 'Provided credentials are incorrect';
  }

  const user = {
    email,
    password,
  };
  const expires = new Date(Date.now() + SESSION_TIME_IN_SEC * 1000);
  const session = await encrypt(SESSION_TIME_IN_SEC, { user, expires });

  cookies().set(AUTH_COOKIE, session, { expires, httpOnly: true, sameSite: 'strict' });

  redirectUrl = decodeURIComponent(redirectUrl);
  redirect(redirectUrl);
};
