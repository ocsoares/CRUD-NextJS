import { AppButton } from "@/shared/components/AppButton";
import AppTextField from "@/shared/components/AppTextField";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import { useUpdateUser } from "../hooks/useUpdateUser";

interface IUpdateUserDialogProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly onClickToCancel: () => void;
  readonly defaultValueFirstName: string;
  readonly defaultValueLastName: string;
  readonly defaultValueEmail: string;
}

export function UpdateUserDialog({
  open,
  onClose,
  onClickToCancel,
  defaultValueFirstName,
  defaultValueLastName,
  defaultValueEmail,
}: IUpdateUserDialogProps) {
  const {
    handleSubmit,
    handleSubmitData,
    control,
    errors,
    register,
    formSent,
    emailExists,
    emailExistsMessage,
  } = useUpdateUser();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-update-user"
      aria-describedby="dialog-to-update-user"
    >
      <DialogTitle textAlign={"center"} id="alert-dialog-update-user">
        Atualizando usuário
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-to-update-user">
          Insira todos os dados do usuário corretamente nos campos abaixo para
          atualizar o usuário.
        </DialogContentText>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleSubmitData)}
          sx={{ mt: 5 }}
        >
          <Grid container spacing={4}>
            <AppTextField
              control={control}
              defaultValue={defaultValueFirstName}
              autoFocus={true}
              error={errors.firstName ? true : false}
              helperText={errors.firstName?.message}
              sm={6}
              id="firstName"
              type="text"
              label="Primeiro nome"
              {...register("firstName", { value: defaultValueFirstName })}
            />

            <AppTextField
              control={control}
              defaultValue={defaultValueLastName}
              error={errors.lastName ? true : false}
              helperText={errors.lastName?.message}
              sm={6}
              id="lastName"
              type="text"
              label="Segundo nome"
              {...register("lastName", { value: defaultValueLastName })}
            />

            <AppTextField
              control={control}
              defaultValue={defaultValueEmail}
              error={errors.email || emailExists ? true : false}
              helperText={errors.email?.message || emailExistsMessage}
              id="email"
              type="email"
              label="Email"
              {...register("email", { value: defaultValueEmail })}
            />

            <AppTextField
              control={control}
              defaultValue=""
              error={errors.password ? true : false}
              helperText={errors.password?.message}
              required={false}
              id="password"
              type="password"
              label="Nova senha"
              {...register("password")}
            />

            <AppTextField
              control={control}
              defaultValue=""
              error={errors.confirmPassword ? true : false}
              helperText={errors.confirmPassword?.message}
              required={false}
              id="confirmPassword"
              type="password"
              label="Confirme sua nova senha"
              {...register("confirmPassword")}
            />
          </Grid>
          <DialogActions>
            <AppButton
              type="button"
              onClick={onClickToCancel}
              text="Cancelar"
            />
            <AppButton disabled={formSent} text="Atualizar" />
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
