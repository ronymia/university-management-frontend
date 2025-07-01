import { tagTypes } from '../tag-types';
import { baseApi } from './baseApi';

const AUTH_URL = `/auth`;

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        userLogin: builder.mutation({
            query: (payloadData) => ({
                url: `${AUTH_URL}/login`,
                method: 'POST',
                data: payloadData,
            }),
            invalidatesTags: [tagTypes.user],
        }),
        userLogout: builder.mutation({
            query: () => ({
                url: `${AUTH_URL}/logout`,
                method: 'POST',
            }),
            invalidatesTags: [tagTypes.user],
        }),
    }),
});

export const { useUserLoginMutation, useUserLogoutMutation } = authApi;
