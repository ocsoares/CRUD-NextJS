import { useState } from "react";
import { useForm } from "react-hook-form";
import { ZodSearchSchemaType } from "../types/ZodSearchSchemaType";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodSearchSchema } from "../schemas/zodSearchSchema";
import { ISearchData } from "../types/ISearchData";
import { useSession } from "next-auth/react";

export const useAdminUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiFailed, setApiFailed] = useState(false);
  const [apiFailedMessage, setApiFailedMessage] = useState("");

  const { data: session } = useSession();

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

  const handleSubmitData = async ({ searchText }: ISearchData) => {
    try {
      console.log("searchText:", searchText);

      setApiFailed(false);
      setApiFailedMessage("");

      reset();
    } catch (error) {
      setApiFailed(true);
      setApiFailedMessage((error as Error).message);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return {
    handleSubmit,
    register,
    control,
    errors,
    handleSubmitData,
    apiFailed,
    apiFailedMessage,
    session,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
  };
};
