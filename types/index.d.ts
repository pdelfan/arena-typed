export type APIResponse<T> = {
  data: T;
};

export type Block = {
  id: number;
  title: string | null;
  updated_at: Date;
  created_at: Date;
  state: 'Available' | 'Failure' | 'Procesed' | 'Processing';
  comment_count: number;
  generated_title: string;
  class: 'Image' | 'Text' | 'Link' | 'Media' | 'Attachment';
  base_class: 'Block';
  content: string | null;
  content_html: string | null;
  description: string | null;
  description_html: string | null;
  source: null | {
    title?: string;
    url: string;
    provider: {
      name: string;
      url: string;
    } | null;
  };
  image: null | {
    filename: string;
    content_type: string;
    updated_at: Date;
    thumb: string;
    display: string;
    original: string;
  };
  user: User;
  connections?: Channel[];
};

export type Connection = {
  length: number;
  total_pages: number;
  current_page: number;
  per: number;
  channel_title: string | null;
  base_class: 'Channels';
  class: 'Channel';
  channels: Channel[];
};

export type BlocksResponse = {
  length: number;
  total_pages: number;
  current_page: number;
  per: number;
  channel_title: string | null;
  base_class: 'Block';
  class: 'Text';
  channels: Channel[];
};

export type ChannelsResponse = {
  base_class: 'Block';
  channel_title: null | string;
  channels: Channel[];
  class: 'Image' | 'Text' | 'Link' | 'Media' | 'Attachment';
  current_page: number;
  length: number;
  per: number;
  total_pages: number;
};

export type BlockCreationData = { source: string; content?: never } | { source?: never; content: string };

export type BlockUpdateData = {
  title?: string;
  description?: string;
  content?: string;
};

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
