'use client';

import UserProfile from '@/components/ui/Common/User/UserProfile';
import { use } from 'react';

type IViewStudentPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default function SuperAdminStudentView({ params }: IViewStudentPageProps) {
    const { id } = use(params);
    return <UserProfile userId={id} />;
}
