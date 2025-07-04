import CustomLoading from '@/components/Loader/CustomLoading';
import ImageUploader from '@/components/Uploader/ImageUploader';
import { useSingleUserQuery } from '@/redux/api/userApi';
import { getFullName } from '@/utils/getFullName';
import moment from 'moment';
import React from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { HiOutlineAcademicCap, HiOutlineCalendar, HiOutlinePhone } from 'react-icons/hi2';
import ProfileTabs from './ProfileTabs';

interface IUserViewProps {
    userId: string;
}

export default function UserProfile({ userId }: IUserViewProps) {
    const { data, isLoading } = useSingleUserQuery(userId);
    console.log({ data });
    const userInfo = data?.student;
    console.log({ userInfo });
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

    if (isLoading) {
        return <CustomLoading />;
    }
    return (
        <div className="">
            {/* TOP */}
            <div className="">
                <h1 className={`text-center text-2xl font-semibold drop-shadow-2xl my-3`}>
                    User Profile
                </h1>
            </div>
            <section
                className={`rounded-xl shadow-sm p-2 border border-[#d9d9d9] flex flex-col gap-4`}
            >
                {/* CONTENT */}
                <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-4 w-full max-w-full">
                    {/* Left Profile Card */}
                    <div className="flex flex-col md:flex-row  items-center bg-sky-100 p-4 rounded-xl w-full md:w-full lg:w-1/3 gap-5">
                        {/* IMAGE */}
                        <ImageUploader
                            name={`${userInfo?.first_name} ${userInfo?.last_name}`}
                            type="circular"
                            size="24"
                            imageUrl={userInfo?.profileImage}
                            handleGetImage={handleUploadLogo}
                            isLoading={false}
                        />

                        {/* USER INFO */}
                        <div className="flex flex-col gap-6 text-center md:text-left">
                            {/* Name */}
                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                <h2 className="text-xl font-semibold drop-shadow">
                                    {getFullName(userInfo?.name)}
                                </h2>
                            </div>

                            {/* User Info Grid */}
                            <div className="grid grid-cols-2 2xl:grid md:flex flex-wrap gap-y-3 gap-x-5 text-sm text-gray-700 justify-center md:justify-start font-medium   ">
                                <div className="flex items-center gap-2 drop-shadow-sm">
                                    <HiOutlineAcademicCap className="text-lg text-primary" />
                                    <span>{userInfo?.bloodGroup}</span>
                                </div>

                                <div className="flex items-center gap-2 drop-shadow-sm">
                                    <HiOutlineCalendar className="text-lg text-primary" />
                                    <span>
                                        {moment(userInfo?.dateOfBirth, 'DD-MM-YYYY').format(
                                            'MMMM D, YYYY',
                                        )}
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
                <ProfileTabs />
            </section>
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
