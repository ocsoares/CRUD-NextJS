import { ZodType, z } from "zod";
import { ISearchData } from "../types/ISearchData";

export const zodSearchSchema = z.object({
  searchText: z
    .string({
      required_error: "O campo de pesquisa não pode ser enviado vazio !",
    })
    .min(1, "O campo de pesquisa não pode ser enviado vazio !")
    .transform((searchText) => {
      searchText = searchText.trim();

      return searchText;
    }),
}) satisfies ZodType<ISearchData>;
