'use client';

import CustomButton from '@/components/Button/CustomButton';
import ActionBar from '@/components/ui/ActionBar';
import CustomTable, { IColumn } from '@/components/Table/CustomTable';
import { useDebounced } from '@/hooks/useDebounced';
import { useFacultyCourseStudentsQuery } from '@/redux/api/facultyApi';
import Link from 'next/link';
import { use, useState } from 'react';

interface IFacultyCoursesStudentsPageProps {
    searchParams: Promise<{
        courseId: string;
        offeredCourseSectionId: string;
    }>;
}

export default function FacultyCoursesStudentsPage({
    searchParams,
}: IFacultyCoursesStudentsPageProps) {
    //   console.log(searchParams);
    const { courseId, offeredCourseSectionId } = use(searchParams);
    const [queries, setQueries] = useState({
        page: 1,
        limit: 10,
        sortBy: '',
        sortOrder: '',
        searchTerm: '',
        courseId: courseId ? courseId : '',
        offeredCourseSectionId: offeredCourseSectionId ? offeredCourseSectionId : '',
    });

    const debouncedSearchTerm = useDebounced({
        searchQuery: queries.searchTerm,
        delay: 600,
    });

    if (!!debouncedSearchTerm) {
        setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
    }
    const { data, isLoading } = useFacultyCourseStudentsQuery({ ...queries });
    // console.log({ data });

    const myCourseStudents = data?.myCourseStudents;
    const meta = data?.meta;

    // TABLE COLUMNS DEFINE
    const columns: IColumn[] = [
        // NAME
        {
            header: 'Student ID',
            accessorKey: 'studentId',
            show: true,
            minWidth: 20,
        },
        // NAME
        {
            header: 'Student Name',
            accessorKey: 'customStudentName',
            show: true,
            minWidth: 20,
        },
        // NAME
        {
            header: 'Email',
            accessorKey: 'email',
            show: true,
            minWidth: 20,
        },
        // NAME
        {
            header: 'Contact No.',
            accessorKey: 'contactNo',
            show: true,
            minWidth: 20,
        },
        {
            header: 'View Marks.',
            accessorKey: 'viewMarks',
            show: true,
            minWidth: 20,
        },
        // NAME
        {
            header: 'Created At',
            accessorKey: 'createdAt',
            show: false,
            minWidth: 20,
        },
    ];

    return (
        <>
            {/* ACTION BAR */}
            <ActionBar title={`My Course Students`} />

            {/* TABLE */}
            <CustomTable
                isLoading={isLoading}
                actions={[]}
                columns={columns}
                paginationConfig={{
                    page: meta?.page || 0,
                    limit: meta?.limit || 0,
                    skip: meta?.skip || 0,
                    total: meta?.total || 0,
                    paginationTotal: meta?.paginationTotal || 0,
                    totalPages: meta?.totalPages || 0,
                    showPagination: meta?.total ? meta?.total > meta?.limit : false,
                    paginationHandler: (page: number) => {
                        setQueries((prev) => ({ ...prev, page: page }));
                    },
                    changeLimitHandler: (limit: number) => {
                        setQueries((prev) => ({ ...prev, limit: limit }));
                    },
                }}
                // searchConfig={{
                //   searchTerm: queries.searchTerm,
                //   onSearch: (searchTerm) => setQueries({ ...queries, searchTerm }),
                // }}
                rows={
                    myCourseStudents?.map((row) => ({
                        ...row,
                        customStudentName: `${row?.firstName} ${row?.middleName} ${row?.lastName}`,
                        viewMarks: (
                            <>
                                <Link
                                    href={`/faculty/student-result?studentId=${row?.studentId}&courseId=${courseId}&offeredCourseSectionId=${offeredCourseSectionId}`}
                                >
                                    <CustomButton
                                        className="btn btn-primary"
                                        // onClick={() => handleViewMarks(row)}
                                    >
                                        View Marks
                                    </CustomButton>
                                </Link>
                            </>
                        ),
                    })) || []
                }
            />
        </>
    );
}
