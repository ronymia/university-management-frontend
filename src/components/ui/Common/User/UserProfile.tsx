import CustomLoading from '@/components/Loader/CustomLoading';
import { useSingleUserQuery } from '@/redux/api/userApi';
import ProfileHero from './ProfileHero';
import ProfileTabs from './ProfileTabs';
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import Profile from './Tabs/Profile/Profile';
import { userTab } from '@/types/user.view';
import { IStudent } from '@/types';
import { PROFILE_TABS } from '@/enums/user.view';
import ClassSchedule from './Tabs/ClassSchedule/ClassSchedule';
import GuardianInformation from './Tabs/GuardianInformation/GuardianInformation';
import CourseManagement from './Tabs/CourseManagement/CourseManagement';
import AcademicReport from './Tabs/AcademicReport/AcademicReport';
import AcademicResult from './Tabs/AcademicResult/AcademicResult';
import PaymentDetails from './Tabs/PaymentDetails/PaymentDetails';

interface IUserViewProps {
    userId: string;
}

interface IProfileContext {
    userInfo: IStudent;
    activeTab: userTab;
    setActiveTab: Dispatch<SetStateAction<userTab>>;
}

export const UserProfileContext = createContext<IProfileContext | null>(null);

export default function UserProfile({ userId }: IUserViewProps) {
    const [activeTab, setActiveTab] = useState<userTab>(PROFILE_TABS.PROFILE);
    const { data, isLoading } = useSingleUserQuery(userId);
    const userInfo = data?.student;

    // CONTEXT VALUES
    const profileContextValues = {
        userInfo,
        activeTab,
        setActiveTab,
    };

    // LOADING STATE
    if (isLoading) {
        return <CustomLoading />;
    }
    return (
        <UserProfileContext.Provider value={profileContextValues}>
            <div className="flex flex-col gap-y-3">
                {/* TOP */}
                <div className="">
                    <h1 className={`text-center text-2xl font-semibold drop-shadow-2xl my-3`}>
                        User Profile
                    </h1>
                </div>
                {/* HEADER */}
                <section
                    className={`rounded-xl shadow-sm p-2 border border-[#eee] flex flex-col gap-4`}
                >
                    <ProfileHero />
                    <ProfileTabs />
                </section>

                {/* TAB CONTENT */}
                {activeTab === PROFILE_TABS.PROFILE && <Profile />}
                {activeTab === PROFILE_TABS.CLASS_SCHEDULE && <ClassSchedule />}
                {activeTab === PROFILE_TABS.GUARDIAN_INFORMATION && <GuardianInformation />}
                {activeTab === PROFILE_TABS.COURSE_MANAGEMENT && <CourseManagement />}
                {activeTab === PROFILE_TABS.ACADEMIC_REPORT && <AcademicReport />}
                {activeTab === PROFILE_TABS.ACADEMIC_RESULT && <AcademicResult />}
                {activeTab === PROFILE_TABS.PAYMENT_DETAILS && <PaymentDetails />}
            </div>
        </UserProfileContext.Provider>
    );
}
