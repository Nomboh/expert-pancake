import { createContext, useContext } from "react";
import { activityStore } from "./activityStore";
import CommonStore from "./commonStore";

interface Store {
  activityStore: activityStore;
  commonStore: CommonStore;
}

export const store: Store = {
  activityStore: new activityStore(),
  commonStore: new CommonStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
