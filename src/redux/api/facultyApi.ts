import {
  ICoreFaculty,
  ICoreStudent,
  IFaculty,
  IFacultyCourse,
  IMeta,
} from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const BASE_FACULTY_API_URL = "/faculties";

export const facultyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all faculty user endpoint
    facultiesFromCore: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${BASE_FACULTY_API_URL}/core-faculties`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IFaculty[], meta: IMeta) => {
        return {
          faculties: response,
          meta,
        };
      },
      providesTags: [tagTypes.faculty],
    }),
    // get all faculty user endpoint
    faculties: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: BASE_FACULTY_API_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IFaculty[], meta: IMeta) => {
        return {
          faculties: response,
          meta,
        };
      },
      providesTags: [tagTypes.faculty],
    }),
    // get single faculty user endpoint
    facultyById: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${BASE_FACULTY_API_URL}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: IFaculty) => {
        return response;
      },
      providesTags: [tagTypes.faculty],
    }),
    // get single faculty user endpoint
    faculty: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${BASE_FACULTY_API_URL}/profile/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.faculty],
    }),
    // create faculty user endpoint
    addFacultyWithFormData: build.mutation({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.faculty],
    }),
    // update faculty user endpoint
    updateFaculty: build.mutation({
      query: (data) => ({
        url: `${BASE_FACULTY_API_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.faculty],
    }),
    // delete faculty user endpoint
    deleteFaculty: build.mutation({
      query: (id) => ({
        url: `${BASE_FACULTY_API_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faculty],
    }),

    facultyCourses: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${BASE_FACULTY_API_URL}/my-courses`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IFacultyCourse[], meta: IMeta) => {
        return {
          myCourses: response,
          meta,
        };
      },
      providesTags: [tagTypes.student],
    }),

    facultyCourseStudents: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${BASE_FACULTY_API_URL}/my-course-students`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ICoreStudent[], meta: IMeta) => {
        return {
          myCourseStudents: response,
          meta,
        };
      },
      providesTags: [tagTypes.student],
    }),
  }),
});

export const {
  useFacultiesFromCoreQuery,
  useAddFacultyWithFormDataMutation, // create faculty user hook
  useFacultiesQuery, // get all faculty users hook
  useFacultyQuery, // get single faculty user hook
  useUpdateFacultyMutation, // update single faculty user hook
  useDeleteFacultyMutation, // delete single faculty user hook
  useFacultyByIdQuery,

  useFacultyCoursesQuery,
  useFacultyCourseStudentsQuery,
} = facultyApi;
