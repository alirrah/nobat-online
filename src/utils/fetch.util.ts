import { Dispatch, SetStateAction } from "react";

import { toast } from "react-toastify";

import { FetchDataType } from "@/types/api-response.type";

let counter = 0;

export async function fetchWithToast<T>(
  input: RequestInfo | URL,
  init: RequestInit = {},
  token: string | null = null,
  setToken: Dispatch<SetStateAction<string | null>> = () => {},
  successMessage?: string,
): Promise<FetchDataType<T>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token && token !== "") {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(input, {
    headers,
    ...init,
  });

  const result = await response.json();

  if (!response.ok) {
    if (response.status === 401 && counter === 0) {
      counter++;
      const newToken = await fetchWithToast<string>(
        "/api/auth/refresh-token",
        {},
        null,
        setToken,
      );

      if (newToken.data) {
        setToken(newToken.data);
        counter--;
        return await fetchWithToast<T>(
          input,
          init,
          token,
          setToken,
          successMessage,
        );
      }

      if (newToken.error) {
        setToken(null);
      }
      counter--;
    }

    let message: string = "خطای غیرمنتظره رخ داد.";

    if ("error" in result) {
      message = result.error;
    }

    toast.error(message);

    return { error: message };
  }

  if (successMessage) {
    toast.success(successMessage);
  }

  return { data: result.data };
}
