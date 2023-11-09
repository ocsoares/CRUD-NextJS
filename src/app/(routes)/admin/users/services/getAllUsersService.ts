import { IUser } from "../../auth/interfaces/IUser";

export const getAllUsersService = async (jwt: string): Promise<IUser[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_EXTERNAL_CRUD_BACKEND_URL}/users`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );
    const allUsers = await response.json();

    return allUsers as IUser[];
  } catch (error) {
    throw new Error(
      "Erro ao checar se o JWT expirou. Tente novamente mais tarde.",
    );
  }
};
