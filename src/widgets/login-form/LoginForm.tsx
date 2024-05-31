"use client"

import React, {FC, memo, useState} from "react";
import {login} from "@exchange-gateway/shared/actions/login";
import {useFormStatus} from "react-dom";
import {REDIRECT_URL_QUERY} from "@exchange-gateway/shared/tokens/auth";

const Submit: FC = () => {
    const {pending} = useFormStatus();

    return <button aria-disabled={pending} type="submit"
                   className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        {pending ? 'Вход...' : 'Войти'}
    </button>
}

const LoginForm: FC = () => {
    const [error, setError] = useState();

    const doFormAction = async (formData: FormData) => {
        const rawRedirectUrl = new URLSearchParams(location.search).get(REDIRECT_URL_QUERY) || '/';
        const response = await login(rawRedirectUrl, formData);
        if (response) {
            setError(response);
        }
    }

    return <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                 alt="Your Company"/>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Вход в
                аккаунт</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action={doFormAction} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Почта</label>
                    <div className="mt-2">
                        <input id="email" name="email" type="email" autoComplete="email" required
                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password"
                               className="block text-sm font-medium leading-6 text-gray-900">Пароль</label>
                    </div>
                    <div className="mt-2">
                        <input id="password" name="password" type="password" autoComplete="current-password" required
                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>

                <Submit/>

                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}
                </div>
            </form>
        </div>
    </div>
}

export default memo(LoginForm);
