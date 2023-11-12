import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodUpdateSchemaType } from "../types/ZodUpdateSchemaType";
import { zodUpdateSchema } from "../schemas/zodUpdateSchema";
import { useSession } from "next-auth/react";
import { UpdateAUserService } from "../services/updateAUserService";
import { IUpdateAUserBody } from "../types/IUpdateAUserBody";

export const useUpdateUser = () => {
  const [isOpenUpdateUserDialogBox, setIsOpenUpdateUserDialogBox] =
    useState(false);
  const [formSent, setFormSent] = useState(false);
  const [apiFailed, setApiFailed] = useState(false);
  const [apiFailedMessage, setApiFailedMessage] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [emailExistsMessage, setEmailExistsMessage] = useState("");

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    control,
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
  const handleSubmitData = async (data: IUpdateAUserBody) => {
    if (data.password === "") {
      data.password = undefined;
    }

    try {
      if (session) {
        const updateUser = await UpdateAUserService(session, { ...data });

        if (updateUser.statusCode === 409) {
          setEmailExists(true);
          setEmailExistsMessage("Esse email já está em uso. Tente outro.");

          return;
        }

        setApiFailed(false);
        setEmailExists(false);
        setEmailExistsMessage("");
        setFormSent(true);

        setIsOpenUpdateUserDialogBox(false);

        window.location.reload();

        return;
      }
    } catch (error) {
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
