"use client";

import { Box } from "@mui/material";
import { useAdminUsers } from "../hooks/useAdminUsers";
import SearchField from "./SearchField";
import { UserInfoWithModal } from "./UserInfoWithModal";

export function AdminUserActions() {
  const {
    handleSubmit,
    handleSubmitData,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    register,
    control,
    errors,
  } = useAdminUsers();

  // IMPORTANTE: ACHO que aq não é o melhor lugar para usar o "SearchField", mas usei por causa q já
  // estou usando aqui um customHook, o melhor local ACHO que seria em "page" EMBAIXO de "Usuários" !!!!
  // -------------------------------------------------------------------------------------------------------
  // ACHO que tenho que usar o useForm no "useAdminUsers" pra pegar o control, register e etc !!!!

  return (
    <>
      <Box
        component={"form"}
        noValidate
        onSubmit={handleSubmit(handleSubmitData)}
        display={"flex"}
        alignItems={"center"}
        marginTop={2.5}
        marginLeft={22.5}
      >
        <SearchField
          control={control}
          error={errors.searchText ? true : false}
          helperText={errors.searchText?.message}
          {...register("searchText")}
        />
      </Box>

      <UserInfoWithModal
        onClick={handleOpenModal}
        text="Vitor Pereira"
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}
