import { USER_ROLE } from '@/enums/global';
import useUserProfile from '@/hooks/useUserProfile';
import React from 'react';
import StudentProfile from './StudentProfile';
import FacultyProfile from './FacultyProfile';
import AdminProfile from './AdminProfile';
import SuperAdminProfile from './SuperAdminProfile';
import { getUserInfo } from '@/services/auth.service';

export default function Profile() {
    const { profileRole } = useUserProfile();
    const { role } = (getUserInfo() as any) || { role: '' };

    return (
        <>
            {profileRole === USER_ROLE.STUDENT && <StudentProfile />}
            {profileRole === USER_ROLE.FACULTY && <FacultyProfile />}
            {profileRole === USER_ROLE.ADMIN && <AdminProfile />}
            {!profileRole && role === USER_ROLE.SUPER_ADMIN && <SuperAdminProfile />}
        </>
    );
}
