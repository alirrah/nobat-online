import { ACCESS_TOKEN_KEY } from "@/config";
import { toast } from "react-toastify";

import { FetchDataType } from "@/types/api-response.type";

export async function fetchWithToast<T>(
  input: RequestInfo | URL,
  init: RequestInit = {},
  successMessage?: string,
): Promise<FetchDataType<T>> {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const response = await fetch(input, {
    headers,
    ...init,
  });

  const result = await response.json();

  if (!response.ok) {
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
