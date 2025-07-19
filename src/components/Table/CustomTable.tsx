'use client';

import React, { ReactElement, ReactNode, useMemo, useState } from 'react';
import { IconType } from 'react-icons';
import useDeviceWith from '@/hooks/useDeviceWith';
import { getFromLocalStorage } from '@/utils/local-storage';
import Pagination from './Pagination';
import ActionButtons from './ActionButtons';
import CustomLoading from '@/components/Loader/CustomLoading';
import NoDataFound from '../NoDataFound/NoDataFound';

export interface IAction {
    name: string;
    type: 'link' | 'button';
    href?: string | ((row: any) => string);
    handler: (row: any) => void;
    Icon?: IconType | ReactElement | ReactNode;
    permissions: string[];
    disableOn: { accessorKey: string; value: any }[];
}

export interface IColumn {
    header: string;
    accessorKey: string;
    accessorFn?: (row: any) => any;
    minWidth?: number;
    show: boolean;
    isMainField?: boolean;
    align?: 'left' | 'center' | 'right';
    // Add these for sorting
    sortable?: boolean;
    sortDirection?: 'asc' | 'desc' | null;
    onSort?: (accessorKey: string, direction: 'asc' | 'desc') => void;
}

interface ICustomTableProps {
    rowHeight?: string;
    rows: any[];
    columns: IColumn[];
    isLoading: boolean;
    actions: IAction[];
    dataAuto?: string;
    showPagination?: boolean;
    paginationHandler?: (page: number) => void;
    limit?: number;
    totalData?: number;
    paginationConfig?: {
        page: number;
        limit: number;
        skip: number;
        total: number;
        paginationTotal: number;
        totalPages: number;
        showPagination: boolean;
        paginationHandler: (page: number) => void;
        changeLimitHandler: (limit: number) => void;
    };
}

export default function CustomTable({
    rows = [],
    columns = [],
    isLoading = false,
    actions = [],
    dataAuto,
    paginationConfig = {
        page: 1,
        limit: 10,
        skip: 0,
        total: 0,
        totalPages: 0,
        paginationTotal: 0,
        showPagination: false,
        paginationHandler: () => {},
        changeLimitHandler: () => {},
    },
}: ICustomTableProps) {
    // GET DEVICE WIDTH
    const windowInnerWidth = useDeviceWith();

    // GET PERMISSIONS
    const permissions = getFromLocalStorage('permissions') || [];
    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: 'asc' | 'desc';
    } | null>(null);

    const handleSort = (key: string, direction: 'asc' | 'desc') => {
        setSortConfig({ key, direction });
    };

    const sortedRows = useMemo(() => {
        if (!sortConfig) return rows;

        return [...rows].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [rows, sortConfig]);

    // Update your columns with sorting props
    const columnsWithSort = columns
        .filter((col) => col.show)
        .map((col) => ({
            ...col,
            sortable: true, // or conditionally set this
            sortDirection: sortConfig?.key === col.accessorKey ? sortConfig.direction : null,
            onSort: handleSort,
        }));

    // Then pass sortedRows and columnsWithSort to your CustomTable

    /* ===================================== RETURN JSX ===================================== */
    return (
        <>
            <table className="w-full table table-auto border-separate border-spacing-y-2.5">
                {/* <===================================== Table Header ===================================> */}
                {/* // In your CustomTable component's return statement */}
                <thead className="h-16 hidden md:table-header-group sticky top-24 bg-base-300 z-10 text-sm">
                    {/* Main Header Row */}
                    <tr className="text-start text-neutral">
                        {columnsWithSort?.map((col, index) => (
                            <th
                                key={col?.accessorKey}
                                align={col?.align || 'left'}
                                colSpan={col?.accessorKey === 'actions' ? actions?.length : 1}
                                style={{
                                    width: col?.minWidth ? `${col?.minWidth}%` : 'auto',
                                }}
                                className=""
                            >
                                <div
                                    className={`bg-primary/10 drop-shadow border-t border-b border-primary/20 h-16 flex items-center justify-start px-4 
                                                    ${index === 0 ? 'border-l rounded-l-xl' : 'border-l-0'}
                                                    ${
                                                        actions.length === 0 &&
                                                        index === columnsWithSort.length - 1
                                                            ? 'border-r rounded-r-xl'
                                                            : 'border-r-0'
                                                    }
                                                `}
                                >
                                    {col?.header}
                                </div>
                            </th>
                        ))}
                        {actions.length > 0 && (
                            <th
                                key="actions"
                                style={{ minWidth: '5%' }}
                                colSpan={actions?.length}
                                className="rounded-tr-xl rounded-br-xl"
                            >
                                <div className="bg-primary/10 flex items-center justify-end h-16 drop-shadow border-t border-b border-r border-primary/20 rounded-tr-xl rounded-br-xl pr-5">
                                    Action
                                </div>
                            </th>
                        )}
                    </tr>
                </thead>
                {/* <===================================== Table Body ===================================> */}
                <tbody className="md:table-row-group relative">
                    {!isLoading ? (
                        sortedRows.length > 0 ? (
                            sortedRows?.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className="min-h-16 block md:table-row border md:border-0 md:border-b border-primary-content text-sm font-semibold mb-4 md:mb-0 p-4 md:p-0 rounded-lg"
                                >
                                    {/* <===================================== Action for Mobile ====================================> */}
                                    {windowInnerWidth < 768 && actions?.length > 0 && (
                                        <td
                                            // align={col?.align || "left"}
                                            style={{
                                                minWidth: '1%',
                                            }}
                                            colSpan={columnsWithSort?.length + 1}
                                            className="w-full p-2 flex items-center justify-center space-x-2"
                                        >
                                            <ActionButtons
                                                key={row?.id}
                                                actions={actions}
                                                row={row}
                                                dataAuto={dataAuto || ''}
                                                permissions={permissions}
                                            />
                                        </td>
                                    )}
                                    {/* <===================================== Table Columns ===================================> */}
                                    {columnsWithSort?.map((col, index) =>
                                        col.show ? (
                                            <td
                                                key={col?.accessorKey}
                                                align={col?.align || 'left'}
                                                style={{
                                                    width:
                                                        windowInnerWidth > 768
                                                            ? col?.minWidth
                                                                ? `${col?.minWidth}%`
                                                                : 'auto'
                                                            : '100%',
                                                }}
                                                data-label={col?.['header']}
                                                className="block md:table-cell border md:border-none border-gray-200 h-16"
                                            >
                                                <div
                                                    className={`drop-shadow md:border-t md:border-b md:border-primary/20 h-16 flex items-center justify-start px-4 
                            ${index === 0 ? 'md:border-l md:rounded-l-xl' : 'md:border-l-0'}
                             ${
                                 actions?.length === 0 && index === columnsWithSort.length - 1
                                     ? 'md:border-r rounded-r-xl'
                                     : 'border-r-0'
                             }
                           `}
                                                >
                                                    {/* <div className="flex justify-between md:block w-full"> */}
                                                    <div className="flex md:block w-full">
                                                        <span className="font-normal md:hidden w-32 shrink-0">
                                                            {col?.['header']}{' '}
                                                            <span className="font-bold">:</span>
                                                        </span>
                                                        <span className="flex-1">
                                                            {col?.accessorFn
                                                                ? col?.accessorFn({
                                                                      row,
                                                                      value: row?.[
                                                                          col?.accessorKey
                                                                      ],
                                                                  })
                                                                : row?.[col?.accessorKey] || 'N/A'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                        ) : null,
                                    )}
                                    {/* <===================================== Action for Desktop ==================================> */}
                                    {windowInnerWidth > 768 && actions?.length > 0 && (
                                        <td className="hidden md:table-cell text-right">
                                            <div className="flex items-center justify-end space-x-1.5 h-16 drop-shadow border-t border-b border-r border-primary/20 rounded-tr-xl rounded-br-xl pr-5">
                                                <ActionButtons
                                                    key={row?.id}
                                                    actions={actions}
                                                    row={row}
                                                    dataAuto={dataAuto || ''}
                                                    permissions={permissions}
                                                />
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr className="border-b w-full">
                                <td
                                    colSpan={
                                        windowInnerWidth > 768
                                            ? columnsWithSort.length + 1
                                            : columnsWithSort.length + 1
                                    }
                                    className="text-center align-middle h-96 w-full"
                                >
                                    <NoDataFound />
                                </td>
                            </tr>
                        )
                    ) : (
                        <tr className="border-b w-full">
                            <td
                                colSpan={
                                    windowInnerWidth > 768
                                        ? columnsWithSort.length + 1
                                        : columnsWithSort.length + 1
                                }
                                className="text-center align-middle h-96 w-full"
                            >
                                <CustomLoading />
                            </td>
                        </tr>
                    )}
                </tbody>
                {/* <===================================== Table Footer ==================================> */}
                {paginationConfig?.showPagination && (
                    <tfoot className="h-20 md:h-16 sticky bottom-3 bg-base-300 z-10">
                        <tr className="text-sm font-semibold h-full">
                            <td colSpan={columnsWithSort.length + 1}>
                                <div
                                    className={`w-full drop-shadow rounded-xl border border-primary/20 bg-primary/20 h-full flex flex-col md:flex-row items-center justify-between 
                                        md:px-4 gap-1.5 p-1.5`}
                                >
                                    {/* Pagination Info */}
                                    <div className="flex items-center gap-2 justify-between w-full">
                                        <span className="font-bold">
                                            Showing {paginationConfig?.skip}-
                                            {paginationConfig?.skip +
                                                paginationConfig?.paginationTotal}{' '}
                                            of {paginationConfig?.total}
                                        </span>

                                        <label className="font-bold md:hidden w-fit">
                                            Rows Per Page:
                                            <select
                                                name="limit"
                                                id="limit"
                                                value={paginationConfig.limit}
                                                onChange={(e) =>
                                                    paginationConfig?.changeLimitHandler?.(
                                                        parseInt(e.target.value),
                                                    )
                                                }
                                                className="ml-2 border border-primary rounded"
                                            >
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select>
                                        </label>
                                    </div>

                                    {/* Pagination Controls */}
                                    <div className="flex items-center gap-4">
                                        <label className="font-bold hidden md:flex w-40">
                                            Rows Per Page:
                                            <select
                                                name="limit"
                                                id="limit"
                                                value={paginationConfig.limit}
                                                onChange={(e) =>
                                                    paginationConfig?.changeLimitHandler?.(
                                                        parseInt(e.target.value),
                                                    )
                                                }
                                                className="ml-2 border border-primary rounded"
                                            >
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select>
                                        </label>

                                        <Pagination
                                            totalPages={paginationConfig?.totalPages}
                                            changeHandler={paginationConfig?.paginationHandler}
                                        />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                )}
            </table>
        </>
    );
}
