import { useState } from "react";
import { useForm } from "react-hook-form";
import { ZodSearchSchemaType } from "../types/ZodSearchSchemaType";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodSearchSchema } from "../schemas/zodSearchSchema";
import { ISearchData } from "../types/ISearchData";

export const useAdminUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSubmitData = ({ searchText }: ISearchData) => {
    console.log("PESQUISADO !");
    console.log("searchText:", searchText);
    reset();
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
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
  };
};
