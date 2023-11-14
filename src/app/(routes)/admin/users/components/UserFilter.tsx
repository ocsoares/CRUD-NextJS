import { ArrowUpward, ArrowDownward, Sort } from "@mui/icons-material";
import {
  Button,
  Popover,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { MouseEvent, useState } from "react";

interface IUserFilterProps {
  readonly onClickToSort: (order: "asc" | "desc") => Promise<void>;
}

export function UserFilter({ onClickToSort }: IUserFilterProps) {
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

  const handleSort = async (order: "asc" | "desc") => {
    setSortingOrder(order);

    handleClose();
  };

  return (
    <>
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
          <ListItemButton
            onClick={() =>
              handleSort("asc").then(() => {
                onClickToSort("asc");
              })
            }
          >
            <ListItemText primary="Usuários mais novos" />
          </ListItemButton>
          <ListItemButton
            onClick={() =>
              handleSort("desc").then(() => {
                onClickToSort("desc");
              })
            }
          >
            <ListItemText primary="Usuários mais antigos" />
          </ListItemButton>
        </List>
      </Popover>
    </>
  );
}
