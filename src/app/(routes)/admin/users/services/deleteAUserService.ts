import { Session } from "next-auth";
import { IDeleteUserResponse } from "../types/IDeleteUserResponse";

export const deleteAUserService = async (
  session: Session,
  email: string,
): Promise<IDeleteUserResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_EXTERNAL_CRUD_BACKEND_URL}/user`,
      {
        method: "DELETE",
        headers: {
          authorization: `bearer ${session?.user.jwt}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      },
    );

    return response.json() as unknown as IDeleteUserResponse;
  } catch (error) {
    throw new Error("Erro ao deletar o usuário. Tente novamente mais tarde.");
  }
};
