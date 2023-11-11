import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { USERS_PER_PAGE } from "../constants/usersPerPageConstant";

export const usePagination = () => {
  const router = useRouter();

  const currentURL = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const currentPage = Number(searchParams.get("page")) || 1;

  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;

  const handlePageChange = (newPage: number) => {
    params.set("page", String(newPage));
    router.push(`${currentURL}?page=${newPage}`);
  };

  return { currentPage, startIndex, endIndex, handlePageChange };
};
