'use client';

import React, { memo, useState } from 'react';
import { useFormStatus } from 'react-dom';
import Button from '@exchange-gateway/shared/components/forms/Button';
import { loginFormTranslations } from '@exchange-gateway/shared/translations/login-form';
import FormError from '@exchange-gateway/shared/components/forms/FormError';
import { REDIRECT_URL_QUERY } from '@exchange-gateway/shared/api/authentication/consts';
import { login } from '@exchange-gateway/shared/api/authentication/actions';

function Submit() {
  const { pending } = useFormStatus();

  return (
    <Button
      isDisabled={pending}
      type="submit"
    >
      {pending ? loginFormTranslations.submitButton.processingTitle : loginFormTranslations.submitButton.title}
    </Button>
  );
}

function LoginForm() {
  const [error, setError] = useState();

  const doFormAction = async (formData: FormData) => {
    const rawRedirectUrl = new URLSearchParams(location.search).get(REDIRECT_URL_QUERY) || '/';
    const errorMessage = await login(rawRedirectUrl, formData);

    if (errorMessage) {
      setError(errorMessage);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{loginFormTranslations.formTitle}</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={doFormAction} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {loginFormTranslations.emailTitle}
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {loginFormTranslations.passwordTitle}
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <Submit />
          {error && <FormError>{error}</FormError>}
        </form>
      </div>
    </div>
  );
}

export default memo(LoginForm);
