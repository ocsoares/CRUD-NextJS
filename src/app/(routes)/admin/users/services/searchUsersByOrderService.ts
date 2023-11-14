import { Session } from "next-auth";
import { IUser } from "../../auth/interfaces/IUser";

export const searchUsersByOrderService = async (
  session: Session,
  order: "asc" | "desc",
): Promise<IUser[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_EXTERNAL_CRUD_BACKEND_URL}/users/search/order/${order}`,
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
