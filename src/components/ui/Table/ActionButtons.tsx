"use client";

import { hasPermission } from "@/utils/hasPermission";

export default function ActionButtons({ actions, row, dataAuto, permissions }) {
  return (
    <>
      {actions
        .filter(
          (action) =>
            !action?.disableOn?.some(
              (disable) => row?.[disable?.accessorKey] === disable?.value
            )
        )
        .map((action) =>
          hasPermission(action.permissions, permissions) ? (
            <button
              data-auto={`${dataAuto}_${action?.name}-${row?.id}`}
              key={action?.name}
              type="button"
              onClick={() => action?.handler?.(row)}
              aria-label={action.name}
            >
              <action.Icon
                className={`text-xl ${
                  action?.name === "delete" ? "text-red-500" : "text-primary"
                }`}
              />
            </button>
          ) : (
            <button
              data-auto={`${dataAuto}_${action?.name}-${row?.id}`}
              key={action?.name}
              type="button"
              onClick={() => action?.handler?.(row)}
              aria-label={action.name}
            >
              <action.Icon
                className={`text-xl ${
                  action?.name === "delete" ? "text-red-500" : "text-primary"
                }`}
              />
            </button>
          )
        )}
    </>
  );
}
