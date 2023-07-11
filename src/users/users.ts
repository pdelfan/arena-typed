import { Channel } from '../channels/types';
import { Request } from '../request/request';
import { FollowerResponse, Following, FollowingResponse, User, UserChannelsResponse } from './types';

export class Users extends Request {
  private endpoint = 'users/';

  public async get(username: string): Promise<User> {
    return this.GET_REQUEST<User>(`${this.endpoint}${username}`);
  }

  public async channels(username: string): Promise<Channel[]> {
    return this.GET_REQUEST<UserChannelsResponse>(`${this.endpoint}${username}/channels`).then((res) => res.channels);
  }

  public async followers(username: string): Promise<User[]> {
    return this.GET_REQUEST<FollowerResponse>(`${this.endpoint}${username}/followers`).then((res) => res.users);
  }

  public async following(username: string): Promise<Following> {
    return this.GET_REQUEST<FollowingResponse>(`${this.endpoint}${username}/following`).then((res) => res.following);
  }
}
