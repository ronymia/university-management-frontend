import { ReactElement, ReactNode } from 'react';
import { IconType } from 'react-icons';

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
