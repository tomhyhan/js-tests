class MusicClient {
  async get() {
    const data = await fetch('https://music/myfavorite');
    return await data.json();
  }
}

module.exports = MusicClient;
