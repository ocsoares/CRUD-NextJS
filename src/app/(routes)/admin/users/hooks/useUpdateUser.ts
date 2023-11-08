import { useState } from "react";

export const useUpdateUser = () => {
  const [isOpenUpdateUserDialogBox, setIsOpenUpdateUserDialogBox] =
    useState(false);
  const handleOpenUpdateUserDialogBox = () => {
    setIsOpenUpdateUserDialogBox(true);
  };

  const handleCloseUpdateUserDialogBox = () => {
    setIsOpenUpdateUserDialogBox(false);
  };

  const handleUpdateUser = async () => {
    console.log("Ação para ATUALIZAR o Usuário !!!");
    setIsOpenUpdateUserDialogBox(false);

    window.location.reload();
  };

  return {
    isOpenUpdateUserDialogBox,
    handleOpenUpdateUserDialogBox,
    handleCloseUpdateUserDialogBox,
    handleUpdateUser,
  };
};
