import { Box, Container, Paper, Typography } from "@mui/material";
import { AdminUserActions } from "./components/AdminUserActions";
import { AppUserAvatar } from "./components/AppUserAvatar";

export default function UsersPage() {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        minWidth: "100vh",
        wordBreak: "break-word",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "120%",
          padding: 10,
          marginBottom: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <AppUserAvatar />
          <Typography sx={{ mt: 2, fontSize: 34 }}>Usuários</Typography>
          <AdminUserActions />
        </Box>
      </Paper>
    </Container>
  );
}
