import { User } from "./user";

export interface Profile {
  username: string;
  displayName: string;
  bio?: string;
  image?: string;
  photos?: Photo[];
  following: boolean;
  followingCount: number;
  followerCount: number;
}

export class Profile implements Profile {
  /**
   *
   */
  constructor(user: User) {
    this.username = user.username;
    this.image = user.image;
    this.displayName = user.displayName;
  }
}

export interface Photo {
  id: string;
  url: string;
  isMain: boolean;
}

export interface UserActivity {
  id: string;
  title: string;
  category: string;
  date: Date;
}
