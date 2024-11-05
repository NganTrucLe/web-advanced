import { FetchingData } from "@/lib/types/pagination";
import { apiAuth } from "@/services/kyInstance";

const delay = 500;
const localStorageTokenKey = "auth_client_token";

export type AuthInfo = {
  accessToken: string;
};

type SignInParams = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  username: string;
  email: string;
};

export const getAuthValueFromStorage = () => {
  return localStorage.getItem(localStorageTokenKey)
    ? (JSON.parse(localStorage.getItem(localStorageTokenKey) ?? "") as AuthInfo)
    : null;
};

export const signIn = async (params: SignInParams) => {
  const data = (await apiAuth.post("auth/signin", { json: params }).json<FetchingData<AuthInfo>>())
    .data;
  localStorage.setItem(localStorageTokenKey, JSON.stringify(data));
  return data;
};

export const signOut = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      localStorage.clear();
      resolve(void 0);
    }, delay)
  );
};
