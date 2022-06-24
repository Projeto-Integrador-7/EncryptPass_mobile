import { RefreshToken } from "./refreshToken";

export interface Session {
  user: {
    _id: string;
    name: string;
    email: string;
    passwordReminderTip: string;
    phoneNumber: string;
  },
  refreshToken: RefreshToken;
  token: string;
}