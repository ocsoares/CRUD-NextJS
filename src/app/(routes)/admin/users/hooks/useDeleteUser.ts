import { useState } from "react";
import { deleteAUserService } from "../services/deleteAUserService";
import { useSession } from "next-auth/react";

export const useDeleteUser = () => {
  const [isOpenDeleteUserDialogBox, setIsOpenDeleteUserDialogBox] =
    useState(false);
  const handleOpenDeleteUserDialogBox = () => {
    setIsOpenDeleteUserDialogBox(true);
  };

  const handleCloseDeleteUserDialogBox = () => {
    setIsOpenDeleteUserDialogBox(false);
  };

  const { data: session } = useSession();

  const handleDeleteUser = async (email: string) => {
    try {
      if (session) {
        const deletedUser = await deleteAUserService(session, email);

        if (deletedUser) {
          setIsOpenDeleteUserDialogBox(false);

          window.location.reload();

          return;
        }
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  return {
    isOpenDeleteUserDialogBox,
    handleOpenDeleteUserDialogBox,
    handleCloseDeleteUserDialogBox,
    handleDeleteUser,
  };
};
