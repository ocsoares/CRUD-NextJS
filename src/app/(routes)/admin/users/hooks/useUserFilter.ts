import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { IUser } from "../../auth/interfaces/IUser";
import { getAllUsersService } from "../services/getAllUsersService";
import { useSession } from "next-auth/react";

dayjs.extend(isBetween);

export const useUserFilter = () => {
  const { data: session } = useSession();

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

  const handleClickToSearchByDate = async (
    startDate: Dayjs,
    endDate: Dayjs,
  ): Promise<IUser[]> => {
    const users = await getAllUsersService(session!.user.jwt);

    const usersInDateRange = users.filter((user) => {
      const userDate = dayjs(user.createdAt);

      const isAUserInDateRange = userDate.isBetween(
        startDate,
        endDate,
        null,
        "[]",
      );

      if (isAUserInDateRange) {
        return user;
      }
    });

    return usersInDateRange;
  };

  return { handleClickToSort, handleClickToSearchByDate };
};
