import * as z from "zod";

export const userProfileSchema = z.object({
  name: z.string().min(3, { message: "Nome muito curto!" }),
  email: z.string().email({ message: "Email inválido!" }),
});

export type UserProfileSchema = z.infer<typeof userProfileSchema>;
