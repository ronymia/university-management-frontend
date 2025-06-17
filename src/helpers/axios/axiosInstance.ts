import { authKey } from "@/constants/storageKey";

import { IGenericErrorResponse, ResponseSuccessType } from "@/types";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
      config.headers.authorization = "Bearer " + accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  // @ts-expect-error: Response type does not match AxiosResponse, we are transforming it to ResponseSuccessType
  function (response) {
    const responseObject: ResponseSuccessType = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  async function (error) {
    // if (error?.response?.status === 403) {
    //   console.log({ error });
    // } else {
    //   // console.log("axios instance", { error });
    //   const responseObject: IGenericErrorResponse = {
    //     statusCode: error?.response?.status || 500,
    //     message: error?.response?.data?.message || "Something went wrong",
    //     errorMessages: error?.response?.data.errorMessages || [],
    //   };
    //   console.log({ responseObject });
    //   return Promise.reject(responseObject);
    // }
    // console.log("error", { error });
    return Promise.reject(error);
  }
);

export { instance };
