import axios from "axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
type ApiErrorResponse = {
  message?: string;
  errors?: { msg: string }[];
};
const axiosInstance = axios.create({
     baseURL: "/newapi",
  headers: {
    "Content-Type": "application/json",
  },
});
// Customize for axios or fetch errors
function handleApiError(error: AxiosError<ApiErrorResponse>): string {
  if (error.response) {
    const { data } = error.response;
    console.log("error", data.message);
    return data?.message || "Server error. Please try again later.";
  } else if (error.request) {
    return "Network error. Please check your connection.";
  } else {
    return error.message || "Unknown error occurred";
  }
}
// Centralized error handling with toaster
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response?.status === 423) {
      return Promise.reject(error); // let caller handle it (your modal)
    }
    // ---- Handle 401 Unauthorized ----
    if (error.response?.status === 401) {
      // Optionally clear local storage / cookies
      localStorage.clear();
      // Redirect to signin page
      if (typeof window !== "undefined") {
        window.location.href = "/signin";
      }
      return Promise.reject(error);
      // Router.push("/signin");
    }
    const message = handleApiError(error);
    toast.error(message, {
      style: {
        "--normal-bg": "var(--background)",
        "--normal-text": "var(--destructive)",
        "--normal-border": "var(--destructive)",
      } as React.CSSProperties,
    });
    return Promise.reject(error);
  }
);

export const connectWithGit = () => {
  window.location.href = "http://127.0.0.1:5000/auth/github";
};

export const getUserInfo = () =>{
  axiosInstance.get("/user-info");
}