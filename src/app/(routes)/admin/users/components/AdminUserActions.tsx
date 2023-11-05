"use client";

import { useAdminUsers } from "../hooks/useAdminUsers";
import { UserInfoWithModal } from "./UserInfoWithModal";

export function AdminUserActions() {
  const { isModalOpen, handleOpenModal, handleCloseModal } = useAdminUsers();

  return (
    <>
      <UserInfoWithModal
        onClick={handleOpenModal}
        text="Vitor Pereira"
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}
