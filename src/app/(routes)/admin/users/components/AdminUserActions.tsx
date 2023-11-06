"use client";

import { Box } from "@mui/material";
import { useAdminUsers } from "../hooks/useAdminUsers";
import SearchField from "./SearchField";
import { UserInfoWithModal } from "./UserInfoWithModal";
import { UserFilter } from "./UserFilter";

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

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        flexDirection={"row"}
        gap={2}
        marginTop={2.5}
        marginLeft={22.5}
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleSubmitData)}
          display="flex"
          alignItems="center"
          flex="1"
        >
          <SearchField
            control={control}
            error={errors.searchText ? true : false}
            helperText={errors.searchText?.message}
            {...register("searchText")}
          />
        </Box>
        <Box marginRight={4.5}>
          <UserFilter />
        </Box>
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
