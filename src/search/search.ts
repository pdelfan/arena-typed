import { Block, Channel, PaginationParams, User, SearchResponse } from '../../types/index';
import { Request } from '../request/request';

export class Search extends Request {
  private endpoint = 'search';

  public async all(query: string, pagination: PaginationParams = {}): Promise<SearchResponse> {
    const params = {
      ...pagination,
    };
    return this.GET_REQUEST<SearchResponse>(`${this.endpoint}?q=${query}`, {
      params,
    });
  }

  public async users(username: string): Promise<User[]> {
    return this.GET_REQUEST<SearchResponse>(`${this.endpoint}/users?q=${username}`).then((res) => res.users);
  }

  public async channels(channel: string): Promise<Channel[]> {
    return this.GET_REQUEST<SearchResponse>(`${this.endpoint}/channels?q=${channel}`).then((res) => res.channels);
  }

  public async blocks(block: string): Promise<Block[]> {
    return this.GET_REQUEST<SearchResponse>(`${this.endpoint}/blocks?q=${block}`).then((res) => res.blocks);
  }
}
