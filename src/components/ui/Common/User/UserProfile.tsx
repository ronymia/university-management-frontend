import CustomLoading from '@/components/Loader/CustomLoading';
import { useSingleUserQuery } from '@/redux/api/userApi';
import ProfileHero from './ProfileHero';
import ProfileTabs from './ProfileTabs';
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import Profile from './Tabs/Profile/Profile';
import { userTab } from '@/types/user.view';
import { IStudent } from '@/types';
import { PROFILE_TABS } from '@/enums/user.view';

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
            </div>
        </UserProfileContext.Provider>
    );
}
