import { RefreshToken } from "./refreshToken";

export interface Session {
  user: {
    _id: string;
    name: string;
  },
  refreshToken: RefreshToken;
  token: string;
}