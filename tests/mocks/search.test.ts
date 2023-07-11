import Arena from '../../src/index';
import axios from 'axios';
import { BASE_URL, ACCESS_TOKEN } from './config';
import {
  QUERY_ALL_RESULT,
  QUERY_USERS_RESULT,
  QUERY_CHANNELS_RESULT,
  QUERY_BLOCKS_RESULT,
} from './mockData/searchMockData';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const arena = new Arena(ACCESS_TOKEN);

describe('Arena Search', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('perform a search', async () => {
    // Prepare the mock response
    const queryResponse = { ...QUERY_ALL_RESULT };
    const query = queryResponse.term;

    const resp = {
      data: { ...QUERY_ALL_RESULT },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    // Mock the Axios get method
    mockedAxios.get.mockImplementation(() => Promise.resolve(resp));

    const result = await arena.search.all(query);

    // check header and number of calls
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `search?q=${query}`,
      expect.objectContaining({
        baseURL: BASE_URL,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }),
    );

    // check response
    expect(result.term).toEqual(query);
    expect(result).toEqual(queryResponse);
  });

  test('search for users and return a list', async () => {
    const queryResponse = { ...QUERY_USERS_RESULT };
    const query = 'testing-arena';

    const resp = {
      data: { users: queryResponse },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    mockedAxios.get.mockImplementation(() => Promise.resolve(resp));
    const result = await arena.search.users(query);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `search/users?q=${query}`,
      expect.objectContaining({
        baseURL: BASE_URL,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }),
    );

    expect(result).toEqual(queryResponse);
  });

  test('search for channels and return a list', async () => {
    const queryResponse = { ...QUERY_CHANNELS_RESULT };
    const query = QUERY_CHANNELS_RESULT.term;

    const resp = {
      data: { channels: queryResponse },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    mockedAxios.get.mockImplementation(() => Promise.resolve(resp));
    const result = await arena.search.channels(query);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `search/channels?q=${query}`,
      expect.objectContaining({
        baseURL: BASE_URL,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }),
    );

    expect(result).toEqual(queryResponse);
  });

  test('search for blocks and return a list', async () => {
    const queryResponse = { ...QUERY_BLOCKS_RESULT };
    const query = 'testing';

    const resp = {
      data: { blocks: queryResponse },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    mockedAxios.get.mockImplementation(() => Promise.resolve(resp));
    const result = await arena.search.blocks(query);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `search/blocks?q=${query}`,
      expect.objectContaining({
        baseURL: BASE_URL,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }),
    );

    expect(result).toEqual(queryResponse);
  });
});
