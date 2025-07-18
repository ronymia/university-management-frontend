import CustomToaster from '@/components/Notification/CustomToaster';
import ImageUploader from '@/components/Uploader/ImageUploader';
import { superAdminInfo } from '@/constants/superAdmin';
import { USER_ROLE } from '@/enums/global';
import useUserProfile from '@/hooks/useUserProfile';
import { useUploadProfilePictureMutation } from '@/redux/api/userApi';
import { getFullName } from '@/utils/getFullName';
import { fromSnakeCase } from '@/utils/textFormatter.utils';
import moment from 'moment';
import { HiOutlineMail } from 'react-icons/hi';
import { HiOutlineAcademicCap, HiOutlineCalendar, HiOutlinePhone } from 'react-icons/hi2';

export default function ProfileHero() {
    const { studentInfo, facultyInfo, adminInfo, profileRole } = useUserProfile();

    const userInfo = {
        name:
            studentInfo?.name ||
            facultyInfo?.name ||
            adminInfo?.name ||
            (profileRole === USER_ROLE.SUPER_ADMIN && superAdminInfo.name) ||
            '',
        email:
            studentInfo?.email ||
            facultyInfo?.email ||
            adminInfo?.email ||
            (profileRole === USER_ROLE.SUPER_ADMIN && superAdminInfo.email) ||
            '',
        contactNo:
            studentInfo?.contactNo ||
            facultyInfo?.contactNo ||
            adminInfo?.contactNo ||
            (profileRole === USER_ROLE.SUPER_ADMIN && superAdminInfo.contactNo) ||
            '',
        emergencyContactNo:
            studentInfo?.emergencyContactNo ||
            facultyInfo?.emergencyContactNo ||
            adminInfo?.emergencyContactNo ||
            (profileRole === USER_ROLE.SUPER_ADMIN && superAdminInfo.emergencyContactNo) ||
            '',
        gender:
            studentInfo?.gender ||
            facultyInfo?.gender ||
            adminInfo?.gender ||
            (profileRole === USER_ROLE.SUPER_ADMIN && superAdminInfo.gender) ||
            '',
        bloodGroup:
            studentInfo?.bloodGroup ||
            facultyInfo?.bloodGroup ||
            adminInfo?.bloodGroup ||
            (profileRole === USER_ROLE.SUPER_ADMIN && superAdminInfo.bloodGroup) ||
            '',
        dateOfBirth:
            studentInfo?.dateOfBirth ||
            facultyInfo?.dateOfBirth ||
            adminInfo?.dateOfBirth ||
            (profileRole === USER_ROLE.SUPER_ADMIN && superAdminInfo.dateOfBirth) ||
            '',
        presentAddress:
            studentInfo?.presentAddress ||
            facultyInfo?.presentAddress ||
            adminInfo?.presentAddress ||
            (profileRole === USER_ROLE.SUPER_ADMIN && superAdminInfo.presentAddress) ||
            '',
        permanentAddress:
            studentInfo?.permanentAddress ||
            facultyInfo?.permanentAddress ||
            adminInfo?.permanentAddress ||
            (profileRole === USER_ROLE.SUPER_ADMIN && superAdminInfo.permanentAddress) ||
            '',
        profileImage:
            studentInfo?.profileImage ||
            facultyInfo?.profileImage ||
            adminInfo?.profileImage ||
            (profileRole === USER_ROLE.SUPER_ADMIN && superAdminInfo.profileImage) ||
            '',
        createdAt: studentInfo?.createdAt || facultyInfo?.createdAt || adminInfo?.createdAt,
        updatedAt: studentInfo?.updatedAt || facultyInfo?.updatedAt || adminInfo?.updatedAt,
    };

    const [uploadProfilePicture, uploadResult] = useUploadProfilePictureMutation();

    const handleUploadLogo = async (payloadImage: any) => {
        // Check if the file size exceeds 5MB
        if (payloadImage.size > 5 * 1024 * 1024) {
            CustomToaster({
                type: 'error',
                text: 'File size must not exceed 5MB.',
            });
            return;
        }

        const userId = adminInfo?.id || studentInfo?.id || facultyInfo?.id;
        if (!userId) {
            CustomToaster({
                type: 'error',
                text: 'User ID not found.',
            });
            return;
        }

        const formData = new FormData();
        formData.append('file', payloadImage);
        formData.append('data', JSON.stringify({ id: userId }));
        await uploadProfilePicture(formData)
            .unwrap()
            .then((res) => {
                console.log({ res });
                CustomToaster({
                    type: 'success',
                    text: 'Image uploaded successfully',
                });
                // userInfo.image = res?.full_location;
            });
    };
    return (
        <div className="flex flex-col md:flex-row w-full">
            {/* Left Profile Card */}
            <div className="flex flex-col md:flex-row items-center bg-sky-100 p-4 rounded-xl gap-5 max-w-lg">
                {/* IMAGE */}
                <ImageUploader
                    fallBackText={getFullName(userInfo?.name as any)}
                    type="circular"
                    imageUrl={userInfo?.profileImage}
                    uploadHandler={handleUploadLogo}
                    isLoading={uploadResult.isLoading}
                />

                {/* USER INFO */}
                <div className="flex flex-col gap-6 text-center md:text-left">
                    {/* Name */}
                    <div className="flex flex-col items-center md:items-start gap-2 justify-center md:justify-start w-full">
                        <h2 className="text-xl font-semibold drop-shadow">
                            {getFullName(userInfo?.name as any) || 'N/A'}
                        </h2>
                        <small
                            className={`font-semibold bg-green-600 text-base-300 rounded-md px-2 py-1 text-xs`}
                        >
                            {fromSnakeCase(profileRole || '')}
                        </small>
                    </div>

                    {/* User Info Grid */}
                    <div className="flex flex-wrap gap-y-3 gap-x-5 text-sm text-gray-700 justify-center md:justify-start font-medium   ">
                        <div className="flex items-center gap-2 drop-shadow-sm">
                            <HiOutlineAcademicCap className="text-lg text-primary" />
                            <span>{userInfo?.bloodGroup}</span>
                        </div>

                        <div className="flex items-center gap-2 drop-shadow-sm">
                            <HiOutlineCalendar className="text-lg text-primary" />
                            <span>
                                {moment(userInfo?.dateOfBirth, 'DD-MM-YYYY').format('MMMM D, YYYY')}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 break-words drop-shadow-sm">
                            <HiOutlineMail className="text-lg text-primary" />
                            <span>{userInfo?.email}</span>
                        </div>

                        <div className="flex items-center gap-2 drop-shadow-sm">
                            <HiOutlinePhone className="text-lg text-primary" />
                            <span>{userInfo?.contactNo}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stat Cards */}
            {/* <div className="grid grid-cols-2 gap-4 w-full md:w-1/2 lg:w-1/3">
     ATTENDANCE
     <StatCard
         label="Attendance"
         value={`${userInfo?.attendance_percentage || 0}%`}
         color="text-sky-500"
     />
     ABSENT
     <StatCard
         label="Absent"
         value={`${userInfo?.absent_percentage || 0}%`}
         color="text-purple-500"
     />
     COURSES
     <StatCard
         label="Total Courses"
         value={userInfo?.total_courses || 0}
         color="text-pink-500"
     />
     SUBJECTS
     <StatCard
         label="Total Subjects"
         value={userInfo?.total_subjects || 0}
         color="text-yellow-500"
     />
 </div> */}
        </div>
    );
}

// interface StatCardProps {
//     label: string;
//     value: string | number;
//     color: string;
// }

// function StatCard({ label, value, color }: StatCardProps) {
//     return (
//         <div className="bg-base-300 border border-[#d9d9d9] rounded-xl p-3 shadow-sm flex flex-col items-center">
//             <span className={`text-xl font-bold ${color} drop-shadow-sm`}>{value}</span>
//             <span className="text-sm text-gray-600 font-medium drop-shadow-sm">{label}</span>
//         </div>
//     );
// }
