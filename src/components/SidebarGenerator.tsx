"use client";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IMenuItems } from "./ui/Sidebar";
import { usePathname } from "next/navigation";

interface SidebarItemProps extends IMenuItems {
  isSidebarCollapsed: boolean;
  isSubMenu?: boolean;
}

export default function SidebarGenerator({
  icon: Icon,
  label,
  path,
  show,
  subItems,
  isSidebarCollapsed,
  isSubMenu = false,
}: SidebarItemProps) {
  const pathname = usePathname();
  const hasChildren = subItems && subItems.length > 0;
  const [isOpen, setIsOpen] = useState(false);

  // IF THE SUB MENU PAGE IS ACTIVE THEN OPEN THE SUB MENU
  useEffect(() => {
    if (subItems?.some((item) => item.path === pathname)) {
      setIsOpen(true);
    }
  }, [pathname, path]);

  const handleClick = () => {
    if (hasChildren) setIsOpen((prev) => !prev);
  };

  const isChildActive = subItems?.some((item) =>
    pathname.startsWith(item.path)
  );
  const isActive = pathname === path;

  if (!show) return null;
  return (
    <>
      {hasChildren ? (
        <button
          className={`flex items-center gap-2.5 p-1.5 hover:bg-gray-300 transition-colors cursor-pointer rounded-full 
             ${isChildActive ? "bg-primary text-base-300" : ""}
            `}
          onClick={handleClick}
        >
          <AnimatePresence key={label} initial={false}>
            <span className={`rounded-full bg-gray-300 p-2.5`}>
              {<Icon className={`text-primary`} />}
            </span>
            {!isSidebarCollapsed && (
              <motion.span
                key={label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="whitespace-nowrap  font-medium"
              >
                {label}
              </motion.span>
            )}
            {/* <IoIosArrowUp  /> */}
          </AnimatePresence>
        </button>
      ) : (
        <Link
          href={path}
          className={`flex items-center justify-start gap-2.5 p-1.5 hover:bg-gray-300 hover:rounded-full cursor-pointer text-base
            ${
              isActive
                ? "border-l-4 border-primary font-medium bg-primary/30"
                : ""
            }
            ${
              isSubMenu && !isActive ? "border-l-4 border-gray-300 text-sm" : ""
            }
          `}
        >
          {isSubMenu ? (
            <div
              className={`rounded-full bg-gray-300 w-3 h-3 ${
                isActive && "bg-primary"
              }`}
            />
          ) : (
            <span className={`rounded-full bg-gray-300 p-2.5`}>{<Icon />}</span>
          )}
          {!isSidebarCollapsed && <span>{label}</span>}
        </Link>
      )}

      <AnimatePresence initial={false}>
        {hasChildren && isOpen && (
          <motion.div
            key="submenu"
            className={`flex flex-col ${isSidebarCollapsed ? "" : "pl-5"}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, type: "tween" }}
          >
            {subItems.map((child) =>
              child.show ? (
                <SidebarGenerator
                  key={child.path}
                  {...child}
                  isSidebarCollapsed={isSidebarCollapsed}
                  isSubMenu={true}
                />
              ) : null
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
