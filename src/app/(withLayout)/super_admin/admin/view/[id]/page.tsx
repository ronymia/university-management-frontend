import UserProfile from '@/components/ui/Common/User/UserProfile';
import React, { use } from 'react';

type IViewAdminPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default function AdminViewPage({ params }: IViewAdminPageProps) {
    const { id } = use(params);
    return <UserProfile userId={id || ''} />;
}
