'use client';

import CustomLoading from '@/components/Loader/CustomLoading';
import ClassSchedule from '@/components/ui/ClassSchedule';
import { useOfferedCourseSchedulesQuery } from '@/redux/api/offeredCourseSchedulesApi';

export default function CourseClassSchedulePage() {
    const { data, isLoading } = useOfferedCourseSchedulesQuery({});

    console.log({ courseClassSchedules: data?.offeredCourseSchedules });
    const courseClassSchedules = data?.offeredCourseSchedules || [];

    if (isLoading) {
        return <CustomLoading height={'h-screen'} />;
    }
    return courseClassSchedules.length > 0 ? <ClassSchedule data={courseClassSchedules} /> : null;
}
