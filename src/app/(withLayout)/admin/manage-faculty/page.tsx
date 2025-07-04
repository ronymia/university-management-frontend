import FacultyPage from '@/components/ui/Common/Faculty/FacultyPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'UMS | Manage Faculty',
    description: 'University Management System',
};

export default function AdminFacultyPage() {
    return <FacultyPage />;
}
