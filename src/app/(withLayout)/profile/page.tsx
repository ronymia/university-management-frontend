'use client';
import UserProfile from '@/components/ui/Common/User/UserProfile';
import { useAppSelector } from '@/redux/hooks';

export default function ProfilePage() {
    const { user } = useAppSelector((state) => state.auth);
    return <UserProfile userId={user?.id} />;
}
