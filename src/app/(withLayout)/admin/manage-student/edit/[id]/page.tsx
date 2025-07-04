import React, { use } from 'react';
import StudentForm from '../../../../../../components/ui/Common/Student/StudentForm';

type IUpdateStudentPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default function UpdateStudentPage({ params }: IUpdateStudentPageProps) {
    const { id } = use(params);
    return <StudentForm id={id} />;
}
