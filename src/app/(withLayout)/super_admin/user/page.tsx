'use client';

import FormModal from '@/components/Forms/FormModal';
import { usePopup } from '@/components/Popup/CustomPopup';
import CustomTable, { IAction, IColumn } from '@/components/Table/CustomTable';
import ActionBar from '@/components/ui/ActionBar';
import { USER_ROLE } from '@/enums/global';
import { useDebounced } from '@/hooks/useDebounced';
import { useUsersQuery } from '@/redux/api/userApi';
import { getFullName } from '@/utils/getFullName';
import dayjs from 'dayjs';
import { useState } from 'react';

export default function UserPage() {
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
    // const [deleteUser, deleteResult] = useDeleteUserMutation();
    // DEBOUNCE FOR SEARCH
    const debouncedSearchTerm = useDebounced({
        searchQuery: queries.searchTerm,
        delay: 600,
    });

    if (!!debouncedSearchTerm) {
        setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
    }
    const { data, isLoading } = useUsersQuery({
        page: queries.page,
        limit: queries.limit,
    });
    console.log({ data });

    const students = data?.users;
    const meta = data?.meta;
    // console.log(students);
    // const deleteHandler = async (deleteData: IUser) => {
    //     await deleteUser(deleteData?.id);
    // };

    // ALL ACTION BUTTONS
    const [actions] = useState<IAction[]>([
        // {
        //     name: 'view',
        //     type: 'link',
        //     href: (row: IUser) => `manage-student/view/${row?.id}`,
        //     handler: () => {},
        //     permissions: [],
        //     disableOn: [],
        // },
        // {
        //     name: 'edit',
        //     type: 'link',
        //     href: (row: IUser) => `manage-student/edit/${row?.id}`,
        //     handler: () => {},
        //     permissions: [],
        //     disableOn: [],
        // },
        // {
        //     name: 'delete',
        //     type: 'button',
        //     handler: deleteHandler,
        //     permissions: [],
        //     disableOn: [],
        // },
    ]);

    // TABLE COLUMNS DEFINE
    const columns: IColumn[] = [
        // NAME
        {
            header: 'User Id',
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
            header: 'Role',
            accessorKey: 'role',
            show: true,
            minWidth: 10,
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
            show: true,
            minWidth: 15,
        },
    ];
    return (
        <>
            {/* FORM MODAL */}
            <FormModal popupOptions={popupOptions} setPopupOptions={setPopupOptions} />

            {/* ACTION BAR */}
            <ActionBar title={`Manage Users`}>
                {/* <Link href={`manage-student/create`}>
                    <CustomAddButton label={`Add New`}></CustomAddButton>
                </Link> */}
            </ActionBar>

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
                    students?.map((row) => ({
                        ...row,
                        fullName:
                            row?.role === USER_ROLE.STUDENT
                                ? getFullName(row?.student?.name)
                                : row?.role === USER_ROLE.ADMIN
                                  ? getFullName(row?.admin?.name)
                                  : row?.role === USER_ROLE.FACULTY
                                    ? getFullName(row?.faculty?.name)
                                    : `N/A`,
                        email:
                            row?.role === USER_ROLE.STUDENT
                                ? row?.student?.email
                                : row?.role === USER_ROLE.ADMIN
                                  ? row?.admin?.email
                                  : row?.role === USER_ROLE.FACULTY
                                    ? row?.faculty?.email
                                    : `N/A`,
                        contactNo:
                            row?.role === USER_ROLE.STUDENT
                                ? row?.student?.contactNo
                                : row?.role === USER_ROLE.ADMIN
                                  ? row?.admin?.contactNo
                                  : row?.role === USER_ROLE.FACULTY
                                    ? row?.faculty?.contactNo
                                    : `N/A`,
                        customCreatedAt: row?.createdAt
                            ? dayjs(row?.createdAt).format('MMM D, YYYY hh:mm A')
                            : '',
                    })) || []
                }
            />
        </>
    );
}
