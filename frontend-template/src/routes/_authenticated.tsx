import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import ErrorFallback from "@/components/ErrorFallback";
import DashboardLayout from "@/components/layouts/dashboard";
import { authKeys } from "@/hooks/react-query/useAuth";
import { getAuthValueFromStorage, signOut } from "@/services";

const AuthenticatedPage = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    try {
      if (!getAuthValueFromStorage()) {
        return redirect({ to: "/log-in" });
      }
      return true;
    } catch (e) {
      console.error(e);
      return redirect({ to: "/log-in" });
    }
  },
  pendingComponent: () => {
    return <span>Loading Protected</span>;
  },
  errorComponent: (error) => {
    console.error(error);
    return <ErrorFallback />;
  },
  component: AuthenticatedPage,
});
