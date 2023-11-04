import { Box, Divider, IconButton, Typography } from "@mui/material";
import { UserAvatar } from "./UserAvatar";
import { Menu, Person } from "@mui/icons-material";

interface IUserInfoProps {
  text: string;
  onClick: () => void;
}

export function UserInfo({ text, onClick }: IUserInfoProps) {
  return (
    <>
      <Box
        sx={{
          mt: 6,
          marginRight: 60,
        }}
      >
        <UserAvatar avatar={<Person />} text={text} bgcolor="#812160" />
        <IconButton onClick={onClick}>
          <Menu />
        </IconButton>
      </Box>
      <Divider
        orientation="horizontal"
        sx={{ m: 1, bgcolor: "#484545", width: "100%" }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 6,
          marginRight: 36,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body2" color={"#6F6B6B"}>
            Criado em
          </Typography>
          <Typography variant="body2" color={"#6F6B6B"}>
            01/01/2001
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body2" color={"#6F6B6B"}>
            Atualizado em:
          </Typography>
          <Typography variant="body2" color={"#6F6B6B"}>
            02/02/2002
          </Typography>
        </Box>
      </Box>
    </>
  );
}
