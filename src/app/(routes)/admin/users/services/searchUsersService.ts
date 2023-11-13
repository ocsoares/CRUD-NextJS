import { Session } from "next-auth";
import { IUser } from "../../auth/interfaces/IUser";

export const searchUsersService = async (
  session: Session,
  partialName: string,
): Promise<IUser[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_EXTERNAL_CRUD_BACKEND_URL}/users/search/${partialName}`,
      {
        method: "GET",
        headers: {
          authorization: `bearer ${session?.user.jwt}`,
        },
      },
    );

    return response.json() as unknown as IUser[];
  } catch (error) {
    throw new Error(
      "Erro ao pesquisar os usuários. Tente novamente mais tarde.",
    );
  }
};
