'use client';

import FormModal from '@/components/Forms/FormModal';
import { usePopup } from '@/components/Popup/CustomPopup';
import ActionBar from '@/components/ui/ActionBar';
import CustomTable, { IAction, IColumn } from '@/components/Table/CustomTable';
import { useDebounced } from '@/hooks/useDebounced';
import {
    useAcademicDepartmentsQuery,
    useDeleteAcademicDepartmentMutation,
} from '@/redux/api/academic/departmentApi';
import { IAcademicCoreDepartment } from '@/types';
import dayjs from 'dayjs';
import { useState } from 'react';

export default function AcademicDepartmentPage() {
    // DATABASE QUERY
    const [queries, setQueries] = useState({
        page: 1,
        limit: 10,
        sortBy: '',
        sortOrder: '',
        searchTerm: '',
    });
    // POPUP
    const { popupOptions, setPopupOptions, handleAddNewAcademicDepartment } = usePopup();
    // DELETE
    const [deleteAcademicDepartment, deleteResult] = useDeleteAcademicDepartmentMutation();
    // DEBOUNCE FOR SEARCH
    const debouncedSearchTerm = useDebounced({
        searchQuery: queries.searchTerm,
        delay: 600,
    });

    if (!!debouncedSearchTerm) {
        setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
    }

    // GET DATA
    const { data, isLoading, isFetching } = useAcademicDepartmentsQuery({
        ...queries,
    });

    const academicDepartments = data?.academicDepartments || [];
    const meta = data?.meta;

    const deleteHandler = async (id: IAcademicCoreDepartment) => {
        await deleteAcademicDepartment(id?.id);
    };

    const handleEdit = (updateData: IAcademicCoreDepartment) => {
        // console.log({ updateData });
        setPopupOptions((prev) => ({
            ...prev,
            open: true,
            data: updateData,
            actionType: 'update',
            form: 'academic_department',
            title: 'Update Academic Department',
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
                    form: 'academic_department',
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
            header: 'Academic Faculty',
            accessorKey: 'customAcademicFaculty',
            show: true,
            minWidth: 30,
        },
        // NAME
        {
            header: 'created At',
            accessorKey: 'customCreatedAt',
            show: false,
            minWidth: 30,
        },
    ];
    return (
        <>
            {/* FORM MODAL */}
            <FormModal
                popupOptions={popupOptions}
                setPopupOptions={setPopupOptions}
                customHeight="600px"
            />

            {/* ACTION BAR */}
            <ActionBar
                title={`Manage Academic Departments`}
                addButtonLabel={`Add New`}
                createHandler={handleAddNewAcademicDepartment}
            />

            {/* TABLE */}
            <CustomTable
                columns={columns}
                isLoading={isLoading || isFetching || deleteResult.isLoading}
                actions={actions}
                paginationConfig={{
                    page: meta?.page || 0,
                    limit: meta?.limit || 0,
                    skip: meta?.skip || 0,
                    total: meta?.total || 0,
                    paginationTotal: meta?.paginationTotal || 0,
                    totalPages: meta?.totalPages || 0,
                    showPagination: meta?.totalPages ? meta?.totalPages > 1 : false,
                    paginationHandler: (page: number) => {
                        setQueries((prev) => ({ ...prev, page: page }));
                    },
                    changeLimitHandler: (limit: number) => {
                        setQueries((prev) => ({ ...prev, limit: limit }));
                    },
                }}
                rows={
                    academicDepartments.map((row) => ({
                        ...row,
                        customAcademicFaculty: row?.academicFaculty?.title,
                        customCreatedAt: dayjs(row?.createdAt).format('MMM D, YYYY hh:mm A'),
                    })) || []
                }
            />
        </>
    );
}
