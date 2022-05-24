import React from "react";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

import { useAuth } from '../contexts/useAuth';
import { Text } from "react-native";

export default function Routes(){
  const { signed, loading } = useAuth();

  if(loading && signed === true) {
    return <Text>Aguarde</Text>
  }

  return(
    signed ? <AppRoutes /> : <AuthRoutes />
  )
}