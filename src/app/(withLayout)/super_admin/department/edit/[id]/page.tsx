"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import {
  useDepartmentQuery,
  useUpdateDepartmentMutation,
} from "@/redux/api/departmentApi";
import { managementDepartmentSchema } from "@/schemas/managementDepartment";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";
import { use } from "react";

type IDProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function EditDepartmentPage({ params }: IDProps) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const router = useRouter();
  const { data } = useDepartmentQuery(id);
  const [updateDepartment, updateResult] = useUpdateDepartmentMutation();

  const onSubmit = async (values: { title: string }) => {
    // message.loading("Updating.....");
    try {
      //   console.log(data);
      await updateDepartment({ id, body: values }).unwrap();
      message.success("Department updated successfully");
      router.push("/super_admin/department");
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  const defaultValues = {
    title: data?.title || "",
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
          {
            label: "department",
            link: "/super_admin/department",
          },
        ]}
      />

      <ActionBar title="Update Department"> </ActionBar>
      <Form
        submitHandler={onSubmit}
        resolver={yupResolver(managementDepartmentSchema)}
        defaultValues={defaultValues}
      >
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput id="title" name="title" label="Title" />
          </Col>
        </Row>
        <Button
          type="primary"
          htmlType="submit"
          disabled={updateResult.isLoading}
        >
          Update
        </Button>
      </Form>
    </div>
  );
}
