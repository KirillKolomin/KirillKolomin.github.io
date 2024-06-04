'use client';

import React, { ReactNode } from 'react';

interface FormErrorProps {
    children: ReactNode;
}

export default function FormError({ children }: FormErrorProps) {
  return (
    <div
      className="flex h-8 items-end space-x-1"
      aria-live="polite"
      aria-atomic="true"
    >
      <p className="text-sm text-red-500">{children}</p>
    </div>
  );
}
