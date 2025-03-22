import * as z from "zod";

export const authConfirmCodeSchema = z.object({
  email: z.string().email({ message: "E-mail inválido!" }),
  code: z.string().min(1, { message: "Código inválido!" }),
});

export type AuthConfirmCodeSchema = z.infer<typeof authConfirmCodeSchema>;
