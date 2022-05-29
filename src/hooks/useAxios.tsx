import axios, { HeadersDefaults } from "axios";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";

import { RefreshTokenResponse } from "../models/refreshToken";

import { useAuth } from "../contexts/useAuth";

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

interface JwtDecode {
  exp: number;
}

export default function useAxios() {
  const { session, updateToken } = useAuth();
  const BASE_URL = 'https://encryptpassapi.vercel.app';

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${session?.token}` }
  });

  if (session) {
    axiosInstance.interceptors.request.use(async (req: any) => {
      const decodedToken = jwt_decode<JwtDecode>(session?.token)
      const isExpired = dayjs.unix(decodedToken.exp).diff(dayjs()) < 1;

      if (!isExpired) {
        return req;
      }

      try {
        const response = await axios.post<RefreshTokenResponse>(`${BASE_URL}/user/refreshToken`, { refreshToken: session?.refreshToken._id });
        updateToken(response.data.newRefreshToken.expiresIn, response.data.newRefreshToken._id, response.data.token);
        req.headers.Authorization = `Bearer ${response.data.token}`
        return req;
      } catch {
        console.log('Erro')
      }

    })
  }


  return axiosInstance;
}