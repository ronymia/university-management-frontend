'use client';

import CustomAddButton from '@/components/Button/CustomAddButton';
import FormModal from '@/components/Forms/FormModal';
import { usePopup } from '@/components/Popup/CustomPopup';
import ActionBar from '@/components/ui/ActionBar';
import CustomTable, { IAction, IColumn } from '@/components/Table/CustomTable';
import { useDebounced } from '@/hooks/useDebounced';
import { useDeleteStudentMutation, useStudentsQuery } from '@/redux/api/studentApi';
import type { IStudent } from '@/types';
import { getFullName } from '@/utils/getFullName';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useState } from 'react';

export default function StudentPage() {
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
    // DELETE API
    const [deleteStudent, deleteResult] = useDeleteStudentMutation();
    // DEBOUNCE FOR SEARCH
    const debouncedSearchTerm = useDebounced({
        searchQuery: queries.searchTerm,
        delay: 600,
    });

    if (!!debouncedSearchTerm) {
        setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
    }
    // QUERIES
    const { data, isLoading } = useStudentsQuery({ ...queries });

    const students = data?.students;
    const meta = data?.meta;
    // console.log(students);
    const deleteHandler = async (deleteData: IStudent) => {
        await deleteStudent(deleteData?.id);
    };

    // ALL ACTION BUTTONS
    const [actions] = useState<IAction[]>([
        {
            name: 'view',
            type: 'link',
            href: (row: IStudent) => `manage-student/view/${row?.id}`,
            handler: () => {},
            permissions: [],
            disableOn: [],
        },
        {
            name: 'edit',
            type: 'link',
            href: (row: IStudent) => `manage-student/edit/${row?.id}`,
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
            header: 'Student Id',
            accessorKey: 'id',
            show: true,
            minWidth: 10,
        },
        // NAME
        {
            header: 'Name',
            accessorKey: 'fullName',
            show: true,
            minWidth: 20,
        },
        // NAME
        {
            header: 'Email',
            accessorKey: 'email',
            show: true,
            minWidth: 20,
        },
        // NAME
        {
            header: 'Semester',
            accessorKey: 'customAcademicSemester',
            show: true,
            minWidth: 10,
        },
        // NAME
        {
            header: 'Department',
            accessorKey: 'customAcademicDepartment',
            show: true,
            minWidth: 20,
        },
        // NAME
        {
            header: 'Contact no.',
            accessorKey: 'contactNo',
            show: true,
            minWidth: 20,
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
            <ActionBar title={`Manage Students`}>
                <Link href={`manage-student/create`}>
                    <CustomAddButton label={`Add New`}></CustomAddButton>
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
                    students?.map((row) => ({
                        ...row,
                        fullName: row?.name ? getFullName(row?.name) : `N/A`,
                        customAcademicDepartment: row?.academicDepartment?.title,
                        customAcademicSemester: `${row?.academicSemester?.title} - ${row?.academicSemester?.year}`,
                        customCreatedAt: row?.createdAt
                            ? dayjs(row?.createdAt).format('MMM D, YYYY hh:mm A')
                            : '',
                    })) || []
                }
            />
        </>
    );
}
