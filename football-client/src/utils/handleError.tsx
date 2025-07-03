import { AxiosError } from "axios";
import { toast } from "react-toastify";
import type { ApiResponse } from "../model/ApiResponse";

let hasRedirected401 = false;

export function handleApiError(error: AxiosError) {
  const status = error.response?.status;

  const backendData = error.response?.data as
    | Partial<ApiResponse<unknown>>
    | undefined;
  const backendMessage = backendData?.message;

  const finalMessage =
    backendMessage || error.message || "An unexpected error occurred.";

  switch (status) {
    case 401:
      if (!hasRedirected401) {
        hasRedirected401 = true;
        toast.error(backendMessage || "Session expired. Please log in again.");
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 1000);
      }
      break;
    case 403:
      toast.warning(
        backendMessage || "You do not have permission to perform this action."
      );
      break;
    case 404:
      toast.error(backendMessage || "Resource not found.");
      break;
    case 400:
    case 422:
      toast.error(backendMessage || "Invalid request.");
      break;
    case 500:
      toast.error(backendMessage || "Server error. Please try again later.");
      break;
    default:
      toast.error(finalMessage);
  }

  return Promise.reject(error);
}
