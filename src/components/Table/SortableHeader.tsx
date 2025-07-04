import { IColumn } from './CustomTable';

const SortableHeader = ({
    column,
    isFirstColumn,
    isLastColumn,
}: {
    column: IColumn;
    isFirstColumn: boolean;
    isLastColumn: boolean;
}) => {
    const handleSort = () => {
        if (!column.sortable || !column.onSort) return;

        const newDirection = column.sortDirection === 'asc' ? 'desc' : 'asc';
        column.onSort(column.accessorKey, newDirection);
    };

    return (
        <th
            align={column.align || 'left'}
            style={{
                width: column.minWidth ? `${column.minWidth}%` : 'auto',
            }}
            className={`
          ${isFirstColumn ? 'rounded-tl-xl rounded-bl-xl' : ''}
          ${isLastColumn ? 'rounded-tr-xl rounded-br-xl' : ''}
          ${column.sortable ? 'cursor-pointer hover:bg-primary/20' : ''}
        `}
            onClick={handleSort}
        >
            <div
                className={`bg-primary/10 drop-shadow border-t border-b border-primary/20 h-16 flex items-center px-4`}
            >
                {column.header}
                {column.sortable && (
                    <span className="ml-2">
                        {column.sortDirection === 'asc'
                            ? '↑'
                            : column.sortDirection === 'desc'
                              ? '↓'
                              : '↕'}
                    </span>
                )}
            </div>
        </th>
    );
};

export default SortableHeader;
