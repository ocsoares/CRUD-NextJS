import { useSession } from "next-auth/react";
import { useState } from "react";
import { IUser } from "../../auth/interfaces/IUser";
import { searchUsersByOrderService } from "../services/searchUsersByOrderService";

export const useUserFilter = () => {
  const [sortApiFailed, setSortApiFailed] = useState(false);
  const [sortApiFailedMessage, setSortApiFailedMessage] = useState("");

  const { data: session } = useSession();

  const handleClickToSort = async (
    order: "asc" | "desc",
  ): Promise<IUser[] | undefined> => {
    try {
      if (session) {
        if (order === "asc") {
          const usersFoundByAscOrder = await searchUsersByOrderService(
            session,
            order,
          );

          return usersFoundByAscOrder;
        }

        if (order === "desc") {
          const usersFoundByDescOrder = await searchUsersByOrderService(
            session,
            order,
          );

          return usersFoundByDescOrder;
        }

        setSortApiFailed(false);
        setSortApiFailedMessage("");
      }
    } catch (error) {
      setSortApiFailed(true);
      setSortApiFailedMessage((error as Error).message);
    }
  };

  return { sortApiFailed, sortApiFailedMessage, handleClickToSort };
};
