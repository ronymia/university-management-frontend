import { authKey } from '@/constants/storageKey';
import { getNewAccessToken } from '@/services/auth.service';

import { ResponseSuccessType } from '@/types';
import { getFromLocalStorage, setToLocalStorage } from '@/utils/local-storage';
import axios from 'axios';

const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers['Accept'] = 'application/json';
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const accessToken = getFromLocalStorage(authKey);
        if (accessToken) {
            config.headers.authorization = 'Bearer ' + accessToken;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
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
        const config = error?.config;

        // console.log({ config });
        const skipRefreshToken = config?.url?.includes('/api/v1/auth/login') || config._retry;
        // HANDLE ACCESS TOKEN
        if (error?.response?.status === 401 && !skipRefreshToken) {
            // console.log({ error });
            config._retry = true;
            try {
                const accessTokenResponse = await getNewAccessToken();
                console.log({ accessTokenResponse });
                const accessToken = accessTokenResponse?.data?.accessToken || '';
                config.headers.authorization = 'Bearer ' + accessToken;
                setToLocalStorage(authKey, accessToken);
                return instance(config);
            } catch (refreshTokenError) {
                console.log({ firstError: refreshTokenError });
                window.localStorage.clear();
                Promise.reject(refreshTokenError);
            }
        }

        // send error
        return Promise.reject(error);
    },
);

export { instance };
