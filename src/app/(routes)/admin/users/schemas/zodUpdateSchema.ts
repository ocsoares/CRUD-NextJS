import { ZodType, z } from "zod";
import { capitalize } from "lodash";
import { IUpdateUserData } from "../types/IUpdateUserData";

// NÃO pode ser Vazio porque como todos são OPCIONAIS, pq não precisa Atualizar TODOS os Campos,
// então os Valores dos Campos vão vir do BANCO de Dados e logo NENHUM deverá ser Vazio !!!

export const zodUpdateSchema = z
  .object({
    firstName: z
      .string({ required_error: "O primeiro nome não pode ser vazio !" })
      .min(3, "O primeiro nome deve ter no mínimo 3 caracteres !")
      .transform((firstName) => {
        firstName = firstName.trim();
        firstName = firstName.replaceAll(" ", "");
        firstName = capitalize(firstName);

        return firstName;
      }),

    lastName: z
      .string({ required_error: "O último nome não pode ser vazio !" })
      .min(3, "O último nome deve ter no mínimo 3 caracteres !")
      .transform((lastName) => {
        lastName = lastName.trim();
        lastName = lastName.replaceAll(" ", "");
        lastName = capitalize(lastName);

        return lastName;
      }),

    email: z
      .string({ required_error: "O email não pode ser vazio !" })
      .min(1, "O email não pode ser vazio !")
      .email("Formato de email inválido !"),

    password: z
      .string()
      .refine((password) => !password || password.length >= 7, {
        message: "A senha precisa ter no mínimo 7 caracteres !",
      })
      .optional(),

    confirmPassword: z
      .string()
      .refine(
        (confirmPassword) => !confirmPassword || confirmPassword.length >= 1,
        {
          message: "A confirmação da senha não pode ser vazia !",
        },
      )
      .optional(),
  })
  .refine(
    (data) =>
      (!data.password && !data.confirmPassword) ||
      data.password === data.confirmPassword,
    {
      message: "As senhas precisam ser iguais !",
      path: ["confirmPassword"],
    },
  ) satisfies ZodType<IUpdateUserData>;
