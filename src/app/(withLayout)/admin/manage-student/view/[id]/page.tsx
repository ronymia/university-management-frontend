'use client';

import UserView from '@/components/ui/Common/User/UserView';
import React, { use } from 'react';

type IViewStudentPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default function ViewAdminStudent({ params }: IViewStudentPageProps) {
    const { id } = use(params);
    return <UserView userId={id} />;
}
