import { Blocks } from './blocks/blocks';
import { Channels } from './channels/channels';
import { Search } from './search/search';
import { Users } from './users/users';

export default class Arena {
  users: Users;
  search: Search;
  blocks: Blocks;
  channels: Channels;

  constructor(accessToken?: string) {
    this.users = new Users(accessToken);
    this.search = new Search(accessToken);
    this.blocks = new Blocks(accessToken);
    this.channels = new Channels(accessToken);
  }
}
