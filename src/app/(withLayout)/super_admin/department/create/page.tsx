"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddDepartmentMutation } from "@/redux/api/departmentApi";
import { managementDepartmentSchema } from "@/schemas/managementDepartment";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const CreateDepartmentPage = () => {
  const router = useRouter();

  const [addDepartment] = useAddDepartmentMutation();

  const onSubmit = async (data: any) => {
    message.loading("Creating.....");
    try {
      console.log(data);
      await addDepartment(data);
      message.success("Department added successfully");
      router.push("/super_admin/department");
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };
  const base = "super_admin";
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "department", link: `/${base}/department` },
        ]}
      />
      <h1>Create Department</h1>
      <Form
        submitHandler={onSubmit}
        resolver={yupResolver(managementDepartmentSchema)}
      >
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput
              id="title"
              name="title"
              label="Title"
              placeholder="Enter department title"
              required
            />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Create Department
        </Button>
      </Form>
    </div>
  );
};

export default CreateDepartmentPage;
