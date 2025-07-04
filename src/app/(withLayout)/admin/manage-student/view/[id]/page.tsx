'use client';

import UserProfile from '@/components/ui/Common/User/UserProfile';
import React, { use } from 'react';

type IViewStudentPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default function ViewAdminStudent({ params }: IViewStudentPageProps) {
    const { id } = use(params);
    return <UserProfile userId={id} />;
}
