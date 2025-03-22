import axios, { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isAxiosError<ResponseType>(
  error: unknown,
): error is AxiosError<ResponseType> {
  return axios.isAxiosError(error);
}
