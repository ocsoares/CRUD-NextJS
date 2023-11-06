import React from "react";
import TextField from "@mui/material/TextField";
import { Control, Controller, FieldValues } from "react-hook-form";
import { InputAdornment } from "@mui/material";
import { PersonSearch } from "@mui/icons-material";

interface ISearchFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: string;
  error?: boolean;
  helperText?: string;
}

const SearchField = React.forwardRef(function SearchField(
  { control, name, error, helperText }: ISearchFieldProps<any>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ref,
) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <TextField
          error={error}
          helperText={helperText}
          color="secondary"
          autoComplete="none"
          fullWidth
          id="search"
          label="Search..."
          type="text"
          {...field}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonSearch />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
});

SearchField.displayName = "SearchField";

export default SearchField;
