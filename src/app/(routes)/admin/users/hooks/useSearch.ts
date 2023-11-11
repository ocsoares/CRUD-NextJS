import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodSearchSchema } from "../schemas/zodSearchSchema";
import { ISearchData } from "../types/ISearchData";
import { ZodSearchSchemaType } from "../types/ZodSearchSchemaType";

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

  const handleSubmitData = async ({ searchText }: ISearchData) => {
    try {
      console.log("searchText:", searchText);

      setSearchApiFailed(false);
      setSearchApiFailedMessage("");

      reset();
    } catch (error) {
      setSearchApiFailed(true);
      setSearchApiFailedMessage((error as Error).message);
    }
  };

  return {
    handleSubmit,
    register,
    control,
    errors,
    handleSubmitData,
    searchApiFailed,
    searchApiFailedMessage,
  };
};
