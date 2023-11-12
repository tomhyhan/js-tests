import { faker } from '@faker-js/faker';

export function createRandomUser() {
    return {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    };
}

export function createTweet() {
    return {
        'id': faker.string.uuid(),
        'text': faker.string.alpha(50),
        'createdAt': `${faker.date.anytime()}`,
        'userId': faker.string.uuid(),
        "name": faker.person.fullName(), 
        "username": faker.string.alphanumeric(10),
        "url": faker.internet.url()
    }
}

export const fakeToken = faker.string.alphanumeric(128)