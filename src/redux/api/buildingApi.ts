import { IBuilding, IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const BUILDING_URL = "/buildings";

export const buildingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all building
    buildings: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: BUILDING_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IBuilding[], meta: IMeta) => {
        return {
          buildings: response,
          meta,
        };
      },
      providesTags: [tagTypes.building],
    }),
    // get single building
    building: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${BUILDING_URL}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: IBuilding) => response,
      providesTags: [tagTypes.building],
    }),
    // create a new building
    addBuilding: build.mutation({
      query: (data) => ({
        url: BUILDING_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: (result) => (result ? [tagTypes.building] : []),
    }),
    // update existing building
    updateBuilding: build.mutation({
      query: (data) => ({
        url: `${BUILDING_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: (result) => (result ? [tagTypes.building] : []),
    }),
    // delete existing building
    deleteBuilding: build.mutation({
      query: (id) => ({
        url: `${BUILDING_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => (result ? [tagTypes.building] : []),
    }),
  }),
});

export const {
  useAddBuildingMutation,
  useBuildingsQuery,
  useBuildingQuery,
  useUpdateBuildingMutation,
  useDeleteBuildingMutation,
} = buildingApi;
