import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity, ActivityFormValues } from "../models/activity";
// import { v4 as uuid } from "uuid";
import { format } from "date-fns";
import { store } from "./store";
import { Profile } from "../models/profile";

export class activityStore {
  activityRegistry = new Map<string, Activity>();
  loadingInitial = false;
  selectedActivity: Activity | undefined = undefined;
  loading = false;
  editMode = false;

  constructor() {
    makeAutoObservable(this);
  }

  get getActivitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );
  }

  get groupedActivities() {
    return Object.entries(
      this.getActivitiesByDate.reduce((activities, activity) => {
        const date = format(activity.date!, "dd MMM yyyy");
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  }

  loadActivities = async () => {
    this.setLoadingInitial(true);

    try {
      const response = await agent.Activities.list();
      runInAction(() => {
        response.forEach(activity => {
          this.setActivity(activity);
          this.setLoadingInitial(false);
        });
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setLoadingInitial(false);
      });
    }
  };

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);

    if (activity) {
      this.selectedActivity = activity;
      return activity;
    } else {
      this.setLoadingInitial(true);
      try {
        activity = await agent.Activities.details(id);
        this.setActivity(activity);
        runInAction(() => {
          this.selectedActivity = activity;
          this.setLoadingInitial(false);
        });
        return activity;
      } catch (error) {
        console.log(error);
        runInAction(() => this.setLoadingInitial(false));
      }
    }
  };

  private setActivity = (activity: Activity) => {
    const user = store.userStore.user;

    if (user) {
      activity.isGoing = activity.attendees!.some(
        x => x.username === user.username
      );

      activity.isHost = activity.hostUsername === user.username;

      activity.host = activity.attendees!.find(
        x => x.username === activity.hostUsername
      );
    }
    activity.date = new Date(activity.date!);
    this.activityRegistry.set(activity.id, activity);
  };

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  private setLoadingInitial = (isLoading: boolean) => {
    this.loadingInitial = isLoading;
  };

  createActivity = async (activity: ActivityFormValues) => {
    const user = store.userStore.user;
    const attendee = new Profile(user!);
    try {
      await agent.Activities.create(activity);
      const newActivity = new Activity(activity);
      newActivity.hostUsername = user!.username;
      newActivity.attendees = [attendee];
      this.setActivity(newActivity);
      runInAction(() => {
        this.selectedActivity = newActivity;
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateActivity = async (activity: ActivityFormValues) => {
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        if (activity.id) {
          let updatedActivity = {
            ...this.getActivity(activity.id),
            ...activity,
          };

          this.activityRegistry.set(activity.id, updatedActivity as Activity);

          this.selectedActivity = activity as Activity;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteActivity = async (id: string) => {
    this.loading = true;

    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateAttendance = async () => {
    const user = store.userStore.user;
    this.loading = true;

    try {
      await agent.Activities.attend(this.selectedActivity!.id);

      runInAction(() => {
        if (this.selectedActivity?.isGoing) {
          this.selectedActivity.attendees =
            this.selectedActivity.attendees?.filter(
              attendee => attendee.username !== user?.username
            );

          this.selectedActivity.isGoing = false;
        } else {
          const attendee = new Profile(user!);
          this.selectedActivity?.attendees?.push(attendee);
          this.selectedActivity!.isGoing = true;
        }
        this.activityRegistry.set(
          this.selectedActivity!.id,
          this.selectedActivity!
        );
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };

  cancelActivityAttendee = async () => {
    this.loading = true;

    try {
      await agent.Activities.attend(this.selectedActivity!.id);

      runInAction(() => {
        if (this.selectedActivity) {
          this.selectedActivity.isCancelled =
            !this.selectedActivity.isCancelled;
          this.activityRegistry.set(
            this.selectedActivity.id,
            this.selectedActivity
          );
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };

  clearSelectedActivity = () => {
    this.selectedActivity = undefined;
  };
}
