'use client';

import FormModal from '@/components/Forms/FormModal';
import { usePopup } from '@/components/Popup/CustomPopup';
import ActionBar from '@/components/ui/ActionBar';
import CustomTable, { IAction, IColumn } from '@/components/Table/CustomTable';
import { SemesterRegistrationStatus } from '@/enums/global';
import { useDebounced } from '@/hooks/useDebounced';
import {
    useDeleteSemesterRegistrationsMutation,
    useSemesterRegistrationsQuery,
    useStartNewSemesterMutation,
} from '@/redux/api/semesterRegistrationApi';
import { ISemesterRegistration } from '@/types';
import dayjs from 'dayjs';
import { useState } from 'react';
import { MdPlayCircleOutline } from 'react-icons/md';

export default function SemesterRegistrationPage() {
    // Queries
    const [queries, setQueries] = useState({
        page: 1,
        limit: 10,
        sortBy: '',
        sortOrder: '',
        searchTerm: '',
    });
    // POPUP
    const { popupOptions, setPopupOptions, handleAddNewSemesterRegistration } = usePopup();
    // DELETE
    const [deleteSemesterRegistrations, deleteResult] = useDeleteSemesterRegistrationsMutation();
    // START
    const [startNewSemester] = useStartNewSemesterMutation();
    // DEBOUNCE FOR SEARCH
    const debouncedSearchTerm = useDebounced({
        searchQuery: queries.searchTerm,
        delay: 600,
    });

    if (!!debouncedSearchTerm) {
        setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
    }
    // QUERIES
    const { data, isLoading } = useSemesterRegistrationsQuery({ ...queries });

    const semesterRegistrations = data?.semesterRegistrations || [];
    const meta = data?.meta;

    const handleStartSemester = async (startSemesterData: ISemesterRegistration) => {
        await startNewSemester(startSemesterData?.id).unwrap();
    };

    const deleteHandler = async (deleteData: ISemesterRegistration) => {
        await deleteSemesterRegistrations(deleteData.id);
    };

    const handleEdit = (updateData: ISemesterRegistration) => {
        setPopupOptions((prev) => ({
            ...prev,
            open: true,
            data: updateData,
            actionType: 'update',
            form: 'semester_registration',
            title: 'Update Semester Registration',
        }));
    };

    // ALL ACTION BUTTONS
    const [actions] = useState<IAction[]>([
        {
            name: 'Start Semester',
            type: 'button',
            handler: handleStartSemester,
            Icon: MdPlayCircleOutline,
            permissions: [],
            disableOn: [
                {
                    accessorKey: 'status',
                    value: SemesterRegistrationStatus.UPCOMING,
                },
                {
                    accessorKey: 'status',
                    value: SemesterRegistrationStatus.ONGOING,
                },
            ],
        },
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
                    form: 'semester_registration',
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
            header: 'Start Date',
            accessorKey: 'customStartDate',
            show: true,
            minWidth: 20,
        },
        // NAME
        {
            header: 'End Date',
            accessorKey: 'customEndDate',
            show: true,
            minWidth: 20,
        },
        // NAME
        {
            header: 'Status',
            accessorKey: 'status',
            show: true,
            minWidth: 20,
        },
        // NAME
        {
            header: 'Academic Semester',
            accessorKey: 'customAcademicSemester',
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
                title={`Semester Registration`}
                addButtonLabel={`Add New`}
                createHandler={handleAddNewSemesterRegistration}
            />

            {/* TABLE */}
            <CustomTable
                showPagination
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
                    semesterRegistrations?.map((row) => ({
                        ...row,
                        customStartDate: dayjs(row?.startDate).format('MMM D, YYYY'),
                        customEndDate: dayjs(row?.endDate).format('MMM D, YYYY'),
                        customAcademicSemester: row?.academicSemester?.title,
                    })) || []
                }
            />
        </>
    );
}
