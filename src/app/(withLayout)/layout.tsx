'use client';

import CustomLoading from '@/components/Loader/CustomLoading';
import Contents from '@/components/ui/Contents';
import Navbar from '@/components/ui/Navbar';
import Sidebar from '@/components/ui/Sidebar';
import { isLoggedIn } from '@/services/auth.service';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode | React.ReactElement;
}) {
    // ROUTE
    const router = useRouter();
    // const userLoggedIn = isLoggedIn();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const pathName = usePathname();

    //
    useEffect(() => {
        const loggedIn = isLoggedIn();
        if (!loggedIn) {
            router.push('/auth/login');
        } else {
            setIsLoading(false);
        }
    }, [pathName, router]);

    if (isLoading) {
        return <CustomLoading height={'h-screen'} />;
    }
    return (
        <div className={`min-h-screen flex gap-3 bg-[#f9fbfc] p-3`}>
            {/* Sticky Sidebar */}
            <div className="fixed md:sticky top-3 h-[calc(100vh-1.5rem)] overflow-y-auto z-50">
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <div
                className={`flex-1 flex flex-col gap-3 ${pathName.includes('view') || pathName.includes('profile') ? 'overflow-auto' : ''}
`}
            >
                <Navbar />
                <Contents>{children}</Contents>
            </div>
        </div>
    );
}
