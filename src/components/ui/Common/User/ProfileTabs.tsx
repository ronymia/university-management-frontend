'use client';

import { AiOutlineProject } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { TbCalendarUser } from 'react-icons/tb';
import { GrSchedulePlay } from 'react-icons/gr';
import { HiOutlineAcademicCap } from 'react-icons/hi2';
import { useRouter, useSearchParams } from 'next/navigation';
import useUserProfile from '@/hooks/useUserProfile';
import { userTab } from '@/types/user.view';
import { PROFILE_TABS } from '@/enums/user.view';
import { profileTabs } from '@/constants/userView';
import { getUserInfo } from '@/services/auth.service';
import { USER_ROLE } from '@/enums/global';
import HorizontalScroll from '@/components/HorizontalScroll';

export default function ProfileTabs() {
    const { role } = (getUserInfo() as any) || {};
    // PROFILE CONTEXT
    const { setActiveTab, profileRole } = useUserProfile();
    // console.log({ profileRole });
    const router = useRouter();
    // SEARCH PARAMS
    const searchParams = useSearchParams();

    // GET CURRENT TAB
    const currentTabParams = searchParams.get('tabs');

    // CHECK CURRENT TAB PATH
    const currentTab = profileTabs.includes(currentTabParams as userTab)
        ? currentTabParams
        : PROFILE_TABS.PROFILE;

    // TABS
    const tabs = [
        {
            label: 'Profile',
            value: PROFILE_TABS.PROFILE,
            show: true,
            Icon: CgProfile,
        },

        {
            label: 'Class Schedule',
            value: PROFILE_TABS.CLASS_SCHEDULE,
            show: false,
            Icon: GrSchedulePlay,
        },
        {
            label: 'Guardian Information',
            value: PROFILE_TABS.GUARDIAN_INFORMATION,
            show: role === USER_ROLE.STUDENT || profileRole === USER_ROLE.STUDENT,
            Icon: HiOutlineDocumentText,
        },
        {
            label: 'Course Management',
            value: PROFILE_TABS.COURSE_MANAGEMENT,
            show:
                profileRole !== USER_ROLE.ADMIN &&
                (role === USER_ROLE.FACULTY || role === USER_ROLE.ADMIN),
            Icon: AiOutlineProject,
        },
        {
            label: 'Academic Report',
            value: PROFILE_TABS.ACADEMIC_REPORT,
            show: role === USER_ROLE.STUDENT || profileRole === USER_ROLE.STUDENT,
            Icon: HiOutlineAcademicCap,
        },
        {
            label: 'Academic Result',
            value: PROFILE_TABS.ACADEMIC_RESULT,
            show: role === USER_ROLE.STUDENT || profileRole === USER_ROLE.STUDENT,
            Icon: HiOutlineAcademicCap,
        },
        {
            label: 'Payment Details',
            value: PROFILE_TABS.PAYMENT_DETAILS,
            show: role === USER_ROLE.STUDENT || profileRole === USER_ROLE.STUDENT,
            Icon: TbCalendarUser,
        },
        {
            label: 'Change Password',
            value: PROFILE_TABS.CHANGE_PASSWORD,
            show: true,
            Icon: GrSchedulePlay,
        },
    ];

    return (
        <HorizontalScroll>
            {tabs
                ?.filter((tab) => tab?.show)
                ?.map((singleTab) => (
                    <button
                        key={singleTab.value}
                        className={`${
                            currentTab === singleTab?.value
                                ? 'bg-gradient-to-tl to-primary shadow-md from-primary/70 text-base-300'
                                : 'hover:bg-primary/10'
                        } font-semibold rounded-xl border border-[#eee] text-sm px-3 cursor-pointer text-center h-12 gap-2 flex items-center justify-center shrink-0`}
                        onClick={() => {
                            const params = new URLSearchParams(searchParams.toString());
                            params.set('tabs', singleTab?.value);
                            router.push(`?${params.toString()}`);
                            setActiveTab(singleTab.value as userTab);
                        }}
                    >
                        <singleTab.Icon className="text-xl drop-shadow" />{' '}
                        <span className={`drop-shadow`}>{singleTab?.label}</span>
                    </button>
                ))}
        </HorizontalScroll>
    );
}
