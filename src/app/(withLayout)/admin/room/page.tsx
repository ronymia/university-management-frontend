'use client';

import FormModal from '@/components/Forms/FormModal';
import { usePopup } from '@/components/Popup/CustomPopup';
import ActionBar from '@/components/ui/ActionBar';
import CustomTable, { IAction, IColumn } from '@/components/Table/CustomTable';
import { useDebounced } from '@/hooks/useDebounced';
import { useDeleteRoomMutation, useRoomsQuery } from '@/redux/api/roomApi';
import { IRoom } from '@/types';
import { useState } from 'react';

export default function RoomPage() {
    // DATABASE QUERY
    const [queries, setQueries] = useState({
        page: 1,
        limit: 10,
        sortBy: '',
        sortOrder: '',
        searchTerm: '',
    });
    // POPUP
    const { popupOptions, setPopupOptions, handleAddNewRoom } = usePopup();
    // DELETE
    const [deleteRoom, deleteResult] = useDeleteRoomMutation();

    const debouncedSearchTerm = useDebounced({
        searchQuery: queries.searchTerm,
        delay: 600,
    });

    if (!!debouncedSearchTerm) {
        setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
    }
    const { data, isLoading } = useRoomsQuery({ ...queries });

    const rooms = data?.rooms || [];
    const meta = data?.meta;

    const deleteHandler = async (id: IRoom) => {
        await deleteRoom(id.id);
    };

    const handleEdit = (updateData: IRoom) => {
        console.log({ updateData });
        setPopupOptions((prev) => ({
            ...prev,
            open: true,
            data: updateData,
            actionType: 'update',
            form: 'room',
            title: 'Update Room',
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
                    form: 'building',
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
            header: 'Room Number',
            accessorKey: 'roomNumber',
            show: true,
            minWidth: 20,
        },
        // NAME
        {
            header: 'Floor',
            accessorKey: 'floor',
            show: true,
            minWidth: 20,
        },
        // NAME
        {
            header: 'Building',
            accessorKey: 'customBuilding',
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
                title={`Manage Rooms`}
                addButtonLabel={`Add New`}
                createHandler={handleAddNewRoom}
            />

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
                    rooms?.map((room) => ({
                        ...room,
                        customBuilding: room?.building?.title,
                    })) || []
                }
            />
        </>
    );
}
