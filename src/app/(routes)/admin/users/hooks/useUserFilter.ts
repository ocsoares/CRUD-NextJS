import { IUser } from "../../auth/interfaces/IUser";

export const useUserFilter = () => {
  const handleClickToSort = async (
    allUsers: IUser[],
    order: "asc" | "desc",
  ): Promise<IUser[]> => {
    const sortedUsers = [...allUsers];

    sortedUsers.sort((userA, userB) => {
      const dateA = userA.createdAt ? new Date(userA.createdAt) : new Date(0);
      const dateB = userB.createdAt ? new Date(userB.createdAt) : new Date(0);

      if (order === "asc") {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });

    return sortedUsers;
  };

  return { handleClickToSort };
};
