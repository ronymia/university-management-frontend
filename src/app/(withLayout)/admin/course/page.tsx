'use client';

import FormModal from '@/components/Forms/FormModal';
import { usePopup } from '@/components/Popup/CustomPopup';
import ActionBar from '@/components/ui/ActionBar';
import CustomTable, { IAction, IColumn } from '@/components/Table/CustomTable';
import { useDebounced } from '@/hooks/useDebounced';
import { useCoursesQuery, useDeleteCourseMutation } from '@/redux/api/courseApi';
import { ICourse } from '@/types';
import { useState } from 'react';

export default function CoursePage() {
    // ALL QUERIES
    const [queries, setQueries] = useState({
        page: 1,
        limit: 10,
        sortBy: '',
        sortOrder: '',
        searchTerm: '',
    });
    //   POPUP
    const { popupOptions, setPopupOptions, handleAddNewCourse } = usePopup();
    const [deleteCourse, deleteResult] = useDeleteCourseMutation();
    //   DEBOUNCE FOR SEARCH
    const debouncedSearchTerm = useDebounced({
        searchQuery: queries.searchTerm,
        delay: 600,
    });

    if (!!debouncedSearchTerm) {
        setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
    }
    const { data, isLoading } = useCoursesQuery({ ...queries });
    // console.log({ data });

    const courses = data?.courses || [];
    const meta = data?.meta;

    const deleteHandler = async (id: string) => {
        await deleteCourse(id);
    };

    const handleEdit = (updateData: ICourse) => {
        // console.log({ updateData });
        setPopupOptions((prev) => ({
            ...prev,
            open: true,
            data: updateData,
            actionType: 'update',
            form: 'course',
            title: 'Update Course',
        }));
    };

    // ALL ACTION BUTTONS
    const [actions] = useState<IAction[]>([
        {
            name: 'edit',
            type: 'button',
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
            header: 'Title',
            accessorKey: 'title',
            show: true,
            minWidth: 50,
        },
        // NAME
        {
            header: 'Code',
            accessorKey: 'code',
            show: true,
            minWidth: 20,
        },
        // NAME
        {
            header: 'Credits',
            accessorKey: 'credits',
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
            {/* FORM MODAL */}
            <FormModal popupOptions={popupOptions} setPopupOptions={setPopupOptions} />

            {/* ACTION BAR */}
            <ActionBar
                title={`Manage Courses`}
                addButtonLabel={`Add New`}
                createHandler={handleAddNewCourse}
            />

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
                rows={courses || []}
            />
        </>
    );
}
