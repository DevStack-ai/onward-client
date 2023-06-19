import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { LayoutProvider, LayoutSplashScreen } from "../components/layout";
import { AuthInit } from "./auth"
import { Toaster } from 'react-hot-toast';
export function InitProvider() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <LayoutProvider>
        <AuthInit>
          <Toaster />
          <Outlet />
        </AuthInit>
      </LayoutProvider>
    </Suspense>
  );
}


