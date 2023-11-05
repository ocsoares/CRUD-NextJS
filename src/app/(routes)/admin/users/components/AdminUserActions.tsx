"use client";

import { useAdminUsers } from "../hooks/useAdminUsers";
import { UserInfoWithModal } from "./UserInfoWithModal";

export function AdminUserActions() {
  const { isModalOpen, handleOpenModal, handleCloseModal } = useAdminUsers();

  return (
    <>
      {/* ARRUMAR !!! */}
      {/* APLICAR RESPONSIVIDADE ao invés de usar "gap", pq BUGA se o Nome for GRANDE ou PEQUENO !!! */}
      <UserInfoWithModal
        onClick={handleOpenModal}
        text="Vitor Pereira"
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}
