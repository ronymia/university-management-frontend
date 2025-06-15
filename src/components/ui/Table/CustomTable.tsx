"use client";

import React, { useMemo, useState } from "react";
import { IconType } from "react-icons";
import { motion } from "motion/react";
import useDeviceWith from "@/hooks/useDeviceWith";
import { hasPermission } from "@/utils/hasPermission";
import { getFromLocalStorage } from "@/utils/local-storage";
import Pagination from "./Pagination";
import ActionButtons from "./ActionButtons";
import SortableHeader from "./SortableHeader";
import { useAppSelector } from "@/redux/hooks";

export interface IAction {
  name: string;
  handler: (row: any) => void;
  Icon: IconType | React.ReactElement | React.ReactNode;
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
  align?: "left" | "center" | "right";
  // Add these for sorting
  sortable?: boolean;
  sortDirection?: "asc" | "desc" | null;
  onSort?: (accessorKey: string, direction: "asc" | "desc") => void;
}

interface ICustomTableProps {
  rows: any[];
  columns: IColumn[];
  isLoading: boolean;
  actions: IAction[];
  dataAuto?: string;
  showPagination?: boolean;
  paginationHandler: (page: number) => void;
  limit: number;
  totalData: number;
}

export default function CustomTable({
  rows = [],
  columns = [],
  isLoading = false,
  actions = [],
  dataAuto,
  showPagination = true,
  paginationHandler = () => {},
  changeLimitHandler = () => {},
  limit,
  totalData,
}: ICustomTableProps) {
  // GET DEVICE WIDTH
  const windowInnerWidth = useDeviceWith();
  const { isStickyNavbar, lastScrollTopNavbar } = useAppSelector(
    (state) => state.globalState
  );

  // GET PERMISSIONS
  const permissions = getFromLocalStorage("permissions") || [];
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (key: string, direction: "asc" | "desc") => {
    setSortConfig({ key, direction });
  };

  const sortedRows = useMemo(() => {
    if (!sortConfig) return rows;

    return [...rows].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [rows, sortConfig]);

  // Update your columns with sorting props
  const columnsWithSort = columns.map((col) => ({
    ...col,
    sortable: true, // or conditionally set this
    sortDirection:
      sortConfig?.key === col.accessorKey ? sortConfig.direction : null,
    onSort: handleSort,
  }));

  // Then pass sortedRows and columnsWithSort to your CustomTable

  /* ===================================== RETURN JSX ===================================== */
  return (
    <>
      <table
        style={{
          borderCollapse: "separate",
          borderSpacing: "0 10px",
        }}
        className="w-full"
      >
        {/* <===================================== Table Header ===================================> */}
        {/* // In your CustomTable component's return statement */}
        <thead className="h-16 hidden md:table-header-group sticky top-3 bg-base-300 z-10">
          {/* Main Header Row */}
          <tr className="text-start text-neutral">
            {columns?.map((col, index) =>
              col.show ? (
                <th
                  key={col?.accessorKey}
                  align={col?.align || "left"}
                  colSpan={col?.accessorKey === "actions" ? actions?.length : 1}
                  style={{
                    width: col?.minWidth ? `${col?.minWidth}%` : "auto",
                  }}
                  className=""
                >
                  <div
                    className={`bg-primary/10 drop-shadow border-t border-b border-primary/20 h-16 flex items-center justify-start px-4 
                            ${
                              index === 0
                                ? "border-l rounded-tl-xl rounded-bl-xl"
                                : "border-l-0"
                            }
                           `}
                  >
                    {col?.header}
                  </div>
                </th>
              ) : null
            )}
            {actions.length > 0 && (
              <th
                key="actions"
                style={{ minWidth: "2%" }}
                colSpan={actions.length}
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
        <tbody className="block w-full md:table-row-group">
          {!isLoading
            ? sortedRows?.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="h-16 block md:table-row border md:border-0 md:border-b border-primary-content  text-sm font-semibold mb-4 md:mb-0 p-4 md:p-0 rounded-lg "
                >
                  {/* <===================================== Action for Mobile ====================================> */}
                  {windowInnerWidth < 768 && actions?.length > 0 && (
                    <td
                      // align={col?.align || "left"}
                      style={{
                        minWidth: "1%",
                      }}
                      colSpan={columns?.length + 1}
                      className="w-full p-2 flex items-center justify-center"
                    >
                      {actions
                        .filter((action) => {
                          return !action?.disableOn?.some((disable) => {
                            return (
                              row?.[disable?.accessorKey] === disable?.value
                            );
                          });
                        })
                        .map((action) => (
                          // CHECK PERMISSIONS
                          <React.Fragment key={action?.name}>
                            {hasPermission(action.permissions, permissions) ? (
                              <button
                                data-auto={`${dataAuto}_${action?.name}-${row?.id}`}
                                key={action?.name}
                                type="button"
                                onClick={() => {
                                  action?.handler?.(row);
                                }}
                              >
                                <action.Icon
                                  className={`text-xl ${
                                    action?.name === "delete"
                                      ? " text-red-500"
                                      : "text-primary"
                                  }`}
                                />
                              </button>
                            ) : (
                              <button
                                data-auto={`${dataAuto}_${action?.name}-${row?.id}`}
                                key={action?.name}
                                type="button"
                                onClick={() => {
                                  action?.handler?.(row);
                                }}
                              >
                                <action.Icon
                                  className={`text-xl ${
                                    action?.name === "delete"
                                      ? " text-red-500"
                                      : "text-primary"
                                  }`}
                                />
                              </button>
                            )}
                          </React.Fragment>
                        ))}
                    </td>
                  )}
                  {/* <===================================== Table Columns ===================================> */}
                  {columnsWithSort?.map((col, index) =>
                    col.show ? (
                      <td
                        key={col?.accessorKey}
                        align={col?.align || "left"}
                        style={{
                          width:
                            windowInnerWidth > 768
                              ? col?.minWidth
                                ? `${col?.minWidth}%`
                                : "auto"
                              : "100%",
                        }}
                        data-label={col?.["header"]}
                        className="block md:table-cell  border md:border-none border-gray-200"
                      >
                        <div
                          className={`drop-shadow border-t border-b border-primary/20 h-16 flex items-center justify-start px-4 
                            ${
                              index === 0
                                ? "border-l rounded-tl-xl rounded-bl-xl"
                                : "border-l-0"
                            }
                           `}
                        >
                          <div className="flex justify-between md:block">
                            <span className="font-normal md:hidden">
                              {col?.["header"]}
                            </span>
                            <span>
                              {col?.accessorFn
                                ? col?.accessorFn({
                                    row,
                                    value: row?.[col?.accessorKey],
                                  })
                                : row?.[col?.accessorKey] || "N/A"}
                            </span>
                          </div>
                        </div>
                      </td>
                    ) : null
                  )}
                  {/* <===================================== Action for Desktop ==================================> */}
                  {windowInnerWidth > 768 && actions?.length > 0 && (
                    <td className="hidden md:table-cell text-right">
                      <div className="flex justify-end space-x-4 h-16 drop-shadow border-t border-b border-r border-primary/20 rounded-tr-xl rounded-br-xl pr-5">
                        <ActionButtons
                          key={row?.id}
                          actions={actions}
                          row={row}
                          dataAuto={dataAuto}
                          permissions={permissions}
                        />
                      </div>
                    </td>
                  )}
                </tr>
              ))
            : Array.from({ length: 4 }).map((_, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0.5, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="border-b"
                >
                  {Array.from({ length: columns.length + 1 }).map(
                    (_, colIndex) => (
                      <td key={colIndex} className="py-4 px-6">
                        <div className="h-4 w-full bg-gray-300 animate-pulse rounded"></div>
                      </td>
                    )
                  )}
                </motion.tr>
              ))}
        </tbody>
        {/* <===================================== Table Footer ==================================> */}
        {showPagination && !isLoading && (
          <tfoot className="h-16 sticky bottom-3 bg-base-300 z-10">
            <tr className="text-sm font-semibold">
              <td colSpan={columns.length + 1}>
                <div className="w-full drop-shadow rounded-xl border border-primary/20 bg-primary/20 h-16 flex items-center justify-between px-4">
                  {/* Pagination Info */}
                  <div className="flex items-center gap-2">
                    <span className="font-bold">
                      Showing {0}-{0} of {totalData}
                    </span>
                  </div>

                  {/* Pagination Controls */}
                  <div className="flex items-center gap-4">
                    <label className="font-bold">
                      Rows Per Page:
                      <select
                        value={limit}
                        onChange={(e) =>
                          changeLimitHandler?.(parseInt(e.target.value))
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
                      limit={limit}
                      totalData={totalData}
                      changeHandler={paginationHandler}
                      dataAuto={dataAuto}
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
