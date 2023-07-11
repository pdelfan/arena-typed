import Arena from '../../src/index';
import axios from 'axios';
import { BLOCK_RESULT, CHANNELS_BLOCK_APPEARS_IN_RESULT, NEW_BLOCK_RESULT } from './mockData/blocksMockData';
import { BASE_URL, ACCESS_TOKEN } from './config';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const arena = new Arena(ACCESS_TOKEN);

describe('Arena Blocks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetch a block', async () => {
    // Prepare the mock response
    const block = { ...BLOCK_RESULT };
    const resp = {
      data: block,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    // Mock the Axios get method
    mockedAxios.get.mockImplementation(() => Promise.resolve(resp));

    const result = await arena.blocks.get(22573894);

    // check header and number of calls
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'blocks/22573894',
      expect.objectContaining({
        baseURL: BASE_URL,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }),
    );

    // check response
    expect(result).toEqual(block);
  });

  test('fetch a list of channels the block exists in', async () => {
    const channels = { ...CHANNELS_BLOCK_APPEARS_IN_RESULT };
    const resp = {
      data: { channels: channels },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    mockedAxios.get.mockImplementation(() => Promise.resolve(resp));
    const result = await arena.blocks.channels(8693);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'blocks/8693/channels',
      expect.objectContaining({
        baseURL: BASE_URL,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }),
    );

    expect(result).toEqual(channels);
  });

  test('create a new block and return it', async () => {
    const createdBlock = { ...NEW_BLOCK_RESULT };
    const resp = {
      data: createdBlock,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    mockedAxios.post.mockImplementation(() => Promise.resolve(resp));
    const result = await arena.blocks.create('channel-name', { source: 'title for new block' });

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      'channels/channel-name/blocks',
      { source: 'title for new block' },
      expect.objectContaining({
        baseURL: BASE_URL,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }),
    );

    expect(result).toEqual(createdBlock);
  });

  test('update a block', async () => {
    const updatedBlock = { ...BLOCK_RESULT };
    const blockID = updatedBlock.id;
    const newTitle = 'updated title';
    updatedBlock.title = newTitle;

    const resp = {
      data: updatedBlock,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    mockedAxios.put.mockImplementation(() => Promise.resolve(resp));
    const result = await arena.blocks.update(blockID, {
      title: 'updated title',
    });

    expect(mockedAxios.put).toHaveBeenCalledTimes(1);
    expect(mockedAxios.put).toHaveBeenCalledWith(
      `blocks/${blockID}`,
      { title: newTitle },
      expect.objectContaining({
        baseURL: BASE_URL,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }),
    );

    expect(result).toEqual(updatedBlock);
  });
});
