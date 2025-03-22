"use client";

import { signOut } from "@/app/actions/auth";
import { createHttpClient } from "./http.service";
import { AxiosError } from "axios";

const httpClient = createHttpClient();

const authErrorInterceptor = async (error: AxiosError) => {
  if (error.response && error.response.status === 401) {
    await signOut();
    window.location.replace("/auth/login");
  }

  return Promise.reject(error);
};

httpClient.interceptors.response.use((response) => {
  return response;
}, authErrorInterceptor);

export default httpClient;
