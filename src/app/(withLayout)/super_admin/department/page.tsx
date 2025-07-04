'use client';

import FormModal from '@/components/Forms/FormModal';
import { usePopup } from '@/components/Popup/CustomPopup';
import ActionBar from '@/components/ui/ActionBar';
import CustomTable, { IAction, IColumn } from '@/components/Table/CustomTable';
import { useDebounced } from '@/hooks/useDebounced';
import { useDeleteDepartmentMutation, useDepartmentsQuery } from '@/redux/api/departmentApi';
import { IDepartment } from '@/types';
import { useState } from 'react';

export default function DepartmentPage() {
    // QUERIES
    const [queries, setQueries] = useState({
        page: 1,
        limit: 10,
        sortBy: '',
        sortOrder: '',
        searchTerm: '',
    });
    // POPUP
    const { popupOptions, setPopupOptions, handleAddNewDepartment } = usePopup();
    // DELETE
    const [deleteDepartment, deleteResult] = useDeleteDepartmentMutation();

    // DEBOUNCE FOR SEARCH
    const debouncedSearchTerm = useDebounced({
        searchQuery: queries.searchTerm,
        delay: 600,
    });

    if (!!debouncedSearchTerm) {
        setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
    }
    const { data, isLoading } = useDepartmentsQuery({ ...queries });

    const departments = data?.departments;
    const meta = data?.meta;

    const deleteHandler = async (id: IDepartment) => {
        await deleteDepartment(id?.id);
    };

    const handleEdit = (updateData: IDepartment) => {
        // console.log({ updateData });
        setPopupOptions((prev) => ({
            ...prev,
            open: true,
            data: updateData,
            actionType: 'update',
            form: 'department',
            title: 'Update Department',
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
                    form: 'department',
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
    ];

    return (
        <>
            {/* FORM MODAL */}
            <FormModal popupOptions={popupOptions} setPopupOptions={setPopupOptions} />

            {/* ACTION BAR */}
            <ActionBar
                title={`Manage Departments`}
                addButtonLabel={`Add Department`}
                createHandler={handleAddNewDepartment}
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
                    showPagination: meta?.totalPages ? meta?.totalPages > 1 : false,
                    paginationHandler: (page: number) => {
                        setQueries((prev) => ({ ...prev, page: page }));
                    },
                    changeLimitHandler: (limit: number) => {
                        setQueries((prev) => ({ ...prev, limit: limit }));
                    },
                }}
                rows={departments || []}
            />
        </>
    );
}
