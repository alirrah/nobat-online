"use client";

import {
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

type ContextValue = {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
};

export const AuthTokenContext = createContext<ContextValue>({
  token: "",
  setToken: () => {},
});

type Props = PropsWithChildren;

export default function AuthTokenProvider({ children }: Props): ReactNode {
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthTokenContext.Provider value={{ token, setToken }}>
      {children}
    </AuthTokenContext.Provider>
  );
}
