export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  passwordReminder: string;
  passwordReminderTip: string;
  phoneNumber: string;
}

export interface ResponseSignIn {
  userWithRefreshToken?: User;
  token: string
}