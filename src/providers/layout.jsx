import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { LayoutProvider, LayoutSplashScreen } from "../components/layout";
import { AuthInit } from "./auth"

export function InitProvider() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <LayoutProvider>
        <AuthInit>
          <Outlet />
        </AuthInit>
      </LayoutProvider>
    </Suspense>
  );
}


