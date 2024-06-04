'use client';

import React, { ReactNode } from 'react';

type StatementTitle = string;
type StatementValue = string;

export type InformationCardStatements = Record<string, [StatementTitle, StatementValue]>;

interface InformationCardProps {
    title: string;
    description: string;
    statements: InformationCardStatements;
}

export default function InformationCard({ statements, title, description }: InformationCardProps): ReactNode {
  const statementList = Object.values(statements);

  return (
    <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {title}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {description}
        </p>
      </div>
      <div className="border-t border-gray-200">
        {statementList.map(([key, value]) => (
          <dl key={key}>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                {key}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {value}
              </dd>
            </div>
          </dl>
        ))}

      </div>
    </div>
  );
}
