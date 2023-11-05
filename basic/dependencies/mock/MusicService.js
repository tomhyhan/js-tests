class MusicService {
    constructor(client) {
        this.client = client
        this.favorites = null
    }

    async getFavoriteMusic() {
        if (this.favorites === null) {
            const favorites = await this.client.get()  
            this.favorites = favorites
        }
    }
}

module.exports = MusicService