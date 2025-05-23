"use client";
import { Input } from "antd";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IInputProps {
  type?: string;
  label?: string;
  id: string;
  name: string;
  value?: string | string[] | undefined;
  size?: "small" | "large";
  placeholder?: string;
  required?: boolean;
  validation?: object;
}

const FormInput = ({
  name,
  type,
  size,
  value,
  id,
  placeholder,
  validation,
  label,
}: IInputProps) => {
  const { control } = useFormContext();

  return (
    <>
      {label ? label : null}
      <Controller
        control={control}
        name={`${name}`}
        render={({ field }) =>
          type === "password" ? (
            <Input.Password
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
            />
          ) : (
            <Input
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
            />
          )
        }
      />
    </>
  );
};

export default FormInput;
