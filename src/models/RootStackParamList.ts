export type RootTabParamList = {
  Dashboard?: undefined;
  PasswordGenerator?: undefined;
  Settings?: undefined;
  Profile?: undefined;
}

export type RootStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  CreateFolder: undefined;
  Credentials: {
    _id: string;
    title: string;
  }
  Profile: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  ResetPassword: undefined;
  Tabs: RootTabParamList;
}
