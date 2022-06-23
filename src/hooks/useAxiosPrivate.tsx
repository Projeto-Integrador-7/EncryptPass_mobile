import React from "react";
import axios, { HeadersDefaults } from "axios";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";
import { API_URL } from 'react-native-dotenv';

import { CustomToast } from "../components/CustomToast";

import { RefreshTokenResponse } from "../models/refreshToken";

import { useAuth } from "../contexts/useAuth";
import { useToast } from "native-base";

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

interface JwtDecode {
  exp: number;
}

export default function useAxiosPrivate() {
  const toast = useToast();
  const { session, updateToken, signOut } = useAuth();
  const BASE_URL = API_URL;

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${session?.token}` }
  });

  if (session) {
    axiosInstance.interceptors.request.use(async (req: any) => {
      const decodedToken = jwt_decode<JwtDecode>(session?.token)
      const isTokenExpired = dayjs.unix(decodedToken.exp).diff(dayjs()) < 1;
      const isRefreshTokenExpired = dayjs.unix(session?.refreshToken.expiresIn).diff(dayjs()) < 1;

      if (!isTokenExpired) {
        return req;
      } else {
        if (!isRefreshTokenExpired) {
          try {
            const response = await axios.post<RefreshTokenResponse>(`${BASE_URL}/user/refreshToken`, { refreshToken: session?.refreshToken._id });
            updateToken(response.data.newRefreshToken.expiresIn, response.data.newRefreshToken._id, response.data.token);
            req.headers.Authorization = `Bearer ${response.data.token}`
            return req;
          } catch {
            toast.show({
              render: () => {
                return (
                  <CustomToast
                    type="error"
                    description="Não foi processar sua solicitação, tente novamente mais tarde."
                  />
                )
              }
            });
          }
        } else {
          signOut();
          toast.show({
            render: () => {
              return (
                <CustomToast
                  type="warning"
                  description="Sua sessão expirou. Faça login novamente."
                />
              )
            }
          });
        }
      }
    })
  }


  return axiosInstance;
}