'use client';

import React, { memo, ReactNode } from 'react';

interface PersonalInformation {
    fullName: string;
    phone: string;
}

interface PersonalInformationCardProps {
    personalInformation: PersonalInformation;
}

const translations: Record<string, string> & PersonalInformation = {
  cardTitle: 'User database',
  cardDescription: 'Details and information about user',
  fullName: 'Full name',
  phone: 'Phone',
};

function PersonalInformationCard({ personalInformation }: PersonalInformationCardProps): ReactNode {
  const statements = Object.entries(personalInformation);

  return (
    <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {translations.cardTitle}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {translations.cardDescription}
        </p>
      </div>
      <div className="border-t border-gray-200">
        {statements.map(([key, value]) => (
          <dl key={key}>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                {translations[key]}
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

export default memo(PersonalInformationCard);
