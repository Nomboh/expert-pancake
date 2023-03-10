import { Profile } from "./profile";

export interface Activity {
  id: string;
  title: string;
  date: Date | null;
  description: string;
  category: string;
  city: string;
  venue: string;
  hostUsername: string;
  attendees: Profile[];
  isHost: boolean;
  host?: Profile;
  isGoing: boolean;
  isCancelled: boolean;
}

export class Activity implements Activity {
  /**
   *
   */
  constructor(activity: ActivityFormValues) {
    Object.assign(this, activity);
  }
}

export class ActivityFormValues {
  id?: string = undefined;
  title: string = "";
  category: string = "";
  venue: string = "";
  city: string = "";
  description: string = "";
  date: Date | null = null;

  constructor(activity?: ActivityFormValues) {
    if (activity) {
      this.category = activity.category;
      this.id = activity.id;
      this.venue = activity.venue;
      this.city = activity.city;
      this.description = activity.description;
      this.title = activity.title;
      this.date = activity.date;
    }
  }
}
