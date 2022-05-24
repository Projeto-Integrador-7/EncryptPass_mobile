import React, { createContext, useContext, useEffect, useState } from "react";
import { AxiosResponse, HeadersDefaults } from 'axios';

import { User, ResponseSignIn } from "../models/user";

import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextData {
  signed: boolean;
  user?: User;
  loading: boolean;
  token: string;
  signIn(
    email: string,
    password: string
  ): Promise<AxiosResponse<ResponseSignIn>>;
}

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ ...props }) {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoregedData() {
      const storegedUser = await AsyncStorage.getItem("@Auth:user");
      const storegedToken = await AsyncStorage.getItem("@Auth:token");

      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (storegedUser && storegedToken) {
        setUser(JSON.parse(storegedUser));
        api.defaults.headers = { Authorization: `Bearer ${storegedToken}` } as CommonHeaderProperties;
        setLoading(false);
      }
    }

    loadStoregedData();
  }, []);

  async function signIn(email: string, password: string) {
    const response = await api.post<ResponseSignIn>("user/login", { email, password });
    if (response.data.userWithRefreshToken) {
      setUser(response.data.userWithRefreshToken);
      setToken(response.data.token);

      await AsyncStorage.setItem("@Auth:user", JSON.stringify(response.data.userWithRefreshToken));
      await AsyncStorage.setItem("@Auth:token", response.data.token);

      api.defaults.headers = { Authorization: `Bearer ${response.data.token}` } as CommonHeaderProperties;
    }

    setLoading(false);
    return response;
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, token, signIn }}
    >
      {props.children}
    </AuthContext.Provider>
  );

}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}