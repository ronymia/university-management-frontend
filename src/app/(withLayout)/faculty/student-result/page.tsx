'use client';

import CustomButton from '@/components/Button/CustomButton';
import ActionBar from '@/components/ui/ActionBar';
import CustomTable, { IColumn } from '@/components/Table/CustomTable';
import { ExamType } from '@/constants/global';
import { useDebounced } from '@/hooks/useDebounced';
import {
    useStudentEnrolledCourseMarksQuery,
    useUpdateFinalMarksMutation,
} from '@/redux/api/studentEnrollCourseMarkApi';
import { IStudentEnrolledCourseMark } from '@/types';
import Link from 'next/link';
import { Fragment, use, useState } from 'react';

interface IStudentResultPageProps {
    searchParams: Promise<{
        studentId: string;
        courseId: string;
        offeredCourseSectionId: string;
    }>;
}

export default function StudentResultPage({ searchParams }: IStudentResultPageProps) {
    //   console.log(searchParams);
    const { studentId, courseId, offeredCourseSectionId } = use(searchParams);
    const [queries, setQueries] = useState({
        page: 1,
        limit: 10,
        sortBy: '',
        sortOrder: '',
        searchTerm: '',
        studentId: studentId ? studentId : '',
        courseId: courseId ? courseId : '',
        offeredCourseSectionId: offeredCourseSectionId ? offeredCourseSectionId : '',
    });
    const [updateFinalMarks] = useUpdateFinalMarksMutation();

    const debouncedSearchTerm = useDebounced({
        searchQuery: queries.searchTerm,
        delay: 600,
    });

    if (!!debouncedSearchTerm) {
        setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
    }
    const { data, isLoading } = useStudentEnrolledCourseMarksQuery({
        ...queries,
    });

    const studentEnrolledCourseMarks = data?.studentEnrolledCourseMarks;
    const meta = data?.meta;
    const handleUpdateFinalMarks = async (values: {
        studentId: string;
        courseId: string;
        academicSemesterId: string;
    }) => {
        // console.log(values);
        const res = await updateFinalMarks(values);
        if (res) {
            // message.success("Final Marks Updated");
        }
    };

    // TABLE COLUMNS DEFINE
    const columns: IColumn[] = [
        // NAME
        {
            header: 'Student id',
            accessorKey: 'customStudent',
            show: true,
            minWidth: 20,
        },
        // NAME
        {
            header: 'Course Name',
            accessorKey: 'courseName',
            show: true,
            minWidth: 20,
        },
        // NAME
        {
            header: 'Exam Type',
            accessorKey: 'examType',
            show: true,
            minWidth: 20,
        },
        // NAME
        {
            header: 'Grade info',
            accessorKey: 'customGradeInfo',
            show: true,
            minWidth: 20,
        },
        // NAME
        {
            header: 'Update Marks',
            accessorKey: 'updateMarks',
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
            <ActionBar title={`My Course Students Result`}>
                <div style={{ marginLeft: 'auto' }}>
                    {data?.studentEnrolledCourseMarks
                        .filter((el: IStudentEnrolledCourseMark) => el.examType === ExamType.FINAL)
                        .map((el, index) => {
                            if (el.marks > 0) {
                                return (
                                    <Fragment key={index}>
                                        <CustomButton
                                            htmlType="button"
                                            onClick={() =>
                                                handleUpdateFinalMarks({
                                                    studentId,
                                                    courseId: el.studentEnrolledCourse.course.id,
                                                    academicSemesterId: el.academicSemesterId,
                                                })
                                            }
                                        >
                                            Update Final Marks
                                        </CustomButton>
                                    </Fragment>
                                );
                            }
                        })}
                </div>
            </ActionBar>

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
                    studentEnrolledCourseMarks?.map((row) => ({
                        ...row,
                        customStudent: (
                            <>
                                <table>
                                    <p title="name">
                                        {row?.student.firstName} {row?.student.middleName}
                                        {row?.student.lastName}
                                    </p>
                                    <p title="student ID">{row?.student.studentId}</p>
                                </table>
                            </>
                        ),
                        courseName: row.studentEnrolledCourse.course.title,
                        customGradeInfo: (
                            <>
                                <table>
                                    <p title="name">{!row?.grade ? '-' : row?.grade}</p>
                                    <p title="student ID">{row?.marks}</p>
                                </table>
                            </>
                        ),
                        updateMarks: (
                            <>
                                <Link
                                    href={`/faculty/update-mark?&examType=${row?.examType}&marks=${row?.marks}&academicSemesterId=${row?.academicSemesterId}&studentId=${studentId}&courseId=${row.studentEnrolledCourse.course.id}&offeredCourseSectionId=${offeredCourseSectionId}`}
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
