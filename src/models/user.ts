export interface User {
  name: string;
  email: string;
  password: string;
  passwordReminder: string;
  passwordReminderTip: string;
  phoneNumber: string;
}

export interface ResponseSignIn {
  user?: User;
  token: string
}