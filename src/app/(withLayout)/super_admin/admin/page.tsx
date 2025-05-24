import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { Button } from "antd";
import Link from "next/link";

const ManageAdminPage = () => {
  return (
    <>
      <UMBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
        ]}
      />
      <ActionBar title="Admin List">
        <Link href="/super_admin/admin/create">
          <Button type="primary">Create Admin</Button>
        </Link>
      </ActionBar>
    </>
  );
};

export default ManageAdminPage;
