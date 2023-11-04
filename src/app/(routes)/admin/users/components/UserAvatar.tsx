import { Person } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface IUserAvatarProps {
  avatar: ReactNode;
  bgcolor?: string;
  text?: string;
}

export function UserAvatar({ bgcolor = "#8F3098", text }: IUserAvatarProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Avatar sx={{ width: 60, height: 60, bgcolor }}>
        <Person sx={{ fontSize: 40 }} />
      </Avatar>

      <Typography variant="h5" sx={{ mt: 4, ml: 1.4 }}>
        {text}
      </Typography>
    </Box>
  );
}
