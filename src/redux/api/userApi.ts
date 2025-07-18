import { IMeta, IUser } from '@/types';
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
            transformResponse: (response: IUser[], meta: IMeta) => {
                return {
                    users: response,
                    meta,
                };
            },
            providesTags: (result) => (result ? [tagTypes.user] : []),
        }),
        // GET SINGLE USER
        singleUser: builder.query({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: 'GET',
            }),
            transformResponse: (response: IUser) => response,
            providesTags: (result) =>
                result ? [{ type: tagTypes.user }, { type: tagTypes.user, id: result.id }] : [],
        }),
        // UPDATE USER
        updateUser: builder.mutation({
            query: (payload) => ({
                url: `${USER_URL}/${payload.id}`,
                method: 'PATCH',
                data: payload,
            }),
            invalidatesTags: (result) =>
                result ? [{ type: tagTypes.user }, { type: tagTypes.user, id: result.id }] : [],
        }),
        // DELETE USER
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result) => (result ? [tagTypes.user] : []),
        }),
        // UPDATE USER
        uploadProfilePicture: builder.mutation({
            query: (payload) => ({
                url: `${USER_URL}/update-profile-image`,
                method: 'PATCH',
                data: payload,
                contentType: 'multipart/form-data',
            }),
            invalidatesTags: (result) =>
                result ? [{ type: tagTypes.user }, { type: tagTypes.user, id: result.id }] : [],
        }),
    }),
});

export const {
    useUsersQuery,
    useSingleUserQuery,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useUploadProfilePictureMutation,
} = userApi;
