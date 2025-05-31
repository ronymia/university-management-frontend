import { Button } from "antd";
import React from "react";

export default function FormAction({ htmlType, disabled, cancelHandler }: any) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "end",
        gap: "10px",
      }}
    >
      <Button
        size="large"
        variant="outlined"
        disabled={disabled}
        onClick={cancelHandler}
      >
        Cancel
      </Button>
      <Button
        htmlType={"submit"}
        disabled={disabled}
        size="large"
        type="primary"
        variant="filled"
      >
        Submit
      </Button>
    </div>
  );
}
