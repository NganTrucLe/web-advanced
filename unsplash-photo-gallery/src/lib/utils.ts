import { InfiniteData } from "@tanstack/react-query";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const generateSearchParams = (
	data: Record<string, string | string[] | number | boolean | undefined>
) => {
	const params = new URLSearchParams();

	for (const [key, value] of Object.entries(data)) {
		if (value !== undefined && value !== "") {
			if (Array.isArray(value)) {
				value.forEach((val) => {
					if (val !== "") {
						params.append(key, val.toString());
					}
				});
			} else {
				params.append(key, value.toString());
			}
		}
	}

	return params;
};

type PagedData<T> = {
	items: T[];
	pageNumber: number;
	hasNextPage: boolean;
};
export const parseInfiniteData = <T>(data?: InfiniteData<PagedData<T>>) => {
	if (!data) return [];
	return data.pages.map((x) => x.items).flat() || [];
};
