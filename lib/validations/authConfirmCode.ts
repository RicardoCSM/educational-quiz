import * as z from "zod";

export const authConfirmCodeSchema = z.object({
  code: z.string().min(1, { message: "Código inválido!" }),
});

export type AuthConfirmCodeSchema = z.infer<typeof authConfirmCodeSchema>;
