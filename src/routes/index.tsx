import React, { useEffect } from "react";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import * as SplashScreen from "expo-splash-screen";

import { useAuth } from '../contexts/useAuth';
import Loading from "../components/Loading";

export default function Routes() {
  const { signed, loading } = useAuth();

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    async function hidden() {
      await SplashScreen.hideAsync();
    }

    if (loading) {
      prepare();
    } else {
      hidden();
    }
  }, [loading])

  if (loading) {
    return <Loading />;
  }

  return (
    signed ? <AppRoutes /> : <AuthRoutes />
  )
}