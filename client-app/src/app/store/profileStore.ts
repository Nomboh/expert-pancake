import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Photo, Profile } from "../models/profile";
import { store } from "./store";

export default class ProfileStore {
  profile: Profile | null = null;
  loadingProfile = false;
  uploading = false;
  loading = false;

  /**
   *
   */
  constructor() {
    makeAutoObservable(this);
  }

  get isCurrentUser() {
    const user = store.userStore.user;
    if (user?.username === this.profile?.username) return true;
    return false;
  }

  loadProfile = async (username: string) => {
    this.loadingProfile = true;

    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingProfile = false));
    }
  };

  uploadPhoto = async (file: Blob) => {
    this.uploading = true;

    try {
      const response = await agent.Profiles.uploadPhoto(file);
      const photo = response.data;
      runInAction(() => {
        if (photo && this.profile) {
          this.profile?.photos?.push(photo);
          if (photo.isMain && store.userStore.user) {
            store.userStore.setImage(photo.url);
            this.profile.image = photo.url;
          }
        }
        this.uploading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.uploading = false));
    }
  };

  setMainPhoto = async (photo: Photo) => {
    this.loading = true;

    try {
      await agent.Profiles.setMain(photo.id);
      store.userStore.setImage(photo.url);
      runInAction(() => {
        if (this.profile && this.profile.photos) {
          this.profile.photos.find(x => x.isMain)!.isMain = false;
          this.profile.photos.find(x => x.id === photo.id)!.isMain = true;

          this.profile.image = photo.url;
          this.loading = false;
        }
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };

  deletePhoto = async (photo: Photo) => {
    this.loading = true;

    try {
      await agent.Profiles.deletePhoto(photo.id);
      runInAction(() => {
        this.profile!.photos = this.profile?.photos?.filter(
          p => p.id !== photo.id
        );

        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };
}
