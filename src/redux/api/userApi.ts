import { baseApi } from './baseApi';

const USER_URL = `/v1/users`;

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // login
        users: builder.query({
            query: (payloadData) => ({
                url: `${USER_URL}/login`,
                method: 'POST',
                data: payloadData,
            }),
            // invalidatesTags: [tagTypes.user],
        }),
        // logout
        singleUser: builder.query({
            query: () => ({
                url: `${USER_URL}/logout`,
                method: 'POST',
            }),
            // invalidatesTags: [tagTypes.user],
        }),
    }),
});

export const { useUsersQuery, useSingleUserQuery } = userApi;
