"use client";
import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
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

export default function FormInput({
  name,
  type,
  size,
  value,
  id,
  placeholder,
  required = true,
  label,
}: IInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <>
      {/* LABEL */}
      <label
        htmlFor={id}
        style={{
          fontWeight: 500,
          fontSize: 14,
          color: "#2f2a2a",
          display: "inline-block",
          marginBottom: 4,
        }}
      >
        {label}
        {required && <span style={{ color: "red", paddingLeft: 2 }}>*</span>}
      </label>

      {/* INPUT FIELD */}
      <Controller
        control={control}
        name={`${name}`}
        render={({ field }) =>
          type === "password" ? (
            <Input.Password
              style={{ marginTop: "6px", marginBottom: "5px", height: "48px" }}
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
            />
          ) : (
            <Input
              style={{
                marginTop: "6px",
                marginBottom: "5px",
                height: "48px",
                width: "100%",
              }}
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
            />
          )
        }
      />
      {/* ERROR MESSAGE */}
      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  );
}
