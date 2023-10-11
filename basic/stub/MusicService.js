class MusicService {
  constructor(client) {
    this.client = client;
  }

  async getFavoriteMusic() {
    return await this.client.get();
  }
}

module.exports = MusicService;
