import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPhotoDetail, getPhotos } from "../services/photos";
import { parseInfiniteData } from "@/lib/utils";
import { useMemo } from "react";

export type PagingParams = {
	page: number;
};

/**
 * Get list of photos with infinite scroll feature.
 */
export const useGetListPhoto = () => {
	const { fetchNextPage, isFetchingNextPage, hasNextPage, data, refetch, isLoading, isRefetching } =
		useInfiniteQuery({
			queryKey: ["photos"],
			queryFn: ({ pageParam }) => {
				const PageNumber = pageParam || 1;
				return getPhotos({ page: PageNumber });
			},
			getNextPageParam: (lastPage) => {
				return lastPage.hasNextPage ? lastPage.pageNumber + 1 : undefined;
			},
			initialPageParam: 0,
			staleTime: 1000 * 60 * 1, // Will refetch after 1 minutes, don't store in cache because of big data will cost a lot of memory
		});
	return {
		list: useMemo(() => parseInfiniteData(data), [data]),
		isLoading,
		isRefetching,
		refetch,
		loadMoreProps: {
			fetchNextPage,
			isFetchingNextPage,
			hasNextPage,
		},
	};
};

/**
 * Get photo detail by id.
 * @param id
 * @returns photo detail
 * @see https://unsplash.com/documentation#get-a-photo
 */
export const useGetPhotoDetail = (id: string) => {
	return useQuery({
		queryKey: ["photos", "detail", id],
		queryFn: () => getPhotoDetail(id),
	});
};
