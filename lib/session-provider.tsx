"use client";

import { createContext, useContext } from "react";
import { SessionUser, User } from "./auth";

type SessionContext =
  | { user: User; session: SessionUser | null }
  | { user: User | null; session: SessionUser | null };

const sessionContext = createContext<SessionContext | null>(null);

export default function SessionProvider({
  children,
  value,
}: React.PropsWithChildren<{ value: SessionContext }>) {
  return (
    <sessionContext.Provider value={value}>{children}</sessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(sessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider.");
  }
  return context;
}
