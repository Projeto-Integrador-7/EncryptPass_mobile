import React, { createContext, useContext, useState } from "react";
import { AxiosResponse } from 'axios';

import { User, ResponseSignIn } from "../models/user";

import api from "../services/api";

interface AuthContextData {
  signed: boolean;
  user?: User;
  loading: boolean;
  signIn(
    email: string,
    password: string
  ): Promise<AxiosResponse<ResponseSignIn>>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ ...props }) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  async function signIn(email: string, password: string) {
    const response = await api.post<ResponseSignIn>("user/login", { email, password });


    if(response.data.user){
      setUser(response.data.user);
    }
    
    return response;
  }

  return (
    <AuthContext.Provider
      value={{ signed: true, user, loading, signIn }}
    >
      {props.children}
    </AuthContext.Provider>
  );

}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}