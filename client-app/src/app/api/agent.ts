import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Activity, ActivityFormValues } from "../models/activity";
import { User, UserFormValues } from "../models/user";
import { router } from "../routes/Router";
import { store } from "../store/store";

const sleep = (delay: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(config => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async response => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;

    switch (status) {
      case 400:
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }

        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          router.navigate("/not-found");
        }
        break;

      case 500:
        store.commonStore.setServerError(data);
        router.navigate("/server-error");
        break;

      case 404:
        router.navigate("/not-found");
        break;

      case 401:
        toast.error("Unauthorized");
        break;

      case 403:
        toast.error("Forbidden");
        console.log(data);
        break;
    }
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: () => request.get<Activity[]>("/activities"),
  details: (id: string) => request.get<Activity>(`/activities/${id}`),
  create: (activity: ActivityFormValues) =>
    request.post<void>(`/activities`, activity),
  update: (activity: ActivityFormValues) =>
    request.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => request.delete<void>(`/activities/${id}`),
  attend: (id: string) => request.post<void>(`/activities/${id}/attend`, {}),
};

const Account = {
  current: () => request.get<User>("/account"),
  login: (userData: UserFormValues) =>
    request.post<User>("/account/login", userData),
  register: (userData: UserFormValues) =>
    request.post<User>("/account/register", userData),
};

const agent = {
  Activities,
  Account,
};

export default agent;
