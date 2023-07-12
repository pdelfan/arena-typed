import { Block } from '../blocks/types';
import { Channel } from '../channels/types';
import { User } from '../users/types';

export type SearchResponse = {
  term: string;
  users: User[];
  channels: Channel[];
  blocks: Block[];
  total_pages: number;
  current_page: number;
  per: number;
  length: number;
};
