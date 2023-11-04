import { PeopleAlt } from "@mui/icons-material";
import { Avatar } from "@mui/material";

export function AppUserAvatar() {
  return (
    <Avatar sx={{ width: 70, height: 70, bgcolor: "#8F3098" }}>
      <PeopleAlt sx={{ fontSize: 44 }} />
    </Avatar>
  );
}
