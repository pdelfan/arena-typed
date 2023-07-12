import { Request } from '../request/request';
import { Block, BlockCreationData, BlockUpdateData, Channel, ChannelsResponse } from '../../types/index';

export class Blocks extends Request {
  private endpoint = 'blocks';

  public async get(id: number): Promise<Block> {
    return this.GET_REQUEST<Block>(`${this.endpoint}/${id}`);
  }

  public async channels(id: number): Promise<Channel[]> {
    return this.GET_REQUEST<ChannelsResponse>(`${this.endpoint}/${id}/channels`).then((res) => res.channels);
  }

  public async create(channel: string, data: BlockCreationData): Promise<Block> {
    return this.POST_REQUEST<Block>(`channels/${channel}/blocks`, data);
  }

  public async update(id: number, data: BlockUpdateData): Promise<void> {
    return this.PUT_REQUEST<void>(`${this.endpoint}/${id}`, data);
  }

  // on the official docs it's 'channel', but only 'channels' works
  public async delete(channel: string, id: number): Promise<void> {
    return this.DELETE_REQUEST(`channels/${channel}/blocks/${id}`);
  }
}
