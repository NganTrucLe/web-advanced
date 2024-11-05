import { LogOut } from "lucide-react";

import { useSignOut, useUserProfile } from "@/hooks/react-query/useAuth";

import { Button } from "../ui";

export default function HomePage() {
  const signOut = useSignOut();
  const { data, isError } = useUserProfile();
  if (isError) {
    signOut.mutate();
    return <div>Session expired</div>;
  }
  return (
    <main className="grid h-screen place-items-center content-center gap-10">
      <div className="text-center text-2xl font-bold">
        {data ? `Welcome to the home page, ${data.username}!` : "Loading..."}
      </div>
      <Button onClick={() => signOut.mutate()} variant="link" className="text-destructive">
        Sign Out
        <LogOut className="ml-2 size-4" />
      </Button>
    </main>
  );
}
