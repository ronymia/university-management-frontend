import { tagTypes } from '../tag-types';
import { baseApi } from './baseApi';

const AUTH_URL = `/auth`;

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // login
        userLogin: builder.mutation({
            query: (payloadData) => ({
                url: `${AUTH_URL}/login`,
                method: 'POST',
                data: payloadData,
            }),
            invalidatesTags: [tagTypes.user],
        }),
        // logout
        userLogout: builder.mutation({
            query: () => ({
                url: `${AUTH_URL}/logout`,
                method: 'POST',
            }),
            invalidatesTags: [tagTypes.user],
        }),
        // change password
        changePassword: builder.mutation({
            query: (payload) => ({
                url: `${AUTH_URL}/change-password`,
                method: 'POST',
                data: payload,
            }),
        }),
    }),
});

export const { useUserLoginMutation, useUserLogoutMutation, useChangePasswordMutation } = authApi;
