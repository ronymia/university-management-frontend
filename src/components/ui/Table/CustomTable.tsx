"use client";

import React from "react";
import { IconType } from "react-icons";
import { motion } from "motion/react";
import useDeviceWith from "@/hooks/useDeviceWith";
import { hasPermission } from "@/utils/hasPermission";
import { getFromLocalStorage } from "@/utils/local-storage";
import Pagination from "./Pagination";

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
  limit,
  totalData,
}: ICustomTableProps) {
  // GET DEVICE WIDTH
  const windowInnerWidth = useDeviceWith();

  // GET PERMISSIONS
  const permissions = getFromLocalStorage("permissions") || [];

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
        <thead className="h-16 hidden md:table-header-group">
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
            {actions?.length > 0 && (
              <th
                key="actions"
                style={{ minWidth: "2%" }}
                colSpan={actions?.length}
                className=""
              >
                <div
                  className={`bg-primary/10 flex items-center justify-end h-16 drop-shadow border-t border-b border-r border-primary/20 rounded-tr-xl rounded-br-xl pr-5`}
                >
                  Action
                </div>
              </th>
            )}
          </tr>
        </thead>

        {/* <===================================== Table Body ===================================> */}
        <tbody className="block w-full md:table-row-group">
          {!isLoading
            ? rows?.map((row, rowIndex) => (
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
                  {columns?.map((col, index) =>
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
                        {actions
                          ?.filter((action) => {
                            return !action?.disableOn?.some(
                              (disable: { [key: string]: any }) => {
                                return (
                                  row?.[disable?.accessorKey] === disable?.value
                                );
                              }
                            );
                          })
                          .map((action) => (
                            // CHECK PERMISSIONS
                            <React.Fragment key={action?.name}>
                              {hasPermission(
                                action.permissions,
                                permissions
                              ) ? (
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
      </table>
      {showPagination ? (
        <Pagination
          limit={limit}
          totalData={totalData}
          changeHandler={paginationHandler}
          dataAuto={dataAuto}
        />
      ) : null}
    </>
  );
}
