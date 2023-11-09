import { PersonRemove, Update } from "@mui/icons-material";
import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import { DeleteUserDialog } from "./DeleteUserDialog";
import { useDeleteUser } from "../hooks/useDeleteUser";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { UpdateUserDialog } from "./UpdateUserDialog";

interface IAdminUserModalProps {
  readonly isModalOpen: boolean;
  readonly handleCloseModal: () => void;
  readonly username: string;
}

export function AdminUserModal({
  isModalOpen,
  handleCloseModal,
  username,
}: IAdminUserModalProps) {
  const {
    isOpenUpdateUserDialogBox,
    handleOpenUpdateUserDialogBox,
    handleCloseUpdateUserDialogBox,
  } = useUpdateUser();

  const {
    isOpenDeleteUserDialogBox,
    handleOpenDeleteUserDialogBox,
    handleCloseDeleteUserDialogBox,
    handleDeleteUser,
  } = useDeleteUser();

  const modalStyle = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid darkslateblue",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      aria-labelledby="admin-user-modal-title"
      aria-describedby="admin-user-modal-description"
      open={isModalOpen}
      onClose={handleCloseModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isModalOpen}>
        <Box sx={modalStyle}>
          <Typography
            id="admin-user-modal-title"
            variant="h6"
            textAlign={"center"}
          >
            {`Administrando usuário ${username}`}
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            gap={4}
            id="admin-user-modal-description"
            mt={2.5}
          >
            <Button
              color="secondary"
              onClick={handleOpenUpdateUserDialogBox}
              startIcon={<Update color="success" />}
            >
              Atualizar usuário
            </Button>

            <UpdateUserDialog
              open={isOpenUpdateUserDialogBox}
              onClose={handleCloseUpdateUserDialogBox}
              onClickToCancel={handleCloseUpdateUserDialogBox}
            />

            <Button
              color="secondary"
              onClick={handleOpenDeleteUserDialogBox}
              startIcon={<PersonRemove color="error" />}
            >
              Remover usuário
            </Button>

            <DeleteUserDialog
              open={isOpenDeleteUserDialogBox}
              onClose={handleCloseDeleteUserDialogBox}
              onClickToDisagree={handleCloseDeleteUserDialogBox}
              onClickToConfirm={handleDeleteUser}
            />
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
