const MusicClient = require('../MusicClient');
const MusicService = require('../MusicService');

jest.mock('../MusicClient.js');

describe('MusicService', () => {
  const get = jest.fn(() => ['song1', 'song2']);
  MusicClient.mockImplementation(() => ({
    get,
  }));
  let musicService;
  beforeEach(() => {
    musicService = new MusicService(new MusicClient());
  });

  afterEach(() => {
    get.mockClear();
    MusicClient.mockClear();
  });

  test('fetching favorite music', async () => {
    await musicService.getFavoriteMusic();

    expect(musicService.favoriteMusic).toStrictEqual(['song1', 'song2']);
  });

  test('calls get() only once after fetching favorite music', async () => {
    await musicService.getFavoriteMusic();
    await musicService.getFavoriteMusic();

    expect(get).toHaveBeenCalledTimes(1);
  });
});
