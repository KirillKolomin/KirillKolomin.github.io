import { faker } from '@faker-js/faker';

export interface User {
    fullName: string
    phone: string
}

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = createRandomUser();

  return Response.json({ user });
}

function createRandomUser(): User {
  return {
    fullName: faker.internet.userName(),
    phone: faker.phone.number(),
  };
}
