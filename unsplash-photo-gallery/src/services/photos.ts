import { PagingParams } from "@/hooks/usePhotos";
import api from "./kyInstance";
import { generateSearchParams } from "@/lib/utils";

export type Photo = {
	id: string;
	description: string;
	alt_description: string;
	urls: {
		raw: string;
		full: string;
		regular: string;
		small: string;
		thumb: string;
		small_s3: string;
	};
	width: number;
	height: number;
	user: {
		name: string;
		username: string;
		profile_image: {
			small: string;
			medium: string;
			large: string;
		};
	};
	blur_hash: string;
};
export const getPhotos = async ({ page }: PagingParams) => {
	const params = generateSearchParams({ page });
	const data = await api.get("photos", { searchParams: params });
	const linkHeader = data.headers.get("Link");
	let links;
	if (linkHeader) {
		links = linkHeader.split(",").reduce((acc: Record<string, string>, link) => {
			const [url, rel] = link.split(";");
			const cleanUrl = url.trim().slice(1, -1);
			const cleanRel = rel.trim().split("=")[1].slice(1, -1);
			acc[cleanRel] = cleanUrl;
			return acc;
		}, {});
	}
	return {
		items: await data.json<Photo[]>(),
		hasNextPage: Boolean(links && !!links["next"]),
		pageNumber: page,
	};
};
export const getPhotoDetail = async (id: string) => {
	const data = await api.get(`photos/${id}`);
	return data.json<Photo>();
};
