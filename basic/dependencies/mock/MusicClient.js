class MusicClient {
    async get() {
        const data = await fetch("http://music.com/myfavorites")
        return await data.json()
    }
}

module.exports = MusicClient