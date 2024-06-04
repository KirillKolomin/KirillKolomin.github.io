import React from 'react';
import { faker } from '@faker-js/faker';
import Image from 'next/image';

const companyName = 'Exchange Gateway';

const translations = {
  aboutUsTitle: 'About us',
  pageTitle: 'Control your Finances with our',
};

export default function Page() {
  const pageDescription = new Array(3).fill(null).map(() => faker.company.catchPhrase()).join('. ');
  const aboutUsParagraph = new Array(10).fill(null).map(() => faker.company.buzzPhrase()).join('. ');

  return (
    <div>
      <section className="py-14 lg:py-24 relative z-0 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
          <h1 className="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl  text-gray-900 mb-5 md:text-5xl md:leading-normal">
            {translations.pageTitle}
            &nbsp;
            <span className="text-indigo-600">{companyName}</span>
          </h1>
          <p className="max-w-sm mx-auto text-center text-base font-normal leading-7 text-gray-500 mb-9">
            {pageDescription}
          </p>
        </div>
      </section>
      <section className="py-14 lg:py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative ">
          <div className="flex flex-col lg:flex-row gap-9">
            <div className="img-box rounded">
              <Image
                src="https://i.pinimg.com/564x/74/fc/5f/74fc5f9c73880ff75b301babec974cf4.jpg"
                alt="Company CEO"
                className="max-lg:mx-auto"
                width={428}
                height={626}
              />
            </div>
            <div className="lg:pl-[100px] flex items-center">
              <div className="data w-full">
                <h2 className="font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center relative">
                  {translations.aboutUsTitle}
                </h2>
                <p className="font-normal text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
                  {aboutUsParagraph}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
