'use client';

import CustomTable, { IAction, IColumn } from '@/components/Table/CustomTable';
import ActionBar from '@/components/ui/ActionBar';
import { useDebounced } from '@/hooks/useDebounced';
import useUserProfile from '@/hooks/useUserProfile';
import { useFacultyCoursesQuery } from '@/redux/api/facultyApi';
import { IFacultyCourse } from '@/types';
import { useState } from 'react';
import { FaUsersViewfinder } from 'react-icons/fa6';

export default function CourseManagement() {
    const { userInfo } = useUserProfile();
    console.log({ userInfo });

    // QUERIES
    const [queries, setQueries] = useState({
        page: 1,
        limit: 10,
        sortBy: '',
        sortOrder: '',
        searchTerm: '',
    });
    // DEBOUNCE FOR SEARCH
    const debouncedSearchTerm = useDebounced({
        searchQuery: queries.searchTerm,
        delay: 600,
    });

    if (!!debouncedSearchTerm) {
        setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
    }
    const { data, isLoading } = useFacultyCoursesQuery({ ...queries });
    const myCourses = data?.myCourses;
    const meta = data?.meta;

    const handleEdit = (updateData: IFacultyCourse) => {
        const courseId = updateData?.course?.id;
        const offeredCourseSectionId =
            updateData?.sections?.[0]?.classSchedules?.[0]?.offeredCourseSectionId;
        // console.log({ offeredCourseSectionId });
        return `/faculty/courses/student?courseId=${courseId}&offeredCourseSectionId=${offeredCourseSectionId}`;
    };

    // ALL ACTION BUTTONS
    const [actions] = useState<IAction[]>([
        {
            name: 'View all students',
            type: 'link',
            href: (row: IFacultyCourse) => handleEdit(row),
            handler: () => {},
            Icon: FaUsersViewfinder,
            permissions: [],
            disableOn: [],
        },
    ]);

    // TABLE COLUMNS DEFINE
    const columns: IColumn[] = [
        // NAME
        {
            header: 'Course name',
            accessorKey: 'customCourse',
            show: true,
            minWidth: 20,
        },
        // NAME
        {
            header: 'Code',
            accessorKey: 'courseCode',
            show: true,
            minWidth: 20,
        },
        // NAME
        {
            header: 'Credits',
            accessorKey: 'courseCredits',
            show: true,
            minWidth: 20,
        },
        // NAME
        {
            header: 'Sections',
            accessorKey: 'customSection',
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
        <section className={`rounded-md p-3 border border-[#eee] shadow-sm`}>
            <>
                {/* ACTION BAR */}
                <ActionBar
                    title={`My Courses`}
                    addButtonLabel={`Add Course`}
                    // createHandler={handleAddNewCourse}
                />

                {/* TABLE */}
                <CustomTable
                    isLoading={isLoading}
                    actions={actions}
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
                        myCourses?.map((row) => ({
                            ...row,
                            customCourse: `${row?.course?.title}`,
                            courseCode: `${row?.course?.code}`,
                            courseCredits: `${row?.course?.credits}`,
                            customSection: (
                                <>
                                    {row?.sections
                                        ?.map((section) => section.section)
                                        .map((el, index) => {
                                            return (
                                                <div key={index} style={{ margin: '20px 0px' }}>
                                                    <span>
                                                        Sec - {el?.title} (
                                                        {el?.currentEnrolledStudent}/
                                                        {el?.maxCapacity})
                                                    </span>
                                                </div>
                                            );
                                        })}
                                </>
                            ),
                        })) || []
                    }
                />
            </>
        </section>
    );
}
