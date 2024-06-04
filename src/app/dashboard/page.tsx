import React from 'react';
import NavigationBar from '@exchange-gateway/widgets/navigation-bar/NavigationBar';
import InformationCard, {
  InformationCardStatements,
} from '@exchange-gateway/shared/components/information-card/InformationCard';
import { personalInformationTranslations } from '@exchange-gateway/shared/translations/personal-information';
import { GET as getProfile, User } from '@exchange-gateway/app/api/profile/route';
import { faker } from '@faker-js/faker';
import BalanceWithdrawalForm from '@exchange-gateway/widgets/balance-withrawal-form/BalanceWithdrawalForm';
import { getBalanceOfUserFromDatabase } from '@exchange-gateway/shared/api/database-queries/profile';

export default async function Page() {
  const response: Response = await getProfile();
  const user: User = await response.json();
  const currentBalance = await getBalanceOfUserFromDatabase(user.id);
  const informationCardStatements: InformationCardStatements = {
    fullName: [personalInformationTranslations.fullName, user.fullName],
    phone: [personalInformationTranslations.phone, user.phone],
    transactionAmount: [personalInformationTranslations.transactionAmount, faker.finance.amount({
      min: 0,
      max: 1000,
      dec: 0,
    })],
    currentBalance: [personalInformationTranslations.currentBalance, currentBalance.toString()],
  };

  return (
    <>
      <header><NavigationBar /></header>
      <main>
        <InformationCard
          title={personalInformationTranslations.cardTitle}
          description={personalInformationTranslations.cardDescription}
          statements={informationCardStatements}
        />
        <div className="mt-6 max-w-100">
          <BalanceWithdrawalForm />
        </div>
      </main>
    </>
  );
}
