import { LogOut } from "lucide-react";
import { useRef } from "react";

import { useSignOut, useUserProfile } from "@/hooks/react-query/useAuth";

import { Button } from "../ui";
import Confetti, { ConfettiRef } from "../ui/confetti";

const WelcomeMessage = ({ username }: { username: string }) => {
  const confettiRef = useRef<ConfettiRef>(null);
  return (
    <>
      <div className="text-center text-2xl font-bold">Welcome to the home page, {username}!</div>
      <Confetti
        ref={confettiRef}
        className="absolute left-0 top-0 -z-10 size-full"
        onMouseEnter={() => {
          confettiRef.current?.fire({});
        }}
      />
    </>
  );
};
export default function HomePage() {
  const signOut = useSignOut();
  const { data, isError, isLoading } = useUserProfile();

  if (isError) {
    signOut.mutate();
    return <div>Session expired</div>;
  }
  return (
    <main className="grid h-screen place-items-center content-center gap-10">
      {isLoading ? (
        <div className="text-center text-2xl font-bold">Loading... </div>
      ) : (
        data && <WelcomeMessage username={data.username || ""} />
      )}
      <Button onClick={() => signOut.mutate()} variant="link" className="text-destructive">
        Sign Out
        <LogOut className="ml-2 size-4" />
      </Button>
    </main>
  );
}
