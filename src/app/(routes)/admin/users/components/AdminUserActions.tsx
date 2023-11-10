"use client";

import { Box, Pagination } from "@mui/material";
import { useAdminUsers } from "../hooks/useAdminUsers";
import SearchField from "./SearchField";
import { UserInfoWithModal } from "./UserInfoWithModal";
import { UserFilter } from "./UserFilter";
import { DateRangePicker } from "./DateRangePicker";
import { useEffect, useState } from "react";
import { getAllUsersService } from "../services/getAllUsersService";
import { IUser } from "../../auth/interfaces/IUser";
import { USERS_PER_PAGE } from "../constants/usersPerPageConstant";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function AdminUserActions() {
  const {
    handleSubmit,
    handleSubmitData,
    session,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    apiFailed,
    apiFailedMessage,
    register,
    control,
    errors,
  } = useAdminUsers();

  const [allUsers, setAllUsers] = useState<IUser[]>([]);

  // COLOCAR TUDO isso em um NOVO custom hook !!!
  // OBS: Inclusive a FUNÇÃO de Buscar Usuários no useEffect !!!
  const router = useRouter();

  const currentURL = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const currentPage = Number(searchParams.get("page")) || 1;

  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;

  const handlePageChange = (newPage: number) => {
    params.set("page", String(newPage));
    router.push(`${currentURL}?page=${newPage}`);
  };

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
  }, [session, currentPage]);

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

      {allUsers
        .slice(startIndex, endIndex)
        .map(({ firstName, lastName, email, createdAt, updatedAt }, index) => {
          return (
            <UserInfoWithModal
              key={index}
              onClick={() => handleOpenModal(index)}
              text={`${firstName} ${lastName}`}
              createdAt={
                createdAt ? new Date(createdAt).toLocaleDateString("pt-BR") : ""
              }
              updatedAt={
                updatedAt ? new Date(updatedAt).toLocaleDateString("pt-BR") : ""
              }
              isModalOpen={isModalOpen[index] || false}
              handleCloseModal={() => handleCloseModal(index)}
              modalUsername={`${firstName} ${lastName}`}
              defaultValueFirstName={firstName}
              defaultValueLastName={lastName}
              defaultValueEmail={email}
            />
          );
        })}

      <Box display={"flex"} justifyContent={"center"}>
        <Pagination
          count={Math.ceil(allUsers.length / USERS_PER_PAGE)}
          page={currentPage}
          onChange={(event, newPage) => handlePageChange(newPage)}
          sx={{ mt: 4 }}
        />
      </Box>
    </>
  );
}
