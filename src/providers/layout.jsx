import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { LayoutProvider, LayoutSplashScreen } from "../components/layout";
export function InitProvider() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <LayoutProvider>
        {/* <AuthInit> */}
          <Outlet />
        {/* </AuthInit> */}
      </LayoutProvider>
    </Suspense>
  );
}


