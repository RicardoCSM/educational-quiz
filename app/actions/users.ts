"use server";

import httpClient from "@/services/http.server.service";
import { cookies } from "next/headers";
import { signOut } from "./auth";
import { User } from "@/types/user";
import { isAxiosError } from "@/lib/utils";
import { ApiError } from "@/types/api";
import { UserProfileSchema } from "@/lib/validations/userProfile";

export async function getCurrentUserInfo(): Promise<User | null> {
  try {
    if (!(await cookies()).get("access_token")) {
      return null;
    }

    const res = await httpClient.get(`me`);
    const response: User = res.data;

    return response;
  } catch (e) {
    console.error(e);
    await signOut();
    return null;
  }
}

export async function updateUserInfo(
  data: UserProfileSchema,
): Promise<{ success: boolean; message: string; user?: User }> {
  try {
    const res = await httpClient.put(`user`, data);
    const response: User = res.data;

    return {
      success: true,
      message: "Usuário atualizado com sucesso!",
      user: response,
    };
  } catch (e) {
    if (isAxiosError<ApiError>(e)) {
      return {
        success: false,
        message: e.response?.data?.error || "Erro ao atualizar usuário",
      };
    }

    throw new Error("Erro ao atualizar usuário");
  }
}
