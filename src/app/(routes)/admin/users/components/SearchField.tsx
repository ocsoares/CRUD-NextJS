import React from "react";
import TextField from "@mui/material/TextField";
import { Control, Controller, FieldValues } from "react-hook-form";
import { IconButton, InputAdornment } from "@mui/material";
import { Clear, PersonSearch } from "@mui/icons-material";

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
  // Integrar aq e CONFIGURAR em OUTRO Lugar !!!
  const handleClearAndResetSearchField = () => {
    console.log("Clicado pra LIMPAR e RESETAR !!!");
  };

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
                  onClick={handleClearAndResetSearchField}
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
