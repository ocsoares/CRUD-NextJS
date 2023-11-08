import { useState } from "react";
import { IUpdateUserData } from "../types/IUpdateUserData";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodUpdateSchemaType } from "../types/ZodUpdateSchemaType";
import { zodUpdateSchema } from "../schemas/zodUpdateSchema";

export const useUpdateUser = () => {
  const [isOpenUpdateUserDialogBox, setIsOpenUpdateUserDialogBox] =
    useState(false);
  const [formSent, setFormSent] = useState(false);
  const [apiFailed, setApiFailed] = useState(false);
  const [apiFailedMessage, setApiFailedMessage] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [emailExistsMessage, setEmailExistsMessage] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ZodUpdateSchemaType>({
    mode: "onChange",
    resolver: zodResolver(zodUpdateSchema),
  });

  const handleOpenUpdateUserDialogBox = () => {
    setIsOpenUpdateUserDialogBox(true);
  };

  const handleCloseUpdateUserDialogBox = () => {
    setIsOpenUpdateUserDialogBox(false);
  };
  const handleSubmitData = async (data: IUpdateUserData) => {
    try {
      // const signup = await signUpUserService(data); // FAZER um Service pra isso !! <<
      const updateUser: any = data; // MUDAR...

      if (updateUser.statusCode === 409) {
        setEmailExists(true);
        setEmailExistsMessage("Esse email já está em uso. Tente outro.");

        reset();

        return;
      }

      setApiFailed(false);
      setEmailExists(false);
      setEmailExistsMessage("");
      setFormSent(true);

      reset();
    } catch (error) {
      console.log("ERROR:", error);
      setApiFailed(true);
      setApiFailedMessage((error as Error).message);
    }
  };

  return {
    formSent,
    register,
    handleSubmit,
    control,
    errors,
    isOpenUpdateUserDialogBox,
    handleOpenUpdateUserDialogBox,
    handleCloseUpdateUserDialogBox,
    handleSubmitData,
    apiFailed,
    apiFailedMessage,
    emailExists,
    emailExistsMessage,
  };
};
