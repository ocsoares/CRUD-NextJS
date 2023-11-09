"use client";

import { Box } from "@mui/material";
import { useAdminUsers } from "../hooks/useAdminUsers";
import SearchField from "./SearchField";
import { UserInfoWithModal } from "./UserInfoWithModal";
import { UserFilter } from "./UserFilter";
import { DateRangePicker } from "./DateRangePicker";
import { useEffect, useState } from "react";
import { getAllUsersService } from "../services/getAllUsersService";
import { IUser } from "../../auth/interfaces/IUser";

export function AdminUserActions() {
  const {
    handleSubmit,
    handleSubmitData,
    session,
    apiFailed,
    apiFailedMessage,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    register,
    control,
    errors,
  } = useAdminUsers();

  const [allUsers, setAllUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const getAllUsers = async () => {
      if (session) {
        const users = await getAllUsersService(session.user.jwt);

        if (users) {
          setAllUsers(users);
        } else {
          setAllUsers([]);
        }
      }
    };

    getAllUsers();
  }, [session]);

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
            error={errors.searchText || apiFailed ? true : false}
            helperText={errors.searchText?.message || apiFailedMessage}
            {...register("searchText")}
          />
        </Box>
        <Box marginRight={4.5}>
          <UserFilter />
        </Box>
      </Box>

      <DateRangePicker />

      {allUsers.map(({ firstName, lastName, createdAt, updatedAt }, index) => (
        <UserInfoWithModal
          key={index}
          onClick={handleOpenModal}
          text={`${firstName} ${lastName}`}
          createdAt={
            createdAt ? new Date(createdAt).toLocaleDateString("pt-BR") : ""
          }
          updatedAt={
            updatedAt ? new Date(updatedAt).toLocaleDateString("pt-BR") : ""
          }
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          username={`${firstName} ${lastName}`} // Esse aqui tá dando ERRADO, a Variável tá FIXA por algum motivo...
        />
      ))}
    </>
  );
}
