'use client';

import CustomAddButton from '@/components/Button/CustomAddButton';
import FormModal from '@/components/Forms/FormModal';
import { usePopup } from '@/components/Popup/CustomPopup';
import ActionBar from '@/components/ui/ActionBar';
import CustomTable, { IAction, IColumn } from '@/components/Table/CustomTable';
import { useDebounced } from '@/hooks/useDebounced';
import { useDeleteFacultyMutation, useFacultiesQuery } from '@/redux/api/facultyApi';
import { getUserInfo } from '@/services/auth.service';
import { ICoreFaculty } from '@/types';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useState } from 'react';

export default function FacultyPage() {
    // QUERIES
    const [queries, setQueries] = useState({
        page: 1,
        limit: 10,
        sortBy: '',
        sortOrder: '',
        searchTerm: '',
    });

    // GET LOGGED IN USER ROLE
    const { role } = (getUserInfo() as any) || { role: '' };

    // POPUP
    const { popupOptions, setPopupOptions } = usePopup();
    // DELETE API
    const [deleteFaculty, deleteResult] = useDeleteFacultyMutation();
    // DEBOUNCE FOR SEARCH
    const debouncedSearchTerm = useDebounced({
        searchQuery: queries.searchTerm,
        delay: 600,
    });

    if (!!debouncedSearchTerm) {
        setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
    }
    const { data, isLoading } = useFacultiesQuery({ ...queries });

    const faculties = data?.faculties;
    const meta = data?.meta;

    // DELETE
    const deleteHandler = async (id: ICoreFaculty) => {
        await deleteFaculty(id.facultyId);
    };

    // ALL ACTION BUTTONS
    const [actions] = useState<IAction[]>([
        {
            name: 'view',
            type: 'link',
            href: (row: ICoreFaculty) => `manage-faculty/view/${row?.facultyId}`,
            handler: () => {},
            permissions: [],
            disableOn: [],
        },
        {
            name: 'edit',
            type: 'link',
            href: (row: ICoreFaculty) => `manage-faculty/edit/${row?.facultyId}`,
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
            accessorKey: 'facultyId',
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
            accessorKey: 'customAcademicDepartment',
            show: true,
            minWidth: 15,
        },
        // NAME
        {
            header: 'Faculty',
            accessorKey: 'customAcademicFaculty',
            show: true,
            minWidth: 15,
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
            <ActionBar title={`Manage Faculties`}>
                <Link href={`/${role}/manage-faculty/create`}>
                    <CustomAddButton label={`Add Faculty`} />
                </Link>
            </ActionBar>

            {/* TABLE */}
            <CustomTable
                isLoading={isLoading || deleteResult.isLoading}
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
                    faculties?.map((row) => ({
                        ...row,
                        fullName: `${row?.firstName} ${row?.middleName} ${row?.lastName}`,
                        customAcademicDepartment: row?.academicDepartment?.title,
                        customAcademicFaculty: row?.academicFaculty?.title,
                        customCreatedAt: row?.createdAt
                            ? dayjs(row?.createdAt).format('MMM D, YYYY hh:mm A')
                            : '',
                    })) || []
                }
            />
        </>
    );
}
