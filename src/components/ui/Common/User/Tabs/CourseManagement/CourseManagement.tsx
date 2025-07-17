'use client';

import useUserProfile from '@/hooks/useUserProfile';
import FacultyCourses from './FacultyCourses';
import { USER_ROLE } from '@/enums/global';

export default function CourseManagement() {
    const { profileRole } = useUserProfile();

    // QUERIES
    return profileRole === USER_ROLE.FACULTY && <FacultyCourses />;
}
