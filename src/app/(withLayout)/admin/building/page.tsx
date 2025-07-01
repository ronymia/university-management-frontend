'use client';

import FormModal from '@/components/Forms/FormModal';
import { usePopup } from '@/components/Popup/CustomPopup';
import ActionBar from '@/components/ui/ActionBar';
import CustomTable, { IAction, IColumn } from '@/components/ui/Table/CustomTable';
import { useDebounced } from '@/hooks/useDebounced';
import { useBuildingsQuery, useDeleteBuildingMutation } from '@/redux/api/buildingApi';
import { IBuilding } from '@/types';
import { useState } from 'react';

export default function BuildingPage() {
    // DATABASE QUERY
    const [queries, setQueries] = useState({
        page: 1,
        limit: 10,
        sortBy: '',
        sortOrder: '',
        searchTerm: '',
    });
    // POPUP
    const { popupOptions, setPopupOptions, handleAddNewBuilding } = usePopup();
    // DELETE
    const [deleteBuilding, deleteResult] = useDeleteBuildingMutation();
    // DEBOUNCE FOR SEARCH
    const debouncedSearchTerm = useDebounced({
        searchQuery: queries.searchTerm,
        delay: 600,
    });

    if (!!debouncedSearchTerm) {
        setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
    }
    const { data, isLoading } = useBuildingsQuery({ ...queries });

    const buildings = data?.buildings || [];
    const meta = data?.meta;

    const deleteHandler = async (id: IBuilding) => {
        await deleteBuilding(id.id);
    };

    const handleEdit = (updateData: IBuilding) => {
        // console.log({ updateData });
        setPopupOptions((prev) => ({
            ...prev,
            open: true,
            data: updateData,
            actionType: 'update',
            form: 'building',
            title: 'Update Building',
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
            header: 'Title',
            accessorKey: 'title',
            show: true,
            minWidth: 30,
        },
        // NAME
        {
            header: 'Created At',
            accessorKey: 'createdAt',
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
                title={`Manage Buildings`}
                addButtonLabel={`Add New`}
                createHandler={handleAddNewBuilding}
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
                rows={buildings || []}
            />
        </>
    );
}
