"use client";

import { Box, Checkbox, FormControlLabel, Grid, Stack } from "@mui/material";
import AppTextField from "../../../../../../shared/components/AppTextField";
import { AppButton } from "../../../../../../shared/components/AppButton";
import { AuthTextLink } from "../../components/AuthTextLink";
import { useAuthLogin } from "../hooks/useAuthLogin";
import { AppAlert } from "@/shared/components/AppAlert";

export function AuthLoginForm() {
  const {
    handleSubmit,
    handleSubmitData,
    control,
    errors,
    isSubmitting,
    register,
    handleCheckboxChange,
    logged,
    invalidCredentials,
    invalidCredentialsMessage,
    tooManyRequestError,
    tooManyRequestErrorMessage,
    apiFailed,
    apiFailedMessage,
  } = useAuthLogin();

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(handleSubmitData)}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={4}>
          <AppTextField
            control={control}
            autoFocus={true}
            error={
              errors.email || invalidCredentials || tooManyRequestError
                ? true
                : false
            }
            helperText={
              errors.email?.message ||
              invalidCredentialsMessage ||
              tooManyRequestErrorMessage
            }
            id="email"
            type="email"
            label="Email"
            {...register("email")}
          />
          <AppTextField
            control={control}
            error={
              errors.password || invalidCredentials || tooManyRequestError
                ? true
                : false
            }
            helperText={
              errors.password?.message ||
              invalidCredentialsMessage ||
              tooManyRequestErrorMessage
            }
            id="password"
            type="password"
            label="Senha"
            {...register("password")}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="secondary" />}
            label="Lembrar-me"
            sx={{ mt: 1, ml: 2.6 }}
            onChange={handleCheckboxChange}
          />
        </Grid>

        <AppButton disabled={isSubmitting || logged} text="Login" />
        <AuthTextLink
          text="Não tem uma conta? "
          link="signup"
          textLink="Cadastre-se"
        />
      </Box>
      <Stack spacing={2} sx={{ position: "absolute", top: 70, right: 0 }}>
        {apiFailed && (
          <AppAlert
            showAlert={!logged && apiFailed}
            severity="error"
            title="Erro"
            message={apiFailedMessage}
          />
        )}

        <AppAlert
          showAlert={logged && !invalidCredentials}
          color="success"
          severity="success"
          title="Sucesso"
          message="Você logou com sucesso no sistema !"
        />

        <AppAlert
          showAlert={logged && !invalidCredentials}
          timeout={3000}
          severity="info"
          title="Redirecionando"
          message="Você será redirecionado para"
          messageHTML={<strong> admin/users</strong>}
        />
      </Stack>
    </>
  );
}
