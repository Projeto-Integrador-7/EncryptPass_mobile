import React, { useEffect } from "react";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

import { useAuth } from '../contexts/useAuth';
import Loading from "../components/Loading";

export default function Routes() {
  const { signed, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    signed ? <AppRoutes /> : <AuthRoutes />
  )
}