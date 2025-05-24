import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { getUserInfo } from "@/services/auth.service";
import { Button } from "antd";
import Link from "next/link";

const ManageStudentPage = () => {
  const { role } = getUserInfo() as any;
  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
        ]}
      />
      <ActionBar title="Student List">
        {/* <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        /> */}
        <div>
          <Link href="/super_admin/manage-student/create">
            <Button type="primary">Create</Button>
          </Link>
          {/* {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              style={{ margin: "0px 5px" }}
              type="primary"
              onClick={resetFilters}
            >
              <ReloadOutlined />
            </Button>
          )} */}
        </div>
      </ActionBar>
    </div>
  );
};

export default ManageStudentPage;
