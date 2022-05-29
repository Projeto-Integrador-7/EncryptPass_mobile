import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosResponse, HeadersDefaults } from 'axios';

import { ResponseSignIn } from "../models/user";
import { Session } from "../models/session";

import useAxios from "../hooks/useAxios";

interface AuthContextData {
  signed: boolean;
  session?: Session;
  loading: boolean;
  signIn(
    email: string,
    password: string
  ): Promise<AxiosResponse<ResponseSignIn>>;
  signOut: () => void;
  updateToken: (
    expiresIn: number,
    _id: string,
    token: string
  ) => void,
}

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ ...props }) {
  const api = useAxios();
  const [session, setSession] = useState<Session>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoregedData() {
      const storegedSession = await AsyncStorage.getItem("auth-session");

      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (storegedSession) {
        setSession(JSON.parse(storegedSession));
        setLoading(false);
      }
    }

    loadStoregedData();
  }, []);

  async function signIn(email: string, password: string) {
    const response = await api.post<ResponseSignIn>("user/login", { email, password });
    if (response.data) {
      setSession({
        user: {
          _id: response.data.userWithRefreshToken._id,
          name: response.data.userWithRefreshToken.name,
        },
        refreshToken: {
          _id: response.data.userWithRefreshToken.refreshToken._id,
          expiresIn: response.data.userWithRefreshToken.refreshToken.expiresIn
        },
        token: response.data.token
      })

      await AsyncStorage.setItem("auth-session", JSON.stringify({
        user: {
          _id: response.data.userWithRefreshToken._id,
          name: response.data.userWithRefreshToken.name,
        },
        refreshToken: {
          _id: response.data.userWithRefreshToken.refreshToken._id,
          expiresIn: response.data.userWithRefreshToken.refreshToken.expiresIn
        },
        token: response.data.token
      }));
    }

    setLoading(false);
    return response;
  }

  async function signOut() {
    await AsyncStorage.clear();
    setSession(undefined);
  }


  async function updateToken(expiresIn: number, _id: string, token: string) {
    await AsyncStorage.setItem("auth-session", JSON.stringify({
      user: {
        _id: session?.user._id,
        name: session?.user.name,
      },
      refreshToken: {
        _id: _id,
        expiresIn: expiresIn
      },
      token: token
    }));
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!session, session, loading, signIn, signOut, updateToken }}
    >
      {props.children}
    </AuthContext.Provider>
  );

}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}