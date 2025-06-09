import React from "react";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

export default function CustomFilterButton() {
  return (
    <button
      type="button"
      className={`flex gap-2 items-center justify-center rounded-full bg-primary px-3 py-2 text-base-300`}
    >
      <HiAdjustmentsHorizontal size={22} />
      Filter
    </button>
  );
}
