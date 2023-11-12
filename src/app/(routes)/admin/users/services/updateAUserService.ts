import { Session } from "next-auth";
import { IUpdateAUserBody } from "../types/IUpdateAUserBody";
import { IUpdateAUserResponse } from "../types/IUpdateAUserResponse";

export const UpdateAUserService = async (
  session: Session,
  data: IUpdateAUserBody,
): Promise<IUpdateAUserResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_EXTERNAL_CRUD_BACKEND_URL}/user`,
      {
        method: "PATCH",
        headers: {
          authorization: `bearer ${session?.user.jwt}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    return response.json() as unknown as IUpdateAUserResponse;
  } catch (error) {
    throw new Error("Erro ao atualizar o usuário. Tente novamente mais tarde.");
  }
};
