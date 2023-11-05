import { faker } from '@faker-js/faker';

export function createRandomUser() {
    return {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    };
}

export const fakeToken = faker.string.alphanumeric(128)