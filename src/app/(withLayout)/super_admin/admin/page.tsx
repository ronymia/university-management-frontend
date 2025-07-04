'use client';

import CustomAddButton from '@/components/Button/CustomAddButton';
import FormModal from '@/components/Forms/FormModal';
import { usePopup } from '@/components/Popup/CustomPopup';
import ActionBar from '@/components/ui/ActionBar';
import CustomTable, { IAction, IColumn } from '@/components/Table/CustomTable';
import { useDebounced } from '@/hooks/useDebounced';
import { useAdminsQuery, useDeleteAdminMutation } from '@/redux/api/adminApi';
import { IAdmin } from '@/types';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useState } from 'react';

export default function AdminPage() {
    // QUERIES
    const [queries, setQueries] = useState({
        page: 1,
        limit: 10,
        sortBy: '',
        sortOrder: '',
        searchTerm: '',
        adminId: '',
    });
    // POPUP
    const { popupOptions, setPopupOptions } = usePopup();
    // DELETE
    const [deleteAdmin, deleteResult] = useDeleteAdminMutation();

    // DEBOUNCE FOR SEARCH
    const debouncedSearchTerm = useDebounced({
        searchQuery: queries.searchTerm,
        delay: 600,
    });

    if (!!debouncedSearchTerm) {
        setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
    }
    const { data, isLoading } = useAdminsQuery({ ...queries });
    const admins = data?.admins;
    const meta = data?.meta;

    const deleteHandler = async (id: IAdmin) => {
        await deleteAdmin(id?.id);
    };

    // ALL ACTION BUTTONS
    const [actions] = useState<IAction[]>([
        {
            name: 'edit',
            type: 'link',
            href: (row: IAdmin) => `admin/edit/${row?.id}`,
            handler: () => {},
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
            header: 'Id',
            accessorKey: 'id',
            show: true,
            minWidth: 10,
        },
        // NAME
        {
            header: 'Name',
            accessorKey: 'fullName',
            show: true,
            minWidth: 15,
        },
        // NAME
        {
            header: 'Email',
            accessorKey: 'email',
            show: true,
            minWidth: 15,
        },
        // NAME
        {
            header: 'Department',
            accessorKey: 'customManagementDepartment',
            show: true,
            minWidth: 20,
        },
        // NAME
        {
            header: 'Designation',
            accessorKey: 'designation',
            show: true,
            minWidth: 10,
        },
        // NAME
        {
            header: 'Contact no.',
            accessorKey: 'contactNo',
            show: true,
            minWidth: 10,
        },
        // NAME
        {
            header: 'Created at',
            accessorKey: 'customCreatedAt',
            show: false,
            minWidth: 15,
        },
    ];
    return (
        <>
            {/* FORM MODAL */}
            <FormModal popupOptions={popupOptions} setPopupOptions={setPopupOptions} />

            {/* ACTION BAR */}
            <ActionBar
                title={`Manage Admins`}
                // addButtonLabel={`Add Admin`}
                // createHandler={handleAddNewAdmin}
            >
                <Link href={`admin/create`}>
                    <CustomAddButton label={`Add Admin`} />
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
                    showPagination: meta?.totalPages ? meta?.totalPages > 1 : false,
                    paginationHandler: (page: number) => {
                        setQueries((prev) => ({ ...prev, page: page }));
                    },
                    changeLimitHandler: (limit: number) => {
                        setQueries((prev) => ({ ...prev, limit: limit }));
                    },
                }}
                rows={
                    admins?.map((row) => ({
                        ...row,
                        fullName: `${row?.name?.firstName} ${row?.name?.middleName} ${row?.name?.lastName}`,
                        customManagementDepartment: row?.managementDepartment?.title,
                        customCreatedAt: row?.createdAt
                            ? dayjs(row?.createdAt).format('MMM D, YYYY hh:mm A')
                            : '',
                    })) || []
                }
            />
        </>
    );
}
