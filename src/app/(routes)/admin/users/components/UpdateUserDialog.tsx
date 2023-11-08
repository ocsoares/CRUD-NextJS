import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface IUpdateUserDialogProps {
  open: boolean;
  onClose: () => void;
  onClickToDisagree: () => void;
  onClickToConfirm: () => void;
}

export function UpdateUserDialog({
  open,
  onClose,
  onClickToDisagree,
  onClickToConfirm,
}: IUpdateUserDialogProps) {
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
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onClickToDisagree}>
          Cancelar
        </Button>
        <Button color="secondary" onClick={onClickToConfirm} autoFocus>
          Atualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
