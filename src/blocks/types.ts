import { Channel } from "../channels/types";
import { User } from "../users/types";

export type Block = {
  id: number;
  title: string | null;
  updated_at: Date;
  created_at: Date;
  state: "Available" | "Failure" | "Procesed" | "Processing";
  comment_count: number;
  generated_title: string;
  class: "Image" | "Text" | "Link" | "Media" | "Attachment";
  base_class: "Block";
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
    thumb: { url: string };
    display: { url: string };
    original: { url: string };
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
  base_class: "Channels";
  class: "Channel";
  channels: Channel[];
};

export type BlocksResponse = {
  length: number;
  total_pages: number;
  current_page: number;
  per: number;
  channel_title: string | null;
  base_class: "Block";
  class: "Text";
  channels: Channel[];
};

export type ChannelsResponse = {
  base_class: "Block";
  channel_title: null | string;
  channels: Channel[];
  class: "Image" | "Text" | "Link" | "Media" | "Attachment";
  current_page: number;
  length: number;
  per: number;
  total_pages: number;
};

export type BlockCreationData =
  | { source: string; content?: never }
  | { source?: never; content: string };

export type BlockUpdateData = {
  title?: string;
  description?: string;
  content?: string;
};
