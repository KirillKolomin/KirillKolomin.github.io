import { faker } from '@faker-js/faker';

export interface User {
    fullName: string
    phone: string
    id: string;
}

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = createRandomUser();

  return Response.json(user);
}

function createRandomUser(): User {
  return {
    fullName: faker.person.fullName(),
    phone: faker.phone.number(),
    id: faker.database.mongodbObjectId(),
  };
}
