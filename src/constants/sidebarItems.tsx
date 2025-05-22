import type { MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";

export const sidebarItems = ({ role }: { role: string }) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <UserOutlined />,
      children: [
        {
          label: "Account Profile",
          key: "profile",
        },
        {
          label: "Change Password",
          key: "change-password",
        },
      ],
    },
  ];

  const commonAdminSidebarItems: MenuProps["items"] = [
    {
      label: <Link href="/students">Manage Students</Link>,
      key: "manage-students",
      icon: <UserOutlined />,
    },
  ];

  if (role === "student") {
    return defaultSidebarItems;
  } else if (role === "admin") {
    return commonAdminSidebarItems;
  }
};
