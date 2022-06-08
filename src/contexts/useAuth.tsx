import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosResponse } from 'axios';

import { ResponseSignIn } from "../models/user";
import { Session } from "../models/session";

import { publicAPI } from "../services/publicAPI";

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
  updateSession: (
    sessionData: Session
  ) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ ...props }) {
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

      setLoading(false);
    }

    loadStoregedData();
  }, []);

  async function signIn(email: string, password: string) {
    const response = await publicAPI.post<ResponseSignIn>("user/login", { email, password });

    const userResponse : Session = {
      user: {
        _id: response.data.userWithRefreshToken._id,
        name: response.data.userWithRefreshToken.name,
        email: response.data.userWithRefreshToken.email,
        passwordReminderTip: response.data.userWithRefreshToken.passwordReminderTip,
        phoneNumber: response.data.userWithRefreshToken.phoneNumber
      },
      refreshToken: {
        _id: response.data.userWithRefreshToken.refreshToken._id,
        expiresIn: response.data.userWithRefreshToken.refreshToken.expiresIn
      },
      token: response.data.token
    }

    if (response.data) {
      setSession(userResponse)

      await AsyncStorage.setItem("auth-session", JSON.stringify(userResponse));
    }

    setLoading(false);

    return response;
  }

  async function signOut() {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await AsyncStorage.clear();
    setSession(undefined);
    setLoading(false);
  }

  async function updateToken(expiresIn: number, _id: string, token: string) {
    const newData : Session = {
      user: {
        _id: String(session?.user._id),
        name: String(session?.user.name),
        email: String(session?.user.email),
        passwordReminderTip: String(session?.user.passwordReminderTip),
        phoneNumber: String(session?.user.phoneNumber)
      },
      refreshToken: {
        _id: _id,
        expiresIn: expiresIn
      },
      token: token
    }

    await AsyncStorage.setItem("auth-session", JSON.stringify(newData));
    setSession(newData);
  }

  async function updateSession(sessionData: Session){
    const newData : Session = {
      user: {
        _id: String(session?.user._id),
        name: sessionData.user.name,
        email: sessionData.user.email,
        passwordReminderTip: sessionData.user.passwordReminderTip,
        phoneNumber: sessionData.user.phoneNumber
      },
      refreshToken: {
        _id: String(session?.refreshToken._id),
        expiresIn: Number(session?.refreshToken.expiresIn)
      },
      token: String(session?.token)
    }

    await AsyncStorage.setItem("auth-session", JSON.stringify(newData));
    setSession(newData);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!session, session, loading, signIn, signOut, updateToken, updateSession }}
    >
      {props.children}
    </AuthContext.Provider>
  );

}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}