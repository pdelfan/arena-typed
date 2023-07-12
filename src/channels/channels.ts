import { Request } from '../request/request';
import {
  AddCollaboratorsResponse,
  Channel,
  ChannelCreationData,
  CollaboratorData,
  Contents,
  GetOrDeleteCollaboratorsResponse,
  PaginationParams,
  Block,
  BlockCreationData,
  Connection,
  User,
} from '../../types/index';

export class Channels extends Request {
  private endpoint = 'channels';

  public async get(channel: string, pagination: PaginationParams = {}): Promise<Channel> {
    const params = {
      ...pagination,
    };

    return this.GET_REQUEST<Channel>(`${this.endpoint}/${channel}`, { params });
  }

  public async thumb(channel: string): Promise<Channel> {
    return this.GET_REQUEST<Channel>(`${this.endpoint}/${channel}/thumb`);
  }

  public connections(channel: string, pagination: PaginationParams = {}): Promise<Connection> {
    const params = {
      ...pagination,
    };

    return this.GET_REQUEST<Connection>(`${this.endpoint}/${channel}/connections`, { params });
  }

  public async contents(channel: string, pagination: PaginationParams = {}): Promise<(Channel | Block)[]> {
    const params = {
      ...pagination,
    };

    return this.GET_REQUEST<Contents>(`${this.endpoint}/${channel}/contents`, {
      params,
    }).then((res) => res.contents);
  }

  public async create(data: ChannelCreationData): Promise<Channel> {
    return this.POST_REQUEST<Channel>(this.endpoint, data);
  }

  public async update(channel: string, data: ChannelCreationData): Promise<Channel> {
    return this.PUT_REQUEST<Channel>(`${this.endpoint}/${channel}`, data);
  }

  public async delete(channel: string): Promise<void> {
    return this.DELETE_REQUEST(`${this.endpoint}/${channel}`);
  }

  public async createBlock(channel: string, data: BlockCreationData): Promise<Block> {
    return this.POST_REQUEST<Block>(`${this.endpoint}/${channel}/blocks`, data);
  }

  public async collaborators(channel: string): Promise<User[]> {
    return this.GET_REQUEST<GetOrDeleteCollaboratorsResponse>(`${this.endpoint}/${channel}/collaborators`).then(
      (res) => res.users,
    );
  }

  public async addCollaborators(channel: string, users: CollaboratorData): Promise<User[]> {
    return this.POST_REQUEST<AddCollaboratorsResponse>(`${this.endpoint}/${channel}/collaborators`, users).then(
      (res) => res.collaborators,
    );
  }

  public async removeCollaborators(channel: string, users: CollaboratorData): Promise<User[]> {
    return this.DELETE_REQUEST<GetOrDeleteCollaboratorsResponse>(
      `${this.endpoint}/${channel}/collaborators`,
      users,
    ).then((res) => res.users);
  }
}
