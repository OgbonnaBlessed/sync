"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface UserInfo {
  name: string;
  image?: string;
}

interface AuthUser {
  userInfo: UserInfo;
  userRole: "principal" | "teacher";
}

const UserContext = createContext<{
  authUser: AuthUser | null;
  setAuthUser: (user: AuthUser | null) => void;
  loading: boolean;
}>({
  authUser: null,
  setAuthUser: () => {},
  loading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    if (user) {
      setAuthUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ authUser, setAuthUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);