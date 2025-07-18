import FacultyForm from '@/components/ui/Common/Faculty/FacultyForm';
import type { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'UMS | Create Faculty',
    description: 'University Management System',
};

export default function page() {
    return <FacultyForm id={``} />;
}
