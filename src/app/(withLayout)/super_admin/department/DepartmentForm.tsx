"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormAction from "@/components/ui/Buttons/FormAction";
import {
  useAddDepartmentMutation,
  useDepartmentQuery,
  useUpdateDepartmentMutation,
} from "@/redux/api/departmentApi";
import { managementDepartmentSchema } from "@/schemas/managementDepartment";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Row, message } from "antd";

type IDProps = {
  popupCloseHandler: () => void;
  defaultData: any;
  id: string;
};

export default function DepartmentForm({ id, popupCloseHandler }: IDProps) {
  const { data } = useDepartmentQuery(id, { skip: !id });
  const [addDepartment, createResult] = useAddDepartmentMutation();
  const [updateDepartment, updateResult] = useUpdateDepartmentMutation();

  const onSubmit = async (values: { title: string }) => {
    try {
      if (id) {
        await updateDepartment({ id, body: values }).unwrap();
      } else {
        await addDepartment(values);
      }
    } catch (err: any) {
      console.error(err.message);
      // message.error(err.message);
    }
  };

  const defaultValues = {
    title: data?.title || "",
  };

  // if (isLoading) {

  // }
  return (
    <>
      <Form
        submitHandler={onSubmit}
        resolver={yupResolver(managementDepartmentSchema)}
        defaultValues={defaultValues}
        // className={}
      >
        <Row
          gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}
          // style={{
          //   width: "100%",
          // }}
        >
          <Col style={{ margin: "10px 0", width: "100%" }}>
            <FormInput id="title" name="title" label="Title" />
          </Col>
        </Row>

        <FormAction
          disabled={updateResult.isLoading || createResult.isLoading}
          cancelHandler={popupCloseHandler}
        />
      </Form>
    </>
  );
}
