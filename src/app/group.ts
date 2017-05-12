import { User } from './user';
import { Post } from './post';

export class Group {
  id?: number
  name: string
  description: string
  avatarUrl: string
  owner: User
  members?: User[]
  posts?: Post[]
};