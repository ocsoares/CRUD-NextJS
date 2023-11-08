import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface IDeleteUserDialogProps {
  open: boolean;
  onClose: () => void;
  onClickToDisagree: () => void;
  onClickToConfirm: () => void;
}

export function DeleteUserDialog({
  open,
  onClose,
  onClickToDisagree,
  onClickToConfirm,
}: IDeleteUserDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-delete-user"
      aria-describedby="dialog-to-delete-user"
    >
      <DialogTitle id="alert-dialog-delete-user">
        Tem certeza que quer deletar esse usuário?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-to-delete-user">
          Confirme abaixo se você quer mesmo deletar esse usuário. Se sim, o
          usuário será deletado e todos os seus dados serão perdidos.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onClickToDisagree}>
          Discordar
        </Button>
        <Button color="secondary" onClick={onClickToConfirm} autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
