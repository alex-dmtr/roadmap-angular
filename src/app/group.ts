import { User } from './user';
import { Post } from './post';

export class Group {
  id?: number
  name: string = "name";
  description: string = "description";
  avatarUrl: string = "";
  owner: User = new User();
  members?: User[] = [];
  posts?: Post[] = [];
};