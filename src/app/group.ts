import { User } from './user';

export class Group {
  id?: Number
  name: String
  description: String
  avatarUrl: String
  owner: User
  members?: User[]
};