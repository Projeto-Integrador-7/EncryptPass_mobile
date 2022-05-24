export type RootTabParamList = {
  Dashboard?: undefined;
  PasswordGenerator?: undefined;
  Settings?: undefined;
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
  CreateFolderPassword: {
    _id: string;
    title: string;
  };
  Tabs: RootTabParamList;
}
