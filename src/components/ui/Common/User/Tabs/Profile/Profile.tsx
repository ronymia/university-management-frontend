import { USER_ROLE } from '@/enums/global';
import useUserProfile from '@/hooks/useUserProfile';
import StudentProfile from './StudentProfile';
import FacultyProfile from './FacultyProfile';
import AdminProfile from './AdminProfile';
import SuperAdminProfile from './SuperAdminProfile';

export default function Profile() {
    const { profileRole } = useUserProfile();

    return (
        <>
            {profileRole === USER_ROLE.STUDENT && <StudentProfile />}
            {profileRole === USER_ROLE.FACULTY && <FacultyProfile />}
            {profileRole === USER_ROLE.ADMIN && <AdminProfile />}
            {profileRole === USER_ROLE.SUPER_ADMIN && <SuperAdminProfile />}
        </>
    );
}
