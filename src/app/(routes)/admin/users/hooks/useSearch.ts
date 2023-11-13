import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodSearchSchema } from "../schemas/zodSearchSchema";
import { ISearchData } from "../types/ISearchData";
import { ZodSearchSchemaType } from "../types/ZodSearchSchemaType";
import { searchUsersService } from "../services/searchUsersService";
import { useSession } from "next-auth/react";
import { IUser } from "../../auth/interfaces/IUser";
import { getAllUsersService } from "../services/getAllUsersService";

export const useSearch = () => {
  const [searchApiFailed, setSearchApiFailed] = useState(false);
  const [searchApiFailedMessage, setSearchApiFailedMessage] = useState("");

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<ZodSearchSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(zodSearchSchema),
  });

  const { data: session } = useSession();

  const handleSubmitData = async ({
    searchText,
  }: ISearchData): Promise<IUser[] | undefined> => {
    try {
      if (session) {
        const usersFound = await searchUsersService(session, searchText);

        setSearchApiFailed(false);
        setSearchApiFailedMessage("");

        reset();

        return usersFound;
      }
    } catch (error) {
      setSearchApiFailed(true);
      setSearchApiFailedMessage((error as Error).message);
    }
  };

  const handleClickToClean = async (): Promise<IUser[] | undefined> => {
    if (session) {
      const users = await getAllUsersService(session?.user.jwt);

      reset();

      return users;
    }
  };

  return {
    handleSubmit,
    register,
    control,
    errors,
    handleSubmitData,
    handleClickToClean,
    searchApiFailed,
    searchApiFailedMessage,
  };
};
