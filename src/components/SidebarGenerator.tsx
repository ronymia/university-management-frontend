'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IMenuItems } from './ui/Sidebar';
import { usePathname } from 'next/navigation';
import { toggleSidebar } from '@/redux/slice/globalState';
import { useAppDispatch } from '@/redux/hooks';
import useDeviceWith from '@/hooks/useDeviceWith';
import { IoIosArrowUp } from 'react-icons/io';

interface SidebarItemProps extends IMenuItems {
    isSidebarCollapsed: boolean;
}

export default function SidebarGenerator({
    icon: Icon,
    label,
    path,
    show,
    subItems,
    isSidebarCollapsed,
}: SidebarItemProps) {
    // GET WINDOW WIDTH
    const windowInnerWidth = useDeviceWith();
    // REDUX STATE DISPATCH
    const appDispatch = useAppDispatch();
    // GET CURRENT PATH
    const pathname = usePathname();
    // SUBMENU OPEN STATE
    const [detailsOpen, setDetailsOpen] = useState(false);

    // CHECK IF MENU HAS SUBMENU
    const hasChildren = subItems && subItems.length > 0;

    // HANDLE LINK CLICK TOGGLE SIDEBAR
    const handleLinkClick = () => {
        if (windowInnerWidth < 768) appDispatch(toggleSidebar());
    };

    // GET ACTIVE SUBMENU
    const isSubmenuActive = subItems?.some((menu) => menu.path === pathname);

    useEffect(() => {
        if (isSubmenuActive) setDetailsOpen(true);
        return () => {};
    }, [isSubmenuActive]);

    // HANDLE MENU VISIBILITY
    if (!show) return null;

    // RENDER
    return (
        <>
            {hasChildren ? (
                <details
                    open={detailsOpen}
                    onToggle={(e) => setDetailsOpen(e.currentTarget.open)}
                    className={''}
                >
                    <summary
                        className={`flex items-center gap-2.5 p-1 transition-colors cursor-pointer rounded-md drop-shadow-md group mb-1
                            ${isSubmenuActive ? 'bg-primary text-base-300' : 'hover:bg-gray-300'}
                            `}
                    >
                        <span
                            className={`rounded-full bg-gray-300 p-2.5 ${isSubmenuActive ? 'bg-base-300 text-primary' : 'group-hover:bg-primary group-hover:text-base-300'}`}
                        >
                            {<Icon />}
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
                                    detailsOpen ? 'rotate-0' : 'rotate-180'
                                }`}
                            />
                        )}
                    </summary>

                    {/* SUB MENU ITEMS  */}
                    <AnimatePresence initial={false}>
                        {detailsOpen && (
                            <motion.div
                                key="submenu-content"
                                className={`flex flex-col ${isSidebarCollapsed ? '' : 'pl-5'}`}
                                // Add layout prop for smoother height transitions
                                layout
                                initial={{ height: 0, opacity: 0 }}
                                // Animate height to 'auto' for opening
                                animate={{ height: 'auto', opacity: 1 }}
                                // Animate height to 0 for closing
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.1, ease: 'easeInOut' }}
                            >
                                {subItems?.map((child) =>
                                    child.show ? (
                                        <Link
                                            key={child.path}
                                            href={child?.path}
                                            onClick={handleLinkClick}
                                            className={`flex items-center justify-start gap-2.5 p-1.5 cursor-pointer text-sm border-l-2 drop-shadow-md group
                                                        ${child?.path === pathname ? 'text-primary font-medium bg-primary/10 rounded-md border-l-primary' : 'hover:bg-gray-300  border-l-gray-300'}
                                                      `}
                                        >
                                            <div
                                                className={`rounded-full w-3 h-3 ${
                                                    child?.path === pathname
                                                        ? 'bg-primary'
                                                        : 'hover:bg-primary bg-gray-300 group-hover:bg-primary group-hover:text-base-300'
                                                }`}
                                            />
                                            {!isSidebarCollapsed && <span>{child?.label}</span>}
                                        </Link>
                                    ) : null,
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </details>
            ) : (
                <Link
                    href={path}
                    onClick={handleLinkClick}
                    className={`flex items-center justify-start gap-2.5 p-1 cursor-pointer text-base drop-shadow-md group
                                ${pathname === path ? 'text-base-300 font-medium bg-primary rounded-md' : 'hover:bg-gray-300 hover:rounded-md'}
                              `}
                >
                    <span
                        className={`rounded-full bg-gray-300 p-2.5
                                ${pathname === path ? 'text-primary' : 'group-hover:bg-primary group-hover:text-base-300'}
                            `}
                    >
                        {<Icon />}
                    </span>
                    {!isSidebarCollapsed && <span>{label}</span>}
                </Link>
            )}
        </>
    );
}
