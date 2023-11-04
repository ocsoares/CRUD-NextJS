import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";

interface IAdminUserModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

export function AdminUserModal({
  isModalOpen,
  handleCloseModal,
}: IAdminUserModalProps) {
  const modalStyle = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid darkslateblue",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
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
            id="transition-modal-title"
            variant="h6"
            textAlign={"center"}
          >
            Administrar usuário
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Colocar botões para acionar ações sob o usuário, como deletar,
            alterar e etc...
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
}
