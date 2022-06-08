export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  passwordReminder: string;
  passwordReminderTip: string;
  phoneNumber: string;
  refreshToken: {
    expiresIn: number;
    _id: string;
  }
}

export interface ResponseSignIn {
  userWithRefreshToken: User;
  token: string;
  Sucesso: string;
}
