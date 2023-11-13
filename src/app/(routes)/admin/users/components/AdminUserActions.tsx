"use client";

import { Box, Pagination, Typography } from "@mui/material";
import SearchField from "./SearchField";
import { UserInfoWithModal } from "./UserInfoWithModal";
import { UserFilter } from "./UserFilter";
import { DateRangePicker } from "./DateRangePicker";
import { useEffect, useState } from "react";
import { getAllUsersService } from "../services/getAllUsersService";
import { IUser } from "../../auth/interfaces/IUser";
import { USERS_PER_PAGE } from "../constants/usersPerPageConstant";
import { useModal } from "../hooks/useModal";
import { useSearch } from "../hooks/useSearch";
import { useSession } from "next-auth/react";
import { usePagination } from "../hooks/usePagination";

export function AdminUserActions() {
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();

  const {
    handleSubmit,
    register,
    control,
    errors,
    handleSubmitData,
    handleClickToClean,
    searchApiFailed,
    searchApiFailedMessage,
  } = useSearch();

  const { currentPage, startIndex, endIndex, handlePageChange } =
    usePagination();

  const { data: session } = useSession();

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
          onSubmit={handleSubmit((data) =>
            handleSubmitData(data).then((usersFound) => {
              if (usersFound) {
                if (usersFound.length > 0) {
                  setAllUsers(usersFound);
                } else {
                  setAllUsers([]);
                }
              }
            }),
          )}
          display="flex"
          alignItems="center"
          flex="1"
        >
          <SearchField
            control={control}
            error={errors.searchText || searchApiFailed ? true : false}
            helperText={errors.searchText?.message || searchApiFailedMessage}
            onClickToClean={() =>
              handleClickToClean().then((users) => {
                if (users) {
                  setAllUsers(users);
                } else {
                  setAllUsers([]);
                }
              })
            }
            {...register("searchText")}
          />
        </Box>
        <Box marginRight={4.5}>
          <UserFilter />
        </Box>
      </Box>

      <DateRangePicker />

      {/* Adicionar um Skeleton e ver o Estado do Carregamento da variável async "allUsers" !!! */}
      {allUsers.length === 0 ? (
        <Typography mt={10} textAlign={"center"} variant="h5" color={"#ACA4A4"}>
          Nenhum usuário registrado
        </Typography>
      ) : (
        <>
          {allUsers
            .slice(startIndex, endIndex)
            .map(
              ({ firstName, lastName, email, createdAt, updatedAt }, index) => (
                <UserInfoWithModal
                  key={index}
                  onClick={() => handleOpenModal(index)}
                  text={`${firstName} ${lastName}`}
                  createdAt={
                    createdAt
                      ? new Date(createdAt).toLocaleDateString("pt-BR")
                      : ""
                  }
                  updatedAt={
                    updatedAt
                      ? new Date(updatedAt).toLocaleDateString("pt-BR")
                      : ""
                  }
                  isModalOpen={isModalOpen[index] || false}
                  handleCloseModal={() => handleCloseModal(index)}
                  modalUsername={`${firstName} ${lastName}`}
                  defaultValueFirstName={firstName}
                  defaultValueLastName={lastName}
                  defaultValueEmail={email}
                />
              ),
            )}
          <Box display={"flex"} justifyContent={"center"}>
            <Pagination
              count={Math.ceil(allUsers.length / USERS_PER_PAGE)}
              page={currentPage}
              showFirstButton
              showLastButton
              onChange={(event, newPage) => handlePageChange(newPage)}
              sx={{ mt: 4 }}
            />
          </Box>
        </>
      )}
    </>
  );
}
