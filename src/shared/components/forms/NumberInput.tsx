'use client';

import React from 'react';
import FormError from '@exchange-gateway/shared/components/forms/FormError';

interface NumberInputProps {
    id: string;
    name: string;
    label: string;
    error?: string;
}

export default function NumberInput({
  id, name, label, error = '',
}: NumberInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
      <input
        type="number"
        id={id}
        name={name}
        aria-describedby="helper-text-explanation"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="00.0"
        required
      />
      {error && <FormError>{error}</FormError>}
    </div>
  );
}
