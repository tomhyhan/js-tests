const MusicService = require('../MusicService');
const MusicClientStub = require('./MusicClientStub');

describe('MusicService', () => {
  let musicService;
  beforeEach(() => {
    musicService = new MusicService(new MusicClientStub());
  });
  test('fetching favorite music', async () => {
    const favoriteMusic = await musicService.getFavoriteMusic();

    expect(favoriteMusic).toStrictEqual(['song1', 'song2']);
  });
});
