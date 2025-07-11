import { IMeta, ISemesterRegistration } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const BASE_SEMESTER_REGISTRATION = "/semester-registrations";
export const semesterRegistrationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    semesterRegistrations: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: BASE_SEMESTER_REGISTRATION,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ISemesterRegistration[], meta: IMeta) => {
        return {
          semesterRegistrations: response,
          meta,
        };
      },
      providesTags: [tagTypes.semesterRegistration],
    }),
    semesterRegistration: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${BASE_SEMESTER_REGISTRATION}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.semesterRegistration],
    }),
    addSemesterRegistrations: build.mutation({
      query: (data) => ({
        url: BASE_SEMESTER_REGISTRATION,
        method: "POST",
        data,
      }),
      invalidatesTags: (result) =>
        result ? [tagTypes.semesterRegistration] : [],
    }),
    updateSemesterRegistrations: build.mutation({
      query: (data) => ({
        url: `${BASE_SEMESTER_REGISTRATION}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: (result) =>
        result ? [tagTypes.semesterRegistration] : [],
    }),
    deleteSemesterRegistrations: build.mutation({
      query: (id) => ({
        url: `${BASE_SEMESTER_REGISTRATION}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) =>
        result ? [tagTypes.semesterRegistration] : [],
    }),
    myRegistration: build.query({
      query: () => ({
        url: `${BASE_SEMESTER_REGISTRATION}/get-my-registration`,
        method: "GET",
      }),
      providesTags: [tagTypes.courseRegistration],
    }),
    startRegistration: build.mutation({
      query: () => ({
        url: `${BASE_SEMESTER_REGISTRATION}/start-registration`,
        method: "POST",
      }),
    }),
    mySemesterRegistrationCourses: build.query({
      query: () => ({
        url: `${BASE_SEMESTER_REGISTRATION}/get-my-semester-courses
				`,
        method: "GET",
      }),
      providesTags: [tagTypes.courseRegistration],
    }),
    enrollIntoCourse: build.mutation({
      query: (data) => ({
        url: `${BASE_SEMESTER_REGISTRATION}/enrolled-into-course`,
        method: "POST",
        data,
      }),
      invalidatesTags: (result) =>
        result ? [tagTypes.courseRegistration] : [],
    }),
    withdrawFromCourse: build.mutation({
      query: (data) => ({
        url: `${BASE_SEMESTER_REGISTRATION}/withdraw-from-course`,
        method: "POST",
        data,
      }),
      invalidatesTags: (result) =>
        result ? [tagTypes.courseRegistration] : [],
    }),
    confirmMyRegistration: build.mutation({
      query: () => ({
        url: `${BASE_SEMESTER_REGISTRATION}/confirm-my-registration`,
        method: "POST",
      }),
      invalidatesTags: (result) =>
        result ? [tagTypes.courseRegistration] : [],
    }),
    startNewSemester: build.mutation({
      query: (id) => ({
        url: `${BASE_SEMESTER_REGISTRATION}/${id}/start-new-semester`,
        method: "POST",
      }),
      invalidatesTags: (result) =>
        result ? [tagTypes.courseRegistration] : [],
    }),
  }),
});

export const {
  useSemesterRegistrationsQuery,
  useSemesterRegistrationQuery,
  useAddSemesterRegistrationsMutation,
  useDeleteSemesterRegistrationsMutation,
  useUpdateSemesterRegistrationsMutation,

  useMyRegistrationQuery,
  useStartRegistrationMutation,
  useMySemesterRegistrationCoursesQuery,
  useEnrollIntoCourseMutation,
  useConfirmMyRegistrationMutation,
  useWithdrawFromCourseMutation,
  useStartNewSemesterMutation,
} = semesterRegistrationApi;

export default semesterRegistrationApi;
