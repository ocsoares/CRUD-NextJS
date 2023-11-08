import { useState } from "react";

export const useDeleteUser = () => {
  const [isOpenDeleteUserDialogBox, setIsOpenDeleteUserDialogBox] =
    useState(false);
  const handleOpenDeleteUserDialogBox = () => {
    setIsOpenDeleteUserDialogBox(true);
  };

  const handleCloseDeleteUserDialogBox = () => {
    setIsOpenDeleteUserDialogBox(false);
  };

  const handleDeleteUser = async () => {
    console.log("Ação para DELETAR o Usuário !!!");
    setIsOpenDeleteUserDialogBox(false);

    window.location.reload();
  };

  return {
    isOpenDeleteUserDialogBox,
    handleOpenDeleteUserDialogBox,
    handleCloseDeleteUserDialogBox,
    handleDeleteUser,
  };
};
