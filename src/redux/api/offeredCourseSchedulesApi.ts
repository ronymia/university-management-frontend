import { IMeta, IClassSchedule } from '@/types';
import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';

const BASE_OFFERED_COURSE_SCHEDULES = '/offered-course-class-schedules';

const offeredCourseSchedulesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        offeredCourseSchedules: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: BASE_OFFERED_COURSE_SCHEDULES,
                    method: 'GET',
                    params: arg,
                };
            },
            transformResponse: (response: IClassSchedule[], meta: IMeta) => {
                const offeredCourseSchedules = response;
                return {
                    offeredCourseSchedules: offeredCourseSchedules,
                    meta,
                };
            },
            providesTags: [tagTypes.offeredCourseSchedule],
        }),
        offeredCourseScheduleById: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `${BASE_OFFERED_COURSE_SCHEDULES}/${id}`,
                method: 'GET',
            }),
            transformResponse: (response: IClassSchedule) => response,
            providesTags: [tagTypes.offeredCourseSchedule],
        }),
        addOfferedCourseSchedule: build.mutation({
            query: (data) => ({
                url: BASE_OFFERED_COURSE_SCHEDULES,
                method: 'POST',
                data,
            }),
            invalidatesTags: (result) => (result ? [tagTypes.offeredCourseSchedule] : []),
        }),
        updateOfferedCourseSchedule: build.mutation({
            query: (data) => ({
                url: `${BASE_OFFERED_COURSE_SCHEDULES}/${data.id}`,
                method: 'PATCH',
                data: data.body,
            }),
            invalidatesTags: (result) => (result ? [tagTypes.offeredCourseSchedule] : []),
        }),
        deleteOfferedCourseSchedule: build.mutation({
            query: (id) => ({
                url: `${BASE_OFFERED_COURSE_SCHEDULES}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result) => (result ? [tagTypes.offeredCourseSchedule] : []),
        }),
    }),
});

export const {
    useOfferedCourseSchedulesQuery,
    useOfferedCourseScheduleByIdQuery,
    useAddOfferedCourseScheduleMutation,
    useDeleteOfferedCourseScheduleMutation,
    useUpdateOfferedCourseScheduleMutation,
} = offeredCourseSchedulesApi;

export default offeredCourseSchedulesApi;
