import { Block } from '../blocks/types';
import { Channel } from '../channels/types';

export type Following = User[] | Channel[] | Block[];

export type AvatarImage = {
  thumb: string;
  display: string;
};

export type User = {
  id: number;
  slug: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar: string;
  avatar_image: AvatarImage | null;
  channel_count: number;
  following_count: number;
  profile_id: number;
  follower_count: number;
  class: 'User';
  initials: string;
};

export type UserResponse = {
  base_class: 'User';
  channel_title: string | null;
  class: 'User';
  current_page: number;
  length: number;
  per: number;
  total_pages: number;
};

export type FollowerResponse = UserResponse & {
  users: User[];
};

export type FollowingResponse = UserResponse & {
  following: Following;
};

export type UserChannelsResponse = UserResponse & {
  channels: Channel[];
};
