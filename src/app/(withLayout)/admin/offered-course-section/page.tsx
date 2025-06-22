'use client';

import CustomAddButton from '@/components/Button/CustomAddButton';
import FormModal from '@/components/Forms/FormModal';
import { usePopup } from '@/components/Popup/CustomPopup';
import ActionBar from '@/components/ui/ActionBar';
import CustomTable, { IAction, IColumn } from '@/components/ui/Table/CustomTable';
import { useDebounced } from '@/hooks/useDebounced';
import {
    useDeleteOfferedCourseSectionMutation,
    useOfferedCourseSectionsQuery,
} from '@/redux/api/offeredCourseSectionApi';
import { IOfferedCourseSection } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function OfferedCourseSectionPage() {
    const router = useRouter();
    // QUERIES
    const [queries, setQueries] = useState({
        page: 1,
        limit: 10,
        sortBy: '',
        sortOrder: '',
        searchTerm: '',
    });
    // POPUP
    const { popupOptions, setPopupOptions } = usePopup();
    // DELETION
    const [deleteOfferedCourseSection, deleteResult] = useDeleteOfferedCourseSectionMutation();
    // DEBOUNCE
    const debouncedSearchTerm = useDebounced({
        searchQuery: queries.searchTerm,
        delay: 600,
    });
    // DEBOUNCE FOR SEARCH
    if (!!debouncedSearchTerm) {
        setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
    }
    const { data, isLoading } = useOfferedCourseSectionsQuery({ ...queries });

    const offeredCourseSections = data?.offeredCourseSections || [];
    const meta = data?.meta;

    const deleteHandler = async (deleteData: IOfferedCourseSection) => {
        await deleteOfferedCourseSection(deleteData?.id);
    };

    const handleEdit = (updateData: IOfferedCourseSection) => {
        console.log({ updateData });
        router.push(`/admin/offered-course-section/edit/${updateData.id}`);
    };

    // ALL ACTION BUTTONS
    const [actions] = useState<IAction[]>([
        {
            name: 'edit',
            type: 'link',
            href: (row) => `/admin/offered-course-section/edit/${row?.id}`,
            handler: handleEdit,
            permissions: [],
            disableOn: [],
        },
        {
            name: 'delete',
            type: 'button',
            handler: deleteHandler,
            permissions: [],
            disableOn: [],
        },
    ]);

    // TABLE COLUMNS DEFINE
    const columns: IColumn[] = [
        // NAME
        {
            header: 'Semester Registration',
            accessorKey: 'customSemesterRegistration',
            show: true,
            minWidth: 20,
        },
        // NAME
        {
            header: 'Offered courses',
            accessorKey: 'customOfferedCourse',
            show: true,
            minWidth: 30,
        },
        // NAME
        {
            header: 'Section',
            accessorKey: 'title',
            show: true,
            minWidth: 20,
        },
        // NAME
        {
            header: 'Max Capacity',
            accessorKey: 'maxCapacity',
            show: true,
            minWidth: 15,
        },
        // NAME
        {
            header: 'Enrolled Student',
            accessorKey: 'currentEnrolledStudent',
            show: true,
            minWidth: 25,
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
            {/* FORM MODAL */}
            <FormModal popupOptions={popupOptions} setPopupOptions={setPopupOptions} />

            {/* ACTION BAR */}
            <ActionBar
                title={`Manage Offered Course Sections`}
                // addButtonLabel={`Add New`}
                // createHandler={() =>
                //   router.push("/admin/offered-course-section/create")
                // }
            >
                <Link href="/admin/offered-course-section/create">
                    <CustomAddButton label="Add New"></CustomAddButton>
                </Link>
            </ActionBar>

            {/* TABLE */}
            <CustomTable
                columns={columns}
                isLoading={isLoading || deleteResult.isLoading}
                actions={actions}
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
                    offeredCourseSections?.map((row) => ({
                        ...row,
                        customSemesterRegistration: `${row?.semesterRegistration?.academicSemester?.title} - ${row?.semesterRegistration?.academicSemester?.year}`,
                        customOfferedCourse: row?.offeredCourse?.course?.title,
                    })) || []
                }
            />
        </>
    );
}
