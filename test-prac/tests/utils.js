import { faker } from "@faker-js/faker"

export async function createReqWithToken(url, user, request) {
    return await  request.get(url, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    })
}

export async function createTweets(user, request) {
    const text = faker.string.alpha(20)

    const res =  await request.post("/tweets", {text}, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    })
    return {res, text}
}

export async function createUser(request) {
    const formdata = {
        name: faker.internet.userName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        url: faker.internet.url(),
        password: faker.internet.password()
    }
    const signup = await request.post("/auth/signup", formdata)
    return signup.data
}