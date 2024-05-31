"use server"

import {cookies} from "next/headers";
import {AUTH_COOKIE, ENCRYPTION_KEY} from "@exchange-gateway/shared/tokens/auth";
import {SignJWT} from "jose";
import StandardErrorResponse from "@exchange-gateway/shared/api/standard-error-response";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export interface LoginState {
    error?: StandardErrorResponse;
    loggedIn: boolean
}

export interface Credentials {
    email: string;
    password: string;
}

const SESSION_TIME_IN_SEC = 30;

export async function encrypt(payload: any): Promise<string> {
    return await new SignJWT(payload).setProtectedHeader({alg: 'HS256'}).setIssuedAt().setExpirationTime(`${SESSION_TIME_IN_SEC} sec from now`).sign(new TextEncoder().encode(ENCRYPTION_KEY));
}

export const login = async (redirectUrl: string, formData: FormData): Promise<any> => {
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
        return 'asd';
    }

    const user: Credentials = {
        email,
        password,
    }
    const expires = new Date(Date.now() + SESSION_TIME_IN_SEC * 1000);
    const session = await encrypt({user, expires});

    cookies().set(AUTH_COOKIE, session, {expires, httpOnly: true, sameSite: 'strict'});

    redirectUrl = decodeURIComponent(redirectUrl);
    redirect(redirectUrl);
}
