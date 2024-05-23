![cover](https://raw.githubusercontent.com/pdelfan/arena-typed/main/cover.png)

# Arena-typed

Unofficial [are.na](https://www.are.na/) API wrapper for TypeScript

## Installation

```bash
npm install arena-typed
```

## Quick start

To get started, create a new `Arena` instance and use its methods.

**Note:** Some actions require authentication. To obtain an access token:

- [Create a new application](https://dev.are.na/oauth/applications/new) on are.na
- Copy the value named `Personal access token`
- Pass it to the `Arena` constructor ex. `new Arena('your-access-token')`

```typescript
import Arena from 'arena-typed';

const arena = new Arena();

const channel = await arena.channels.get('arena-influences');
console.log(channel.title);

// or using promises
arena.channels.get('arena-influences').then((channel) => {
  console.log(channel.title);
});
```

## Usage

The Arena class has four properties which are instances of subclasses with their own methods:

- users
- search
- blocks
- channels

### Params

Some methods support pagination (optional), specified by `pagination`. Pass as an object like so:
`{ page: 2, per: 15 }`

### Users

| Method                      | Returns                  | Description                                                    |
| --------------------------- | ------------------------ | -------------------------------------------------------------- |
| get(username: string)       | `Promise<FollowingType>` | Get a specific user                                            |
| channels(username: string)  | `Promise<Channel[]>`     | Get a list of the specified user's channels                    |
| followers(username: string) | `Promise<User[]`         | Get a list of users following the specified user               |
| following(username: string) | `Promise<User[]>`        | Get a list of the specified user's followed channels and users |

#### Examples

```typescript
arena.users.get('testing-arena').then((users) => console.log('result', users));

arena.users.channels('testing-arena').then((channels) => console.log('result', channels));

arena.users.followers('testing-arena').then((followers) => console.log('result', followers));

arena.users.following('testing-arena').then((following) => console.log('result', following));
```

### Search

| Method                                            | Returns                   | Description         |
| ------------------------------------------------- | ------------------------- | ------------------- |
| all(query: string, pagination?: PaginationParams) | `Promise<SearchResponse>` | Perform a search    |
| users(username: string)                           | `Promise<User[]>`         | Search for users    |
| channels(channel: string)                         | `Promise<Channel[]`       | Search for channels |
| blocks(blocks: string)                            | `Promise<Block[]>`        | Search for blocks   |

#### Examples

```typescript
arena.search.all('testing').then((search) => console.log('result', search));

arena.search.users('testing-arena').then((search) => console.log('result', search));

arena.search.channels('arena-influences').then((search) => console.log('result', search));

arena.search.blocks('testing').then((search) => console.log('result', search));
```

### Blocks

| Method                                           | Returns             | Description                                         |
| ------------------------------------------------ | ------------------- | --------------------------------------------------- |
| get(id: number)                                  | `Promise<Block>`    | Get a block                                         |
| channels(id: number)                             | `Promise<Channel[]` | Get a list of channels the block is in              |
| create(channel: string, data: BlockCreationData) | `Promise<Block>`    | Create a new block in the specified channel         |
| update(id: number, data: BlockUpdateData)        | `Promise<void>`     | Update a block that exists in the specified channel |
| delete(channel: string, id: number)              | `Promise<void>`     | Delete a block that exists in the specified channel |

#### Examples

```typescript
arena.blocks.channels(1234).then((channels) => console.log('channels', channels));

arena.blocks.create('new-channel-name', { source: 'new title' }).then((blocks) => console.log('result', blocks));

arena.blocks
  .update(123456, { title: 'updated title', description: 'updated description' })
  .catch((error) => console.log(error.message));

arena.blocks.delete('channel-name', 12345).catch((error) => console.log(error.message));
```

### Channels

| Method                                                        | Returns                         | Description                                                                                                                                                                                                                       |
| ------------------------------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| get (channel: string, pagination?: PaginationParams)          | `Promise<Channel>`              | Get a channel                                                                                                                                                                                                                     |
| thumb(channel: string)                                        | `Promise<Channel`               | Get basic information about a channel                                                                                                                                                                                             |
| connections(channel: string, pagination?: PaginationParams)   | `Promise<Connection>`           | Get all the connections within a channel                                                                                                                                                                                          |
| contents(channel: string, pagination?: PaginationParams)      | `Promise<(Channel \| Block)[]>` | Get only the contents of a channel (ex. no collaborators)                                                                                                                                                                         |
| create(data: ChannelCreationData)                             | `Promise<Channel>`              | Create a channel                                                                                                                                                                                                                  |
| update(channel: string, data: ChannelCreationData)            | `Promise<Channel>`              | Update a channel                                                                                                                                                                                                                  |
| delete(channel: string)                                       | `Promise<void>`                 | Delete a channel                                                                                                                                                                                                                  |
| createBlock(channel: string, data: BlockCreationData)         | `Promise<Block>`                | Create a block in the specified channel                                                                                                                                                                                           |
| collaborators(channel: string)                                | `Promise<User[]>`               | Get all users that are part of the specified channel, excluding the owner                                                                                                                                                         |
| addCollaborators(channel: string, users: CollaboratorData)    | `Promise<User[]>`               | Add collaborators to the specified channel                                                                                                                                                                                        |
| removeCollaborators(channel: string, users: CollaboratorData) | `Promise<User[]>`               | Delete specified collaborators from the specified channel. **Note:** On the official documentaion, this request is supposed to remove users that are _not_ specified in `users`. However, it currently works the other way around |

#### Examples

```typescript
arena.channels.get('channel-name').then((channel) => console.log('channel', channel));

arena.channels.thumb('channel-name').then((channel) => console.log('channel', channel));

arena.channels.connections('channel-name', { per, 20, page: 2 }).then((channels) => console.log('channel', channels));

arena.channels.contents('channel-name', { per: 3 }).then((contents) => console.log('contents', contents));

arena.channels
  .create({ title: 'new channel name', status: 'public' })
  .then((channel) => console.log('result', channel));

arena.channels
  .update('current-channel-name', { title: 'updated channel name' })
  .then((channel) => console.log('result', channel));

arena.channels
  .delete('channel-name')
  .then(() => console.log('success'))
  .catch((error) => console.log(error.message));

arena.channels
  .createBlock('channel-name', { source: 'new title' })
  .then((channels) => console.log('result', channels));

arena.channels.collaborators('channel-name').then((users) => console.log('collaborators', users));

arena.channels
  .addCollaborators('channel-name', { ids: [12345] })
  .then((channels) => console.log('result', channels));

arena.channels
  .removeCollaborators('updated-channel-name', { ids: [12345] })
  .then((channels) => console.log('result', channels));
```

### Types

#### Users

| Property        | Type                |
| --------------- | ------------------- |
| id              | number              |
| slug            | string              |
| username        | string              |
| first_name      | string              |
| last_name       | string              |
| avatar          | string              |
| avatar_image    | AvatarImage \| null |
| channel_count   | number              |
| following_count | number              |
| profile_id      | number              |
| follower_count  | number              |
| class           | "User"              |
| initials        | string              |

##### AvatarImage

| Property | Type   |
| -------- | ------ |
| thumb    | string |
| display  | string |

##### Following

| Property  | Type                           |
| --------- | ------------------------------ |
| Following | User[] \| Channel[] \| Block[] |

##### UserResponse

| Property      | Type           |
| ------------- | -------------- |
| base_class    | "User"         |
| channel_title | string \| null |
| class         | "User"         |
| current_page  | number         |
| length        | number         |
| per           | number         |
| total_pages   | number         |

##### FollowerResponse

| Property      | Type           |
| ------------- | -------------- |
| users         | User[]         |
| base_class    | "User"         |
| channel_title | string \| null |
| class         | "User"         |
| current_page  | number         |
| length        | number         |
| per           | number         |
| total_pages   | number         |

##### FollowingResponse

| Property      | Type           |
| ------------- | -------------- |
| following     | FollowingType  |
| base_class    | "User"         |
| channel_title | string \| null |
| class         | "User"         |
| current_page  | number         |
| length        | number         |
| per           | number         |
| total_pages   | number         |

##### UserChannelsResponse

| Property      | Type           |
| ------------- | -------------- |
| channels      | Channel[]      |
| base_class    | "User"         |
| channel_title | string \| null |
| class         | "User"         |
| current_page  | number         |
| length        | number         |
| per           | number         |
| total_pages   | number         |

#### Search

##### SearchResponse

| Property     | Type      |
| ------------ | --------- |
| term         | string    |
| users        | User[]    |
| channels     | Channel[] |
| blocks       | Block[]   |
| total_pages  | number    |
| current_page | number    |
| per          | number    |
| length       | number    |

#### Blocks

##### Block

| Property         | Type                                                                                                                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id               | number                                                                                                                                                                                                                                            |
| title            | string \| null                                                                                                                                                                                                                                    |
| updated_at       | Date                                                                                                                                                                                                                                              |
| created_at       | Date                                                                                                                                                                                                                                              |
| state            | "Available" \| "Failure" \| "Procesed" \| "Processing"                                                                                                                                                                                            |
| comment_count    | number                                                                                                                                                                                                                                            |
| generated_title  | string                                                                                                                                                                                                                                            |
| class            | "Image" \| "Text" \| "Link" \| "Media" \| "Attachment"                                                                                                                                                                                            |
| base_class       | "Block"                                                                                                                                                                                                                                           |
| content          | string \| null                                                                                                                                                                                                                                    |
| content_html     | string \| null                                                                                                                                                                                                                                    |
| description      | string \| null                                                                                                                                                                                                                                    |
| description_html | string \| null                                                                                                                                                                                                                                    |
| source           | null \| { title?: string; url: string; provider: { name: string; url: string; } \| null; }                                                                                                                                                        |
| image            | null \| { content_type: string; display: { url: string }; filename: string; lage: { url: string }l original: { file_size: number; file_size_display: string; url: string; }; square: { url: string }; thumb: { url: string }; updated_at: Date; } |
| user             | User                                                                                                                                                                                                                                              |
| connections?     | Channel[] \| undefined                                                                                                                                                                                                                            |

##### Connection

| Property      | Type           |
| ------------- | -------------- |
| length        | number         |
| total_pages   | number         |
| current_page  | number         |
| per           | number         |
| channel_title | string \| null |
| base_class    | "Channels"     |
| class         | "Channel"      |
| channels      | Channel[]      |

##### BlocksResponse

| Property      | Type           |
| ------------- | -------------- |
| length        | number         |
| total_pages   | number         |
| current_page  | number         |
| per           | number         |
| channel_title | string \| null |
| base_class    | "Block"        |
| class         | "Text"         |
| channels      | Channel[]      |

##### ChannelsResponse

| Property      | Type                                                   |
| ------------- | ------------------------------------------------------ |
| base_class    | "Block"                                                |
| channel_title | string \| null                                         |
| channels      | Channel[]                                              |
| class         | "Image" \| "Text" \| "Link" \| "Media" \| "Attachment" |
| current_page  | number                                                 |
| length        | number                                                 |
| per           | number                                                 |
| total_pages   | number                                                 |

##### BlockCreationData

**Note:** Either `source` or `content` is required, but not both.

| Property | Type                |
| -------- | ------------------- |
| source   | string \| undefined |
| content  | string \| undefined |

##### BlockUpdateData

| Property     | Type                |
| ------------ | ------------------- |
| title?       | string \| undefined |
| description? | string \| undefined |
| content?     | string \| undefined |

#### Channels

##### Contents

| Property | Type                    |
| -------- | ----------------------- |
| contents | Array<Block \| Channel> |

##### Channel

| Property       | Type                 |
| -------------- | -------------------- |
| id             | number               |
| title          | string               |
| created_at     | Date                 |
| updated_at     | Date                 |
| published      | boolean              |
| open           | boolean              |
| collaboration  | boolean              |
| slug           | string               |
| length         | number               |
| kind           | string               |
| status         | string               |
| user_id        | number               |
| class          | string               |
| base_class     | string               |
| user           | User                 |
| total_pages    | number               |
| current_page   | number               |
| per            | number               |
| follower_count | number               |
| contents       | (Block \| Channel)[] |
| collaborators  | User[]               |

##### BlockAttributes

| Property             | Type    |
| -------------------- | ------- |
| position             | number  |
| selected             | boolean |
| connected_at         | Date    |
| connected_by_user_id | number  |

##### PaginationParams

| Property | Type   |
| -------- | ------ |
| page?    | number |
| per?     | number |

##### ChannelCreationData

| Property | Type                              |
| -------- | --------------------------------- |
| title    | string                            |
| status?  | 'public' \| 'closed' \| 'private' |

##### CollaboratorData

| Property | Type     |
| -------- | -------- |
| ids      | number[] |

##### CollaboratorResponse

| Property      | Type           |
| ------------- | -------------- |
| channel_title | string \| null |
| current_page  | number         |
| length        | number         |
| per           | number         |
| total_pages   | number         |

##### GetOrDeleteCollaboratorsResponse

| Property      | Type           |
| ------------- | -------------- |
| channel_title | string \| null |
| current_page  | number         |
| length        | number         |
| per           | number         |
| total_pages   | number         |
| users         | User[]         |

##### AddCollaboratorsResponse

| Property      | Type           |
| ------------- | -------------- |
| channel_title | string \| null |
| current_page  | number         |
| length        | number         |
| per           | number         |
| total_pages   | number         |
| collaborators | User[]         |
