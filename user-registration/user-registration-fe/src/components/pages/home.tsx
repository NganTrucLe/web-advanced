import NavBar from "../mocules/nav-bar";

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col">
      <NavBar />
      <main className="grid h-full place-items-center">
        <div className="text-center text-2xl font-bold">Welcome to the home page</div>
      </main>
    </div>
  );
}
