import { LoadMore } from "@/components/load-more";
import { useGetListPhoto } from "@/hooks/usePhotos";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomeComponent,
	beforeLoad: async () => {
		return redirect({ to: "/photos" });
	},
});

function HomeComponent() {
	return <div>Home</div>;
}
