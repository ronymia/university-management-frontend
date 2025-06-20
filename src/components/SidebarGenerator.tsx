"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IMenuItems } from "./ui/Sidebar";
import { usePathname } from "next/navigation";
import { toggleSidebar } from "@/redux/slice/globalState";
import { useAppDispatch } from "@/redux/hooks";
import useDeviceWith from "@/hooks/useDeviceWith";
import { IoIosArrowUp } from "react-icons/io";

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
  const windowInnerWidth = useDeviceWith();
  const appDispatch = useAppDispatch();
  const pathname = usePathname();
  const hasChildren = subItems && subItems.length > 0;

  const [detailsOpen, setDetailsOpen] = useState(false);

  // IF THE SUB MENU PAGE IS ACTIVE THEN OPEN THE SUB MENU
  useEffect(() => {
    if (subItems?.some((item) => pathname.startsWith(item.path))) {
      setDetailsOpen(true);
    }
  }, [pathname, subItems]);

  const handleLinkClick = () => {
    if (windowInnerWidth < 768) appDispatch(toggleSidebar());
  };

  const isChildActive = subItems?.some((item) =>
    pathname.startsWith(item.path)
  );
  const isActive = pathname === path;

  if (!show) return null;

  return (
    <>
      {hasChildren ? (
        <details
          className="group"
          open={detailsOpen}
          onToggle={(e) => setDetailsOpen(e.currentTarget.open)}
        >
          <summary
            className={`flex items-center gap-2.5 p-1.5 hover:bg-gray-300 transition-colors cursor-pointer rounded-full list-none
            ${isChildActive ? "bg-primary text-base-300" : ""}
            `}
          >
            <span className={`rounded-full bg-gray-300 p-2.5`}>
              {<Icon className={`text-primary`} />}
            </span>
            {!isSidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="whitespace-nowrap font-medium flex-grow"
              >
                {label}
              </motion.span>
            )}
            {!isSidebarCollapsed && (
              <IoIosArrowUp
                className={`transform transition-transform duration-200 ${
                  detailsOpen ? "rotate-0" : "rotate-180"
                }`}
              />
            )}
          </summary>

          <AnimatePresence initial={false}>
            {detailsOpen && (
              <motion.div
                key="submenu-content"
                className={`flex flex-col ${isSidebarCollapsed ? "" : "pl-5"}`}
                // Add layout prop for smoother height transitions
                layout
                initial={{ height: 0, opacity: 0 }}
                // Animate height to 'auto' for opening
                animate={{ height: "auto", opacity: 1 }}
                // Animate height to 0 for closing
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }} // Use easeInOut for smoother feel
              >
                {subItems?.map((child) =>
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
        </details>
      ) : (
        <Link
          href={path}
          onClick={handleLinkClick}
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
    </>
  );
}
