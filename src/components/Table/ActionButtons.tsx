'use client';

import Link from 'next/link';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { BiShow } from 'react-icons/bi';

interface IActionButtonsProps {
    actions: any;
    row: any;
    dataAuto: string;
    permissions?: any;
}

export default function ActionButtons({ actions, row, dataAuto }: IActionButtonsProps) {
    return (
        <>
            {actions
                .filter(
                    (action: any) =>
                        !action?.disableOn?.some(
                            (disable: any) => row?.[disable?.accessorKey] === disable?.value,
                        ),
                )
                .map((action: any) => {
                    const isPermitted = true;
                    const Icon: any =
                        action?.name === 'edit'
                            ? FiEdit
                            : action?.name === 'delete'
                              ? MdDelete
                              : action?.name === 'view'
                                ? BiShow
                                : undefined;
                    const dataAutoAttr = `${dataAuto}_${action?.name}-${row?.id}` || '';
                    const iconClass = `text-3xl p-1 bg-gray-50 rounded border border-primary/20 drop-shadow cursor-pointer ${
                        action?.name === 'delete' ? 'text-red-500' : 'text-primary'
                    }`;
                    if (!isPermitted) return null;

                    if (action?.type === 'link' && action?.href) {
                        // Render a Link
                        return (
                            <Link
                                href={
                                    typeof action.href === 'function'
                                        ? action.href(row)
                                        : action.href
                                }
                                key={action?.name}
                                data-auto={dataAutoAttr}
                                aria-label={action.name}
                            >
                                {action?.Icon ? (
                                    <action.Icon className={iconClass} />
                                ) : Icon ? (
                                    <Icon className={iconClass} />
                                ) : null}
                            </Link>
                        );
                    }

                    // Default: Render a Button
                    return (
                        <button
                            data-auto={dataAutoAttr}
                            key={action?.name}
                            type="button"
                            onClick={() => action?.handler?.(row)}
                            aria-label={action.name}
                            // className={`bg-gray-100 transition border-gray-500`}
                        >
                            {action?.Icon ? (
                                <action.Icon className={iconClass} />
                            ) : (
                                <Icon className={iconClass} />
                            )}
                        </button>
                    );
                })}
        </>
    );
}
