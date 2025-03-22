import * as z from "zod";

export const authSendCodeSchema = z.object({
  email: z.string().email({ message: "Email inválido!" }),
});

export type AuthSendCodeSchema = z.infer<typeof authSendCodeSchema>;
