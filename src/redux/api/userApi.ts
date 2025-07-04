import { tagTypes } from '../tag-types';
import { baseApi } from './baseApi';

const USER_URL = `/users`;

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // GET ALL USERS
        users: builder.query({
            query: () => ({
                url: `${USER_URL}`,
                method: 'GET',
            }),
            providesTags: (result) => (result ? [tagTypes.user] : []),
        }),
        // GET SINGLE USER
        singleUser: builder.query({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: 'GET',
            }),
            // invalidatesTags: [tagTypes.user],
        }),
        // DELETE USER
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result) => (result ? [tagTypes.user] : []),
        }),
    }),
});

export const { useUsersQuery, useSingleUserQuery, useDeleteUserMutation } = userApi;
