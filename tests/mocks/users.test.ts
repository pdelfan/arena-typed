import Arena from '../../src/index';
import axios from 'axios';
import { BASE_URL, ACCESS_TOKEN } from './config';
import {
  USER_CHANNELS_RESULT,
  USER_FOLLOWER_RESULT,
  USER_FOLLOWING_RESULT,
  USER_RESULT,
} from './mockData/usersMockData';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const arena = new Arena(ACCESS_TOKEN);

describe('Arena Users', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Return a user', async () => {
    // Prepare the mock response
    const queryResponse = { ...USER_RESULT };
    const query = 'testing-arena';

    const resp = {
      data: queryResponse,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    // Mock the Axios get method
    mockedAxios.get.mockImplementation(() => Promise.resolve(resp));

    const result = await arena.users.get(query);

    // check header and number of calls
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `users/${query}`,
      expect.objectContaining({
        baseURL: BASE_URL,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }),
    );

    // check response
    expect(result).toEqual(queryResponse);
  });

  test(`Return a list of the specified user's channel`, async () => {
    const queryResponse = { ...USER_CHANNELS_RESULT };
    const query = 'testing-arena';

    const resp = {
      data: { channels: queryResponse },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    mockedAxios.get.mockImplementation(() => Promise.resolve(resp));
    const result = await arena.users.channels(query);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `users/${query}/channels`,
      expect.objectContaining({
        baseURL: BASE_URL,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }),
    );

    expect(result).toEqual(queryResponse);
  });

  test(`Return a list of the specified user's followed channels and users`, async () => {
    const queryResponse = { ...USER_FOLLOWING_RESULT };
    const query = 'testing-arena';

    const resp = {
      data: { following: queryResponse },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    
    mockedAxios.get.mockImplementation(() => Promise.resolve(resp));
    const result = await arena.users.following(query);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `users/${query}/following`,
      expect.objectContaining({
        baseURL: BASE_URL,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }),
    );

    expect(result).toEqual(queryResponse);
  });

  test(`Return a list of users following the specified user`, async () => {
    const queryResponse = { ...USER_FOLLOWER_RESULT };
    const query = 'sample-user';

    const resp = {
      data: { users: queryResponse },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    mockedAxios.get.mockImplementation(() => Promise.resolve(resp));
    const result = await arena.users.followers(query);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `users/${query}/followers`,
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
