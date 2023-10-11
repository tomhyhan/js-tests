class MusicService {
  constructor(client) {
    this.client = client;
    this.favoriteMusic = null;
  }

  async getFavoriteMusic() {
    if (this.favoriteMusic === null) {
      this.favoriteMusic = await this.client.get();
    }
  }
}

module.exports = MusicService;
