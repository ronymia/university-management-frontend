import UserProfile from '@/components/ui/Common/User/UserProfile';
import React, { use } from 'react';

type IViewFacultyPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default function ViewAdminFacultyPage({ params }: IViewFacultyPageProps) {
    const { id } = use(params);
    return <UserProfile userId={id} />;
}
