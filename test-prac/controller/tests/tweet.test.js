
import TweetController from './../tweet';
import httpMocks from 'node-mocks-http';
import { faker } from '@faker-js/faker';
import { createTweet } from '../../tests/fakeData';


describe("tweetController", () => {
    let tweetController
    let tweetRepository
    let getSocketIO
    beforeEach(() => {
        tweetRepository = {
            getAll: jest.fn(),
            getAllByUsername: jest.fn(),
            getById: jest.fn(),
            create: jest.fn(),
            update: jest.fn()
        }
        getSocketIO = {
            emit: jest.fn()
        }
        tweetController = new TweetController(tweetRepository, () => getSocketIO )
    })
    describe("getTweets", () => {
        it("returns 200 with all tweets when username is not provided", async () => {
            const {req, res} = create_req_res()
    
            await tweetController.getTweets(req, res)
    
            expect(tweetRepository.getAll).toHaveBeenCalledTimes(1)
            expect(res.statusCode).toBe(200)
        })
    
        it(" returns 200 with user tweets when username is provided", async () => {
            const {req, res} = create_req_res({
                query : {
                    username: "foo"
                }
            })
    
            await tweetController.getTweets(req, res)
    
            expect(tweetRepository.getAllByUsername).toHaveBeenCalledTimes(1)
            expect(res.statusCode).toBe(200)
        })
    })

    describe("getTweet", ()=> {
        it("returns 400 when tweet is not found with a given id", async () => {
            const id = faker.string.alphanumeric(10)
            const {req, res} = create_req_res({
                params: {
                    id
                }
            })
            tweetRepository.getById.mockImplementation(async ()=> undefined)
    
            await tweetController.getTweet(req, res)
    
            expect(res.statusCode).toBe(404)
            expect(res._getJSONData().message).toBe(`Tweet id(${id}) not found`)
        })
    
        it("returns 200 when tweet is found with a given id", async () => {
            const id = faker.string.alphanumeric(10)
            const fakeTweet = createTweet()
            const {req, res} = create_req_res({
                params: {
                    id
                }
            })
            tweetRepository.getById.mockImplementation(async ()=> fakeTweet)
    
            await tweetController.getTweet(req, res)
    
            expect(res.statusCode).toBe(200)
            expect(res._getJSONData()).toStrictEqual(fakeTweet)
        })
    })

    describe("createTweet", () => {
        it("create a tweet with a given text", async () => {
            const text = faker.string.alphanumeric(50)
            const {req, res} = create_req_res({
                body: {
                    text
                }
            })
            tweetRepository.create.mockImplementation(async () => ({text}))
            getSocketIO.emit.mockImplementation((dest, tweet) => ({text}))

            await tweetController.createTweet(req,res)

            expect(res.statusCode).toBe(201)
            expect(res._getJSONData()).toStrictEqual({text})
            expect(tweetRepository.create).toHaveBeenCalledTimes(1)
        })
    })

    
    describe("updateTweet", () => {
        let req, res, text, tweet
        beforeEach(() => {
            text = faker.string.alphanumeric(50)
            tweet = createTweet()
            req = httpMocks.createRequest({
                params: {
                    id: tweet.id
                },
                body: {
                    text
                },
                userId: tweet.userId
            })
            res = httpMocks.createResponse()
        }) 
        it("returns 404 when tweet is not found", async () => {
            tweetRepository.getById.mockImplementation(() => undefined)
            
            await tweetController.updateTweet(req,res)

            expect(res.statusCode).toBe(404)
            expect(res._getJSONData().message).toBe(`Tweet not found: ${tweet.id}`)
        })

        it("returns 403 when tweet user id does not equal to the user id", async () => {
            tweetRepository.getById.mockImplementation((tweetId) => ({userId: faker.string.uuid()}))
            
            await tweetController.updateTweet(req,res)

            expect(res.statusCode).toBe(403)
            expect(tweetRepository.getById).toHaveBeenCalledWith(tweet.id)
        })

        it("returns updated tweet with a given tweet text and id", async () => {
            tweetRepository.getById.mockImplementation((id) => tweet)
            tweetRepository.update.mockImplementation((id, text) => ({...tweet, text}))
            
            await tweetController.updateTweet(req,res)

            expect(res.statusCode).toBe(200)
            expect(res._getJSONData()).toEqual({...tweet, text})
        })
    })

    function create_req_res(reqOptions = null)  {
        return {
            req: httpMocks.createRequest(reqOptions),
            res: httpMocks.createResponse(),
        }
    }
})