import { authKey } from '@/constants/storageKey';
import { instance as axiosInstance } from '@/helpers/axios/axiosInstance';
import { getBaseUrl } from '@/helpers/config/envConfig';
import { decodedToken } from '@/utils/jwt';
import { getFromLocalStorage, setToLocalStorage } from '@/utils/local-storage';

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
    return setToLocalStorage(authKey, accessToken as string);
};

export const getUserInfo = () => {
    if (typeof window === 'undefined') {
        // Prevent server-side usage
        return null;
    }

    const authToken = getFromLocalStorage(authKey);
    if (authToken) {
        const decodedData = decodedToken(authToken);
        return decodedData;
    }

    return null;
};

export const isLoggedIn = () => {
    const authToken = getFromLocalStorage(authKey);
    return !!authToken;
};

export const removeUserInfo = (key: string) => {
    return localStorage.removeItem(key);
};

export const getNewAccessToken = async () => {
    return await axiosInstance({
        url: `${getBaseUrl()}/api/v1/auth/refresh-token`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    });
};
