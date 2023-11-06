import { ArrowUpward, ArrowDownward, Sort } from "@mui/icons-material";
import {
  Button,
  Popover,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { MouseEvent, useState } from "react";
export function UserFilter() {
  const [popoverAnchorEl, setPopoverSetAnchorEl] = useState<HTMLElement | null>(
    null,
  );
  const [sortingOrder, setSortingOrder] = useState<string | null>(null);

  const handleButtonClick = (event: MouseEvent<HTMLElement>) => {
    setPopoverSetAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setPopoverSetAnchorEl(null);
  };

  const handleSort = (order: "asc" | "desc") => {
    setSortingOrder(order);

    // Integrar com API !!!
    if (order === "asc") {
      console.log("É ASC !!!");
    } else {
      console.log("É DESC !!!");
    }

    handleClose();
  };

  return (
    <div>
      <Button
        aria-controls="sorting-menu"
        aria-haspopup="true"
        onClick={handleButtonClick}
        color="secondary"
        startIcon={
          sortingOrder === "asc" ? (
            <ArrowUpward />
          ) : sortingOrder === "desc" ? (
            <ArrowDownward />
          ) : (
            <Sort />
          )
        }
      >
        Ordenar
      </Button>
      <Popover
        id="sorting-menu"
        open={Boolean(popoverAnchorEl)}
        anchorEl={popoverAnchorEl}
        onClose={handleClose}
      >
        <List>
          <ListItemButton onClick={() => handleSort("asc")}>
            <ListItemText primary="Menor para o maior" />
          </ListItemButton>
          <ListItemButton onClick={() => handleSort("desc")}>
            <ListItemText primary="Maior para o menor" />
          </ListItemButton>
        </List>
      </Popover>
    </div>
  );
}
