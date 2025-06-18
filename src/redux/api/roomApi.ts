import { IMeta, IRoom } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const ROOM_URL = "/rooms";

export const roomApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all rooms
    rooms: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ROOM_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IRoom[], meta: IMeta) => {
        return {
          rooms: response,
          meta,
        };
      },
      providesTags: [tagTypes.room],
    }),
    // get single room
    room: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ROOM_URL}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: IRoom) => response,
      providesTags: [tagTypes.room],
    }),
    // create a new room
    addRoom: build.mutation({
      query: (data) => ({
        url: ROOM_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: (result) => (result ? [tagTypes.room] : []),
    }),
    // update room
    updateRoom: build.mutation({
      query: (data) => ({
        url: `${ROOM_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: (result) => (result ? [tagTypes.room] : []),
    }),
    // delete room
    deleteRoom: build.mutation({
      query: (id) => ({
        url: `${ROOM_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => (result ? [tagTypes.room] : []),
    }),
  }),
});

export const {
  useAddRoomMutation,
  useRoomsQuery,
  useRoomQuery,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomApi;
