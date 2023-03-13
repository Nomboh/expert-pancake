import { createContext, useContext } from "react";
import { activityStore } from "./activityStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import UserStore from "./userStore";

interface Store {
  activityStore: activityStore;
  commonStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
  profileStore: ProfileStore;
}

export const store: Store = {
  activityStore: new activityStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
  profileStore: new ProfileStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
