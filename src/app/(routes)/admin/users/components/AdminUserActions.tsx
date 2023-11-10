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

  const [show, setShow] = useState<boolean[]>([false]);

  const openModal = (index: number) => {
    handleChanges(index, true);
  };

  const closeModal = (index: number) => {
    handleChanges(index, false);
  };

  const handleChanges = (index: number, value: boolean) => {
    const items = [...show];

    items[index] = value;

    setShow(items);
  };

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

      {allUsers.map(
        ({ firstName, lastName, email, createdAt, updatedAt }, index) => {
          return (
            <UserInfoWithModal
              key={index}
              onClick={() => openModal(index)}
              text={`${firstName} ${lastName}`}
              createdAt={
                createdAt ? new Date(createdAt).toLocaleDateString("pt-BR") : ""
              }
              updatedAt={
                updatedAt ? new Date(updatedAt).toLocaleDateString("pt-BR") : ""
              }
              isModalOpen={show[index] || false}
              handleCloseModal={() => closeModal(index)}
              modalUsername={`${firstName} ${lastName}`}
              defaultValueFirstName={firstName}
              defaultValueLastName={lastName}
              defaultValueEmail={email}
            />
          );
        },
      )}
    </>
  );
}
