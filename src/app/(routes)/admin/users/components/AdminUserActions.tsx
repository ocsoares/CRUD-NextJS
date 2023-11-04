"use client";

import { useAdminUsers } from "../hooks/useAdminUsers";
import { UserInfo } from "./UserInfo";
import { AdminUserModal } from "./AdminUserModal";

export function AdminUserActions() {
  const { isModalOpen, handleOpenModal, handleCloseModal } = useAdminUsers();

  return (
    <>
      <UserInfo onClick={handleOpenModal} text="Vitor Pereira" />
      <AdminUserModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}
