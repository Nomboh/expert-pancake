import { createContext, useContext } from "react";
import { activityStore } from "./activityStore";

interface Store {
  activityStore: activityStore;
}

export const store: Store = {
  activityStore: new activityStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
