import React from 'react';
import PersonalInformationCard
  from '@exchange-gateway/shared/components/pesonal-information-card/PersonalInformationCard';
import { GET as getProfile, User } from '@exchange-gateway/app/api/profile/route';

export default async function Home() {
  const response: Response = await getProfile();
  const user: User = await response.json();

  return (
    <main>
      <PersonalInformationCard personalInformation={user} />
    </main>
  );
}
