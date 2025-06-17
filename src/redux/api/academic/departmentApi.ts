import { tagTypes } from "@/redux/tag-types";
import { IAcademicCoreDepartment, IMeta } from "@/types";
import { baseApi } from "../baseApi";

const ACADEMIC_DEPARTMENT_URL = "/academic-departments";

export const academicDepartmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    academicDepartments: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ACADEMIC_DEPARTMENT_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IAcademicCoreDepartment[], meta: IMeta) => {
        console.log({ meta });
        return {
          academicDepartments: response,
          meta,
        };
      },
      providesTags: [tagTypes.academicDepartment],
    }),
    // get single academic department
    academicDepartmentById: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ACADEMIC_DEPARTMENT_URL}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: IAcademicCoreDepartment) => response,
      providesTags: [tagTypes.academicDepartment],
    }),
    // create a new academic department
    addAcademicDepartment: build.mutation({
      query: (data) => ({
        url: ACADEMIC_DEPARTMENT_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: (result) =>
        result ? [tagTypes.academicDepartment] : [],
    }),
    // update ac department
    updateAcademicDepartment: build.mutation({
      query: (data) => ({
        url: `${ACADEMIC_DEPARTMENT_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.academicDepartment],
    }),

    // delete ac department
    deleteAcademicDepartment: build.mutation({
      query: (id) => ({
        url: `${ACADEMIC_DEPARTMENT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.academicDepartment],
    }),
  }),
});

export const {
  useAddAcademicDepartmentMutation,
  useAcademicDepartmentsQuery,
  useAcademicDepartmentByIdQuery,
  useUpdateAcademicDepartmentMutation,
  useDeleteAcademicDepartmentMutation,
} = academicDepartmentApi;
