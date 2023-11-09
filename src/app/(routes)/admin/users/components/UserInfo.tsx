import { Box, Divider, IconButton, Typography } from "@mui/material";
import { UserAvatar } from "./UserAvatar";
import { Menu, Person } from "@mui/icons-material";

interface IUserInfoProps {
  readonly text: string;
  readonly onClick: () => void;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export function UserInfo({
  text,
  onClick,
  createdAt,
  updatedAt,
}: IUserInfoProps) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          marginTop: 6,
          justifyContent: "space-between",
        }}
      >
        <UserAvatar avatar={<Person />} text={text} bgcolor="#812160" />
        <IconButton onClick={onClick} sx={{ marginTop: 4 }}>
          <Menu sx={{ fontSize: 35 }} />
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
          marginLeft: 11,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body2" color={"#6F6B6B"}>
            Criado em
          </Typography>
          <Typography variant="body2" color={"#6F6B6B"}>
            {`${createdAt}`}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body2" color={"#6F6B6B"}>
            Atualizado em:
          </Typography>
          <Typography variant="body2" color={"#6F6B6B"}>
            {`${updatedAt}`}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
