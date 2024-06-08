import { TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export const InputTextfield = ({ name, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...field}
          {...otherProps}
          error={errors[name]?.message}
          helperText={errors[name] ? errors[name]?.message : null}
        />
      )}
    />
  );
};
