import React from 'react';
import { GET as getProfile, User } from '@exchange-gateway/app/api/profile/route';
import NavigationBar from '@exchange-gateway/widgets/navigation-bar/NavigationBar';
import InformationCard, {
  InformationCardStatements,
} from '@exchange-gateway/shared/components/information-card/InformationCard';
import { personalInformationTranslations } from '@exchange-gateway/shared/translations/personal-information';

export default async function Home() {
  const response: Response = await getProfile();
  const user: User = await response.json();
  const informationCardStatements: InformationCardStatements = {
    fullName: [personalInformationTranslations.fullName, user.fullName],
    phone: [personalInformationTranslations.phone, user.phone],
  };

  return (
    <>
      <header><NavigationBar /></header>
      <main>
        <InformationCard title={personalInformationTranslations.cardTitle} description={personalInformationTranslations.cardDescription} statements={informationCardStatements} />
      </main>
    </>
  );
}
