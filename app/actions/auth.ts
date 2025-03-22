"use server";

import { cookies } from "next/headers";
import CryptoJS from "crypto-js";
import { isAxiosError } from "@/lib/utils";
import { ApiError, ApiResponse } from "@/types/api";
import httpClient from "@/services/http.server.service";
import { AuthSendCodeSchema } from "@/lib/validations/authSendCode";
import { LoginResponse } from "@/types/login-response";
import { AuthConfirmCodeSchema } from "@/lib/validations/authConfirmCode";

const SECRET_KEY = process.env.AUTH_SECRET_KEY || "";

export async function getToken(): Promise<string | null> {
  const encryptedToken = (await cookies()).get("access_token")?.value;
  if (encryptedToken) {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    const originalToken = bytes.toString(CryptoJS.enc.Utf8);
    return originalToken;
  }
  return null;
}

export async function clearToken(): Promise<void> {
  (await cookies()).set("access_token", "", { expires: new Date(0) });
}

export async function login(data: AuthSendCodeSchema): Promise<ApiResponse> {
  try {
    await httpClient.post("login", data);

    return {
      success: true,
      message: "Código enviado com sucesso!",
    };
  } catch (e: unknown) {
    if (isAxiosError<ApiError>(e)) {
      return {
        success: false,
        message: e.response?.data?.error || "Erro ao enviar código",
      };
    }

    throw new Error("Erro ao enviar código");
  }
}

export async function confirmCode(
  data: AuthConfirmCodeSchema,
): Promise<ApiResponse> {
  try {
    const res = await httpClient.post("confirmCode", data);
    const response: LoginResponse = res.data;
    if (response.token) {
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const encryptedToken = CryptoJS.AES.encrypt(
        response.token,
        SECRET_KEY,
      ).toString();
      (await cookies()).set("access_token", encryptedToken, {
        expires,
        httpOnly: true,
        sameSite: "lax",
      });
    }

    return {
      success: true,
      message: "Usuário logado com sucesso!",
    };
  } catch (e: unknown) {
    if (isAxiosError<ApiError>(e)) {
      return {
        success: false,
        message: e.response?.data?.error || "Erro ao enviar código",
      };
    }

    throw new Error("Erro ao logar usuário");
  }
}

export async function signOut(): Promise<ApiResponse> {
  try {
    await httpClient.delete(`logOut`);
    await clearToken();

    return {
      success: true,
      message: "Usuário deslogado com sucesso!",
    };
  } catch (e) {
    if (isAxiosError<ApiError>(e)) {
      return {
        success: false,
        message: e.response?.data?.error || "Erro ao enviar código",
      };
    }

    throw new Error("Erro ao deslogar usuário");
  }
}
