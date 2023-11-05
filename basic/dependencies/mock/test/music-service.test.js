const MusicClient = require("../MusicClient")
const MusicService = require("../MusicService")

jest.mock("../MusicClient")

describe("MusicService", () => {
    const get = jest.fn(async() => ["song1", "song2"])    
    MusicClient.mockImplementation(() => {
        return {
            get
        }
    })

    let musicService 
    beforeEach(() => {
        musicService = new MusicService(new MusicClient())
    })

    afterEach(() => {
        get.mockClear()
        MusicClient.mockClear()
    })

    test("get function is called only once", async () => {
        await musicService.getFavoriteMusic()
        await musicService.getFavoriteMusic()

        expect(get).toHaveBeenCalledTimes(1)
    })
})