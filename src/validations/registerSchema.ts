import { z } from "astro:content";

const types = ["Agricultor", "Productor", "Ambos"] as const;

export type Types = (typeof types)[number];
export const mappedTypes: { [key in Types]: string } = {
  Agricultor: "Agricultor",
  Productor: "Productor",
  Ambos: "Ambos",
};

export const registerSchema = z
  .object({
    email: z.string().email({ message: "Por favor ingrese un correo valido" }),
    name: z.string().min(1, { message: "Debe contener minimo una letra" }),
    firstName: z.string().min(1, { message: "Debe contener minimo una letra" }),
    lastName: z.string().min(1, { message: "Debe contener minimo una letra" }),
    password: z.string().min(6, { message: "Minimo 6 letras" }),
    confirmPass: z.string().min(6, { message: "Minimo 6 letras" }),
    cellphone: z
      .string()
      .min(9, { message: "Por favor ingrese un numero valido" })
      .transform((data) => Number(data)),
    type: z.enum(types, {
      errorMap: () => ({ message: "Por favor seleccione una opción" }),
    }),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPass"],
  });
