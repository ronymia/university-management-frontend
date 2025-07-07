'use client';

import { getUserInfo } from '@/services/auth.service';
import React, { JSX, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaRegUser, FaTableCells } from 'react-icons/fa6';
import { AiOutlineAppstore } from 'react-icons/ai';
import SidebarGenerator from '../SidebarGenerator';
import UserAvatar from '../Avatar/CustomUserAvatar';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { collapseSidebar, expandSidebar, toggleSidebar } from '@/redux/slice/globalState';
import useDeviceWith from '@/hooks/useDeviceWith';
import { MdOutlineMenuOpen } from 'react-icons/md';
import { USER_ROLE } from '@/enums/global';

export interface IMenuItems {
    icon: React.ElementType;
    label: string | JSX.Element;
    path: string;
    show: boolean;
    subItems?: IMenuItems[];
}

export default function Sidebar() {
    const windowWidth = useDeviceWith();
    const { isSidebarCollapsed, isHovering } = useAppSelector((state) => state.globalState);

    const appDispatch = useAppDispatch();

    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const { role } = (getUserInfo() as any) || {};
        setRole(role);
    }, []);

    const defaultSidebarItems: IMenuItems[] = [
        // DEFAULT USER SIDEBAR
        {
            icon: FaRegUser,
            label: 'Profile',
            path: 'profile',
            show: true,
            subItems: [
                {
                    icon: FaRegUser,
                    label: 'Account',
                    path: `/profile`,
                    show: true,
                    subItems: [],
                },
                {
                    icon: FaRegUser,
                    label: 'Change Password',
                    path: `/auth/change-password`,
                    show: true,
                    subItems: [],
                },
            ],
        },
    ];

    const commonAdminSidebarItems: IMenuItems[] = [
        // DEFAULT ADMIN SIDEBAR
        {
            icon: FaTableCells,
            label: 'Manage Students',
            path: `/${role}/manage-student`,
            show: true,
            subItems: [],
        },
        {
            icon: FaTableCells,
            label: 'Manage Faculty',
            path: `/${role}/manage-faculty`,
            show: true,
            subItems: [],
        },
    ];

    const adminSidebarItems: IMenuItems[] = [
        ...defaultSidebarItems,
        ...commonAdminSidebarItems,
        // ADMIN SIDEBAR
        {
            icon: FaTableCells,
            label: 'Manage academic',
            path: `manage-academic`,
            show: role === USER_ROLE.ADMIN,
            subItems: [
                {
                    icon: FaTableCells,
                    label: 'Faculties',
                    path: `/${role}/academic/faculty`,
                    show: role === USER_ROLE.ADMIN,
                    subItems: [],
                },
                {
                    icon: FaTableCells,
                    label: 'Departments',
                    path: `/${role}/academic/department`,
                    show: role === USER_ROLE.ADMIN,
                    subItems: [],
                },
                {
                    icon: FaTableCells,
                    label: 'Semesters',
                    path: `/${role}/academic/semester`,
                    show: role === USER_ROLE.ADMIN,
                    subItems: [],
                },
            ],
        },
        {
            icon: AiOutlineAppstore,
            label: 'Management',
            path: `management`,
            show: true,
            subItems: [
                // {
                //   icon: FaTableCells,
                //   label: "Departments",
                //   path: `/${role}/department`,
                //   show: true,
                //   subItems: [],
                // },
                {
                    icon: FaTableCells,
                    label: 'Buildings',
                    path: `/${role}/building`,
                    show: true,
                    subItems: [],
                },
                {
                    icon: FaTableCells,
                    label: 'Rooms',
                    path: `/${role}/room`,
                    show: true,
                    subItems: [],
                },
                {
                    icon: FaTableCells,
                    label: 'Courses',
                    path: `/${role}/course`,
                    show: true,
                    subItems: [],
                },
                {
                    icon: FaTableCells,
                    label: 'Semester registration',
                    path: `/${role}/semester-registration`,
                    show: true,
                    subItems: [],
                },
                {
                    icon: FaTableCells,
                    label: 'Offered courses',
                    path: `/${role}/offered-course`,
                    show: true,
                    subItems: [],
                },
                {
                    icon: FaTableCells,
                    label: 'Course sections',
                    path: `/${role}/offered-course-section`,
                    show: true,
                    subItems: [],
                },
            ],
        },
    ];
    const superAdminSidebarItems: IMenuItems[] = [
        ...defaultSidebarItems,
        ...commonAdminSidebarItems,
        // SUPER ADMIN SIDEBAR
        {
            icon: FaTableCells,
            label: 'Manage Admin',
            path: `/${role}/admin`,
            show: role === USER_ROLE.SUPER_ADMIN,
            subItems: [],
        },
        {
            icon: FaTableCells,
            label: 'Manage User',
            path: `/${role}/user`,
            show: role === USER_ROLE.SUPER_ADMIN,
            subItems: [],
        },
        {
            icon: FaTableCells,
            label: 'Management',
            path: `management`,
            show: role === USER_ROLE.SUPER_ADMIN,
            subItems: [
                {
                    icon: FaTableCells,
                    label: 'Departments',
                    path: `/${role}/department`,
                    show: true,
                    subItems: [],
                },
            ],
        },
    ];

    const facultySidebarItems: IMenuItems[] = [
        ...defaultSidebarItems, // FACULTY SIDEBAR
        {
            icon: FaTableCells,
            label: 'Courses',
            path: `/${role}/courses`,
            show: role === USER_ROLE.FACULTY,
            subItems: [],
        },
    ];
    const studentSidebarItems: IMenuItems[] = [
        ...defaultSidebarItems,
        // STUDENT SIDEBAR
        {
            icon: FaTableCells,
            label: 'Courses',
            path: `/${role}/courses`,
            show: role === USER_ROLE.STUDENT,
            subItems: [],
        },
        {
            icon: FaTableCells,
            label: 'Course schedules',
            path: `/${role}/courses/schedule`,
            show: role === USER_ROLE.STUDENT,
            subItems: [],
        },
        {
            icon: FaTableCells,
            label: 'Registration',
            path: `/${role}/registration`,
            show: role === USER_ROLE.STUDENT,
            subItems: [],
        },
        {
            icon: FaTableCells,
            label: 'Payment',
            path: `/${role}/payment`,
            show: role === USER_ROLE.STUDENT,
            subItems: [],
        },
        {
            icon: FaTableCells,
            label: 'Academic report',
            path: `/${role}/academic-report`,
            show: role === USER_ROLE.STUDENT,
            subItems: [],
        },
    ];

    const sidebarItems =
        role === USER_ROLE.SUPER_ADMIN
            ? superAdminSidebarItems
            : role === USER_ROLE.ADMIN
              ? adminSidebarItems
              : role === USER_ROLE.FACULTY
                ? facultySidebarItems
                : role === USER_ROLE.STUDENT
                  ? studentSidebarItems
                  : defaultSidebarItems;

    return (
        <motion.aside
            animate={{
                width: isSidebarCollapsed ? (windowWidth < 768 ? 0 : 60) : 240,
            }}
            transition={{ duration: 0.3, type: 'tween' }}
            className={`flex flex-col shadow-lg relative bg-base-300 text-primary rounded-2xl h-full ${
                !isSidebarCollapsed ? 'border-r-2 border-gray-300' : ''
            }`}
            onHoverStart={() => {
                if (isHovering) appDispatch(expandSidebar());
            }}
            onHoverEnd={() => {
                if (isHovering) appDispatch(collapseSidebar());
            }}
        >
            {/* top */}
            <div className="h-16 border-b-2 border-gray-300 flex items-center justify-start md:justify-center gap-y-1 relative">
                {isSidebarCollapsed ? (
                    <UserAvatar size="10" />
                ) : (
                    <h1 className={`my-5 font-bold ml-2 md:ml-0`}>University Management</h1>
                )}
                {windowWidth < 768 && (
                    <button
                        type="button"
                        onClick={() => appDispatch(toggleSidebar())}
                        className={`absolute right-5 top-1/2 -translate-y-1/2 translate-x-1/2 bg-[#d9d9d9] rounded-full p-0.5 border border-primary/10`}
                    >
                        <MdOutlineMenuOpen size={34} />
                    </button>
                )}
            </div>

            {/* SIDEBAR ITEMS */}
            <div
                className={`flex flex-col gap-1 mt-1 ${
                    isSidebarCollapsed ? 'items-center justify-center' : 'px-3'
                }`}
            >
                {sidebarItems.map((item) => (
                    <SidebarGenerator
                        key={item.path}
                        icon={item.icon}
                        label={item.label}
                        path={item.path}
                        show={item.show}
                        isSidebarCollapsed={isSidebarCollapsed}
                        subItems={item.subItems}
                    />
                ))}
            </div>
        </motion.aside>
    );
}
