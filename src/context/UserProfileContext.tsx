import { USER_ROLE } from '@/enums/global';
import { IAdmin, IFaculty, IStudent } from '@/types';
import { userTab } from '@/types/user.view';
import React, { createContext, Dispatch, ReactNode, SetStateAction } from 'react';

interface IProfileContext {
    adminInfo?: IAdmin;
    facultyInfo?: IFaculty;
    studentInfo?: IStudent;
    activeTab: userTab;
    setActiveTab: Dispatch<SetStateAction<userTab>>;
    profileRole: USER_ROLE.SUPER_ADMIN | USER_ROLE.ADMIN | USER_ROLE.FACULTY | USER_ROLE.STUDENT;
    profileId: string;
}

export const UserProfileContext = createContext<IProfileContext | null>(null);

export default function UserProfileProvider({
    children,
    value,
}: {
    children: ReactNode;
    value: IProfileContext;
}) {
    if (!value) {
        throw new Error('UserProfileProvider value cannot be null or undefined');
    }

    return <UserProfileContext.Provider value={value}>{children}</UserProfileContext.Provider>;
}
