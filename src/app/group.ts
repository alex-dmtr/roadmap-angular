import { User } from './user';

export class Group {
  id?: number
  name: string
  description: string
  avatarUrl: string
  owner: User
  members?: User[]
};