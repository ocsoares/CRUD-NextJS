import { PersonRemove, Update } from "@mui/icons-material";
import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";

interface IAdminUserModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  username: string;
}

export function AdminUserModal({
  isModalOpen,
  handleCloseModal,
  username,
}: IAdminUserModalProps) {
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

  const handleButtonClick = () => {
    console.log("Botão do Modal CLICADO !!!");
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
              onClick={handleButtonClick}
              startIcon={<Update color="success" />}
            >
              Atualizar usuário
            </Button>

            <Button
              color="secondary"
              onClick={handleButtonClick}
              startIcon={<PersonRemove color="error" />}
            >
              Remover usuário
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
