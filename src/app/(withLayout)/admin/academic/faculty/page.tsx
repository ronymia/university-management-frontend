'use client';

import FormModal from '@/components/Forms/FormModal';
import { usePopup } from '@/components/Popup/CustomPopup';
import ActionBar from '@/components/ui/ActionBar';
import CustomTable, { IAction, IColumn } from '@/components/Table/CustomTable';
import { useDebounced } from '@/hooks/useDebounced';
import {
    useAcademicFacultiesQuery,
    useDeleteAcademicFacultyMutation,
} from '@/redux/api/academic/facultyApi';
import { IAcademicCoreFaculty } from '@/types';
import dayjs from 'dayjs';
import { useState } from 'react';

export default function AcademicFacultyPage() {
    // DATABASE QUERY
    const [queries, setQueries] = useState({
        page: 1,
        limit: 10,
        sortBy: '',
        sortOrder: '',
        searchTerm: '',
    });

    // POPUP
    const { popupOptions, setPopupOptions, handleAddNewAcademicFaculty } = usePopup();
    // DELETE
    const [deleteAcademicFaculty, deleteResult] = useDeleteAcademicFacultyMutation();
    // DEBOUNCE FOR SEARCH
    const debouncedSearchTerm = useDebounced({
        searchQuery: queries.searchTerm,
        delay: 600,
    });

    if (!!debouncedSearchTerm) {
        setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
    }
    const { data, isLoading } = useAcademicFacultiesQuery({ ...queries });

    const academicFaculties = data?.academicFaculties || [];
    const meta = data?.meta;

    const deleteHandler = async (id: IAcademicCoreFaculty) => {
        await deleteAcademicFaculty(id.id);
    };

    const handleEdit = (updateData: IAcademicCoreFaculty) => {
        // console.log({ updateData });
        setPopupOptions((prev) => ({
            ...prev,
            open: true,
            data: updateData,
            actionType: 'update',
            form: 'academic_faculty',
            title: 'Update Academic Faculty',
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
            handler: (deleteData) => {
                setPopupOptions((prev) => ({
                    ...prev,
                    open: true,
                    data: deleteData,
                    actionType: 'delete',
                    form: 'academic_faculty',
                    deleteHandler: () => deleteHandler(deleteData),
                }));
            },
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
            minWidth: 30,
        },
        // NAME
        {
            header: 'Created At',
            accessorKey: 'customCreatedAt',
            show: false,
            minWidth: 30,
        },
    ];

    return (
        <>
            {/* FORM MODAL */}
            <FormModal popupOptions={popupOptions} setPopupOptions={setPopupOptions} />

            {/* ACTION BAR */}
            <ActionBar
                title={`Manage Academic Faculty`}
                addButtonLabel={`Add New`}
                createHandler={handleAddNewAcademicFaculty}
            />

            {/* TABLE */}
            <CustomTable
                isLoading={isLoading || deleteResult.isLoading}
                columns={columns}
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
                    academicFaculties?.map((row) => ({
                        ...row,
                        customCreatedAt: dayjs(row.createdAt).format('MMM D, YYYY hh:mm A'),
                    })) || []
                }
            />
        </>
    );
}
