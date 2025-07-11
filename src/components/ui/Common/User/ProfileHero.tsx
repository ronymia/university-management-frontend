import ImageUploader from '@/components/Uploader/ImageUploader';
import useUserProfile from '@/hooks/useUserProfile';
import { getFullName } from '@/utils/getFullName';
import moment from 'moment';
import { HiOutlineMail } from 'react-icons/hi';
import { HiOutlineAcademicCap, HiOutlineCalendar, HiOutlinePhone } from 'react-icons/hi2';

export default function ProfileHero() {
    const { studentInfo, facultyInfo, adminInfo } = useUserProfile();

    const userInfo = {
        name: studentInfo?.name || facultyInfo?.name || adminInfo?.name,
        email: studentInfo?.email || facultyInfo?.email || adminInfo?.email,
        contactNo: studentInfo?.contactNo || facultyInfo?.contactNo || adminInfo?.contactNo,
        emergencyContactNo:
            studentInfo?.emergencyContactNo ||
            facultyInfo?.emergencyContactNo ||
            adminInfo?.emergencyContactNo,
        gender: studentInfo?.gender || facultyInfo?.gender || adminInfo?.gender,
        bloodGroup: studentInfo?.bloodGroup || facultyInfo?.bloodGroup || adminInfo?.bloodGroup,
        dateOfBirth: studentInfo?.dateOfBirth || facultyInfo?.dateOfBirth || adminInfo?.dateOfBirth,
        presentAddress:
            studentInfo?.presentAddress || facultyInfo?.presentAddress || adminInfo?.presentAddress,
        permanentAddress:
            studentInfo?.permanentAddress ||
            facultyInfo?.permanentAddress ||
            adminInfo?.permanentAddress,
        profileImage:
            studentInfo?.profileImage || facultyInfo?.profileImage || adminInfo?.profileImage,
        createdAt: studentInfo?.createdAt || facultyInfo?.createdAt || adminInfo?.createdAt,
        updatedAt: studentInfo?.updatedAt || facultyInfo?.updatedAt || adminInfo?.updatedAt,
    };

    const handleUploadLogo = async () => {
        // Check if the file size exceeds 5MB
        // if (payloadImage.size > 5 * 1024 * 1024) {
        //     Message({
        //         type: 'error',
        //         text: 'File size must not exceed 5MB.',
        //     });
        //     return;
        // }
        // await uploadImage(payloadImage)
        //     .unwrap()
        //     .then((res) => {
        //         Message({
        //             type: 'success',
        //             text: 'Image uploaded successfully',
        //         });
        //         userInfo.image = res?.full_location;
        //     });
    };
    return (
        <div className="flex flex-col md:flex-row w-full">
            {/* Left Profile Card */}
            <div className="flex flex-col md:flex-row items-center bg-sky-100 p-4 rounded-xl gap-5 max-w-lg">
                {/* IMAGE */}
                <ImageUploader
                    fallBackText={getFullName(userInfo?.name as any)}
                    type="circular"
                    imageUrl={userInfo?.profileImage as string}
                    uploadHandler={handleUploadLogo}
                    isLoading={false}
                />

                {/* USER INFO */}
                <div className="flex flex-col gap-6 text-center md:text-left">
                    {/* Name */}
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                        <h2 className="text-xl font-semibold drop-shadow">
                            {getFullName(userInfo?.name as any)}
                        </h2>
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
