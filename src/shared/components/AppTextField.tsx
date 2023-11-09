// NextJS Error Import !!!
// ----------------------------
// import { Grid, TextField } from "@mui/material";

import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Control, Controller, FieldValues } from "react-hook-form";

interface IAppTextFieldProps<T extends FieldValues> {
  readonly control: Control<T>;
  readonly name: string;
  readonly defaultValue?: string;
  readonly sm?: number;
  readonly autoFocus?: boolean;
  readonly error?: boolean;
  readonly helperText?: string;
  readonly id: string;
  readonly type: "text" | "email" | "password";
  readonly label: string;
}

const AppTextField = React.forwardRef(function AppTextField(
  {
    control,
    name,
    defaultValue,
    sm,
    autoFocus = false,
    error = false,
    helperText = "",
    id,
    type,
    label,
  }: IAppTextFieldProps<any>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ref,
) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: "This is required",
      }}
      defaultValue={defaultValue}
      // field, fieldState: { invalid, error }
      render={({ field }) => (
        <Grid item xs={12} sm={sm}>
          <TextField
            autoFocus={autoFocus}
            error={error}
            helperText={helperText}
            color="secondary"
            autoComplete="none"
            required
            fullWidth
            id={id}
            type={type}
            label={label}
            {...field}
          />
        </Grid>
      )}
    />
  );
});

AppTextField.displayName = "AppTextField";

export default AppTextField;
