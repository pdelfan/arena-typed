import { Block } from '../blocks/types';
import { User } from '../users/types';

export type Contents = {
  contents: Array<Block | Channel>;
};

export type Channel = {
  id: number;
  title: string;
  created_at: Date;
  updated_at: Date;
  published: boolean;
  open: boolean;
  collaboration: boolean;
  slug: string;
  length: number;
  kind: string;
  status: string;
  user_id: number;
  class: string;
  base_class: string;
  user: User;
  total_pages: number;
  current_page: number;
  per: number;
  follower_count: number;
  contents: (Block | Channel)[];
  collaborators: User[];
};

export type BlockAttributes = {
  position: number;
  selected: boolean;
  connected_at: Date;
  connected_by_user_id: number;
};

export type PaginationParams = {
  page?: number;
  per?: number;
};

export type ChannelCreationData = {
  title: string;
  status?: 'public' | 'closed' | 'private';
};

export type CollaboratorData = {
  ids: number[];
};

export type CollaboratorResponse = {
  channel_title: string | null;
  current_page: number;
  length: number;
  per: number;
  total_pages: number;
};

export type GetOrDeleteCollaboratorsResponse = CollaboratorResponse & {
  users: User[];
};

export type AddCollaboratorsResponse = CollaboratorResponse & {
  collaborators: User[];
};
