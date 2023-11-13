import React from "react";
import TextField from "@mui/material/TextField";
import { Control, Controller, FieldValues } from "react-hook-form";
import { IconButton, InputAdornment } from "@mui/material";
import { Clear, PersonSearch } from "@mui/icons-material";

interface ISearchFieldProps<T extends FieldValues> {
  readonly control: Control<T>;
  readonly name: string;
  readonly error?: boolean;
  readonly helperText?: string;
  readonly onClickToClean: () => void;
}

const SearchField = React.forwardRef(function SearchField(
  { control, name, error, helperText, onClickToClean }: ISearchFieldProps<any>,
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
          label="Pesquisar por nome de usuário..."
          type="text"
          {...field}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonSearch />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear and reset search field"
                  onClick={onClickToClean}
                  edge="end"
                >
                  <Clear />
                </IconButton>
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
