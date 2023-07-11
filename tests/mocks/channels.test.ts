import Arena from '../../src/index';
import axios from 'axios';
import {
  CHANNEL_ADDED_COLLABORATORS,
  CHANNEL_COLLABORATORS_RESULT,
  CHANNEL_CONNECTIONS_RESULT,
  CHANNEL_CONTENTS_RESULT,
  CHANNEL_RESULT,
  CHANNEL_THUMB_RESULT,
  NEW_CHANNEL_RESULT,
} from './mockData/channelsMockData';
import { BASE_URL, ACCESS_TOKEN } from './config';
import { NEW_BLOCK_RESULT } from './mockData/blocksMockData';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const arena = new Arena(ACCESS_TOKEN);

describe('Arena Channels', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetch a channel', async () => {
    // Prepare the mock response
    const channel = CHANNEL_RESULT;
    const query = 'changelog';

    const resp = {
      data: CHANNEL_RESULT,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    // Mock the Axios get method
    mockedAxios.get.mockImplementation(() => Promise.resolve(resp));

    const result = await arena.channels.get(query);

    // check header and number of calls
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `channels/${query}`,
      expect.objectContaining({
        baseURL: BASE_URL,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }),
    );

    // check response
    expect(result).toEqual(channel);
  });

  test('fetch basic information for a channel', async () => {
    const channel = { ...CHANNEL_THUMB_RESULT };
    const query = 'changelog';

    const resp = {
      data: channel,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    mockedAxios.get.mockImplementation(() => Promise.resolve(resp));
    const result = await arena.channels.thumb(query);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `channels/${query}/thumb`,
      expect.objectContaining({
        baseURL: BASE_URL,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }),
    );

    expect(result).toEqual(channel);
  });

  test('return connections within a channel without fetching actual objects', async () => {
    const connections = CHANNEL_CONNECTIONS_RESULT;
    const query = 'changelog';

    const resp = {
      data: CHANNEL_CONNECTIONS_RESULT,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    mockedAxios.get.mockImplementation(() => Promise.resolve(resp));
    const result = await arena.channels.connections(query);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `channels/${query}/connections`,
      expect.objectContaining({
        baseURL: BASE_URL,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }),
    );

    expect(result).toEqual(connections);
  });

  test('return all the contents of a channel', async () => {
    const contents = CHANNEL_CONTENTS_RESULT;
    const query = 'arena-influences';

    const resp = {
      data: { contents: CHANNEL_CONTENTS_RESULT },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    mockedAxios.get.mockImplementation(() => Promise.resolve(resp));
    const result = await arena.channels.contents(query);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `channels/${query}/contents`,
      expect.objectContaining({
        baseURL: BASE_URL,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }),
    );

    expect(result).toEqual(contents);
  });

  test('create a new channel and return it', async () => {
    const createdChannel = NEW_CHANNEL_RESULT;
    const resp = {
      data: NEW_CHANNEL_RESULT,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    mockedAxios.post.mockImplementation(() => Promise.resolve(resp));
    const result = await arena.channels.create({ title: 'title for new channel', status: 'public' });

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      'channels',
      { title: 'title for new channel', status: 'public' },
      expect.objectContaining({
        baseURL: BASE_URL,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }),
    );

    expect(result).toEqual(createdChannel);
  });

  test('update a channel', async () => {
    const updatedChannel = { ...CHANNEL_RESULT };
    const channelID = updatedChannel.id.toString();
    const newTitle = 'updated title';
    updatedChannel.title = newTitle;

    const resp = {
      data: updatedChannel,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    mockedAxios.put.mockImplementation(() => Promise.resolve(resp));
    const result = await arena.channels.update(channelID, {
      title: 'updated title',
    });

    expect(mockedAxios.put).toHaveBeenCalledTimes(1);
    expect(mockedAxios.put).toHaveBeenCalledWith(
      `channels/${channelID}`,
      { title: newTitle },
      expect.objectContaining({
        baseURL: BASE_URL,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }),
    );

    expect(result.title).not.toEqual(CHANNEL_RESULT.title);
    expect(result).toEqual(updatedChannel);
  });

  test('create a new block, add it tot he specified channel, and return it', async () => {
    const createdBlock = { ...NEW_BLOCK_RESULT };
    const resp = {
      data: createdBlock,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    mockedAxios.post.mockImplementation(() => Promise.resolve(resp));
    const result = await arena.channels.createBlock('channel-name', { source: 'title for new block' });

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

  test('return all members that are part of a channel, except the owner', async () => {
    const collaborators = CHANNEL_COLLABORATORS_RESULT;
    const query = 'arena-influences';

    const resp = {
      data: { users: collaborators },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    mockedAxios.get.mockImplementation(() => Promise.resolve(resp));
    const result = await arena.channels.collaborators(query);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `channels/${query}/collaborators`,
      expect.objectContaining({
        baseURL: BASE_URL,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }),
    );

    expect(result).toEqual(collaborators);
  });

  test('add collaborators and return the current list of collaborators', async () => {
    const collaborators = { ...CHANNEL_ADDED_COLLABORATORS };
    const userID = 5855235565841;

    const resp = {
      data: { collaborators: collaborators },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    mockedAxios.post.mockImplementation(() => Promise.resolve(resp));
    const result = await arena.channels.addCollaborators('channel-name', { ids: [userID] });

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      'channels/channel-name/collaborators',
      { ids: [5855235565841] },
      expect.objectContaining({
        baseURL: BASE_URL,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }),
    );

    expect(result[0].id).toEqual(userID);
    expect(result).toEqual(collaborators);
  });
});
