import { startServer, stopServer } from "../../app.js";
import { faker } from '@faker-js/faker';
import axios from 'axios';
import { sequelize } from "../../db/database.js";

describe("Auth Route", () => {
    let server, formdata, request;
    
    beforeAll(async () => {
        server = await startServer()
        request = axios.create({
            baseURL: `http://localhost:${server.address().port}`,
            validateStatus: null
        })
    })
    
    beforeEach(() => {
        formdata = {
            name: faker.internet.userName(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            url: faker.internet.url(),
            password: faker.internet.password()
        }
    })
    
    afterAll(async () => {
        // await sequelize.drop()
        await stopServer(server)
    })
    
    describe("POST to /auth/signup", () => {
        
        
        it("return 201 and authorization token when user detail is valid", async () => {
            const res = await request.post("/auth/signup", formdata)
    
            expect(res.status).toBe(201)
            expect(res.data.token.length).toBeGreaterThan(0)
        })
    
        it.each([
            {missingField: "name", expected: "name is missing"},
            {missingField: "email", expected: "invalid email"},
            {missingField: "username", expected: 'username should be at least 5 characters'},
            {missingField: "password", expected: 'password should be at least 5 characters'},
        ])("return 400 when $missingField is missing", async ({missingField, expected}) => {
            delete formdata[missingField]
            
            const res = await request.post("/auth/signup", formdata)
            
            expect(res.status).toBe(400)
            expect(res.data.message).toBe(expected)
        })
    
        it("returns 409 when a username already exist", async () => {
            const signup = await request.post("/auth/signup", formdata)
            expect(signup.status).toBe(201)
            
            const res = await request.post("/auth/signup", formdata)
    
            expect(res.status).toBe(409)
            expect(res.data.message).toBe(`${formdata.username} already exists`)
        })
    })

    describe("POST to /auth/login", () => {
        let user
        beforeEach(() => {
            user = {
                password : formdata.password,
                username: formdata.username
            }
        })
        
        it("returns 200 with authorization token when user is valid", async () => {
            await request.post("/auth/signup", formdata)

            const res = await request.post("/auth/login", user)

            expect(res.status).toBe(200)
            expect(res.data.token.length).toBeGreaterThan(0)
            expect(res.data.username).toBe(formdata.username)
        })
        
        it("returns 401 when user is not found", async () => {
            const res = await request.post("/auth/login", user)

            expect(res.status).toBe(401)
            expect(res.data.message).toBe("Invalid user or password")
        })

        it("return 401 when password does not match", async () => {
            await createUser()

            user.password = "wrongpassword"
            const res = await request.post("/auth/login", user)

            expect(res.status).toBe(401)
            expect(res.data.message).toBe("Invalid user or password")
        })
    })

    describe("GET /auth/me", () => {
        it("returns 200 with athorization token and revalidate the user " , async () => {
            const signup = await createUser()

            const res = await request.get("/auth/me", {
                headers: {
                    Authorization: `Bearer ${signup.token}`
                }
            })

            expect(res.status).toBe(200)
            expect(res.data.token.length).toBeGreaterThan(0)
        })

    })

    describe("Tweets API", () => {
        describe("POST /tweets", () => {
            it("returns 201 and creates a tweet", async () => {
                const user = await createUser()
                const {res, text} = await createTweets(user)

                expect(res.status).toBe(201)
                expect(res.data.text).toBe(text)
            })
        })
        
        describe("GET /tweets", () => {
            it("returns 200 with all tweets when username is not provided", async () => {
                const user = await createUser()
                const user2 = await createUser()
                await createTweets(user)
                await createTweets(user2)

                const res = await createReqWithToken("/tweets", user)

                expect(res.status).toBe(200)
                expect(res.data.length).toBeGreaterThanOrEqual(2)
            }) 

            it("returns 200 with user tweets when username is provided", async () => {
                const user = await createUser()
                const user2 = await createUser()
                await createTweets(user)
                await createTweets(user2)

                const res = await createReqWithToken(`/tweets?username=${user.username}`, user)

                expect(res.status).toBe(200)
                expect(res.data.length).toBe(1)
            })
        })
    })

    async function createReqWithToken(url, user) {
        return await  request.get(url, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
    }

    async function createTweets(user) {
        const text = faker.string.alpha(20)

        const res =  await request.post("/tweets", {text}, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        return {res, text}
    }

    async function createUser() {
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
})

