import { routeTree } from "./routeTree.gen";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRouter, RouterProvider } from "@tanstack/react-router";

const queryClient = new QueryClient({
	defaultOptions: {},
	queryCache: new QueryCache({
		onError: (error, query) => {
			// 🎉 only show error toasts if we already have data in the cache
			// which indicates a failed background update
			if (query.state.data !== undefined) {
				// toast error message
				console.log(error);
			}
		},
	}),
});

const router = createRouter({
	routeTree,
	context: { queryClient },
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			{/* <ReactQueryDevtools /> */}
		</QueryClientProvider>
	);
}

export default App;
