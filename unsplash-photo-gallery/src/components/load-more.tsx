import { InfiniteQueryObserverBaseResult } from "@tanstack/react-query";
import { useDidUpdate, useInViewRef } from "rooks";

export interface LoadMoreProps {
	hasNextPage: InfiniteQueryObserverBaseResult["hasNextPage"];
	fetchNextPage: InfiniteQueryObserverBaseResult["fetchNextPage"];
	isFetchingNextPage: InfiniteQueryObserverBaseResult["isFetchingNextPage"];

	label?: string;
}

export const LoadMore = (props: LoadMoreProps) => {
	const { hasNextPage, isFetchingNextPage, fetchNextPage, label = "Loading more..." } = props;

	const [ref, isInView] = useInViewRef();

	useDidUpdate(() => {
		if (!isFetchingNextPage && isInView && hasNextPage) {
			fetchNextPage();
		}
	}, [isInView, isFetchingNextPage, hasNextPage]);

	if (!hasNextPage) return null;

	return (
		<>
			<div ref={ref} className="h-10"></div>
			{isFetchingNextPage && (
				<div className="flex justify-center py-3 fixed bottom-0 bg-slate-300/80 rounded-md w-fit px-2 mb-4">
					<span>{label}</span>
				</div>
			)}
		</>
	);
};
