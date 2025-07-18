'use client';

import CustomPopup from '@/components/Popup/CustomPopup';
import CustomTable, { IAction, IColumn } from '@/components/Table/CustomTable';
import ActionBar from '@/components/ui/ActionBar';
import { useDebounced } from '@/hooks/useDebounced';
import usePopupOptions from '@/hooks/usePopupOptions';
import useUserProfile from '@/hooks/useUserProfile';
import { useFacultyCoursesQuery } from '@/redux/api/facultyApi';
import { useState } from 'react';
import AssignCourseInoFaculty from './AssignCourseInoFaculty';

export default function FacultyCourses() {
    const { popupOptions, setPopupOptions } = usePopupOptions();
    const { facultyInfo } = useUserProfile();

    // QUERIES
    const [queries, setQueries] = useState({
        page: 1,
        limit: 10,
        sortBy: '',
        sortOrder: '',
        searchTerm: '',
        facultyId: facultyInfo?.id,
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

    // ALL ACTION BUTTONS
    const [actions] = useState<IAction[]>([
        // {
        //     name: 'View all students',
        //     type: 'button',
        //     handler: () => {},
        //     Icon: FaUsersViewfinder,
        //     permissions: [],
        //     disableOn: [],
        // },
    ]);

    // TABLE COLUMNS DEFINE
    const columns: IColumn[] = [
        // customCourse
        {
            header: 'Course name',
            accessorKey: 'customCourse',
            show: true,
            minWidth: 25,
        },
        // courseCode
        {
            header: 'Code',
            accessorKey: 'courseCode',
            show: true,
            minWidth: 10,
        },
        // courseCredits
        {
            header: 'Credits',
            accessorKey: 'courseCredits',
            show: true,
            minWidth: 10,
        },
        // customSection
        {
            header: 'Sections',
            accessorKey: 'customSection',
            show: true,
            minWidth: 15,
        },
        // customViewStudents
        // {
        //     header: 'View Students',
        //     accessorKey: 'customViewStudents',
        //     show: true,
        //     minWidth: 15,
        // },
        // customClassSchedule
        // {
        //     header: 'View Class Schedule',
        //     accessorKey: 'customClassSchedule',
        //     show: true,
        //     minWidth: 20,
        // },
        // createdAt
        {
            header: 'Created At',
            accessorKey: 'createdAt',
            show: false,
            minWidth: 20,
        },
    ];

    // const handleAssignCourseIntoFaculty = () => {
    //     setPopupOptions((prev) => ({
    //         ...prev,
    //         open: true,
    //         actionType: 'create',
    //         form: 'assign_course_into_faculty',
    //         title: 'Assign Course into Faculty',
    //     }));
    // };
    return (
        <section className={`rounded-md p-3 border border-[#eee] shadow-sm`}>
            <>
                {/* POPUP */}
                <CustomPopup
                    popupOptions={popupOptions}
                    setPopupOptions={setPopupOptions}
                    // customHeight={customHeight}
                    // customWidth={getCustomWidth()}
                >
                    {/* FORM CONTENT */}

                    {popupOptions.form === 'assign_course_into_faculty' ? (
                        <AssignCourseInoFaculty
                            handleClosePopup={() => {
                                setPopupOptions((prev) => ({
                                    ...prev,
                                    open: false,
                                }));
                            }}
                        />
                    ) : null}
                </CustomPopup>

                {/* ACTION BAR */}
                <ActionBar
                    title={`My Courses`}
                    // addButtonLabel={`Assign Course`}
                    // createHandler={handleAssignCourseIntoFaculty}
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
                            // customViewStudents: (
                            //     <>
                            //         <Link
                            //             href={`/faculty/courses/student?courseId=${row?.course?.id}&offeredCourseSectionId=${row?.sections?.[0]?.classSchedules?.[0]?.offeredCourseSectionId}`}
                            //             className={`bg-[#e2e2e2] py-1 px-2 rounded text-[#333] hover:bg-[#333] hover:text-[#e2e2e2]`}
                            //         >
                            //             View Students
                            //         </Link>
                            //     </>
                            // ),
                            // customClassSchedule: (
                            //     <Link
                            //         href={`/faculty/courses/class-schedule?courseId=${row?.id}`}
                            //         target="_blank"
                            //         className={`bg-[#e2e2e2] py-1 px-2 rounded text-[#333] hover:bg-[#333] hover:text-[#e2e2e2]`}
                            //     >
                            //         View Class Schedule
                            //     </Link>
                            // ),
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
