import { LoadMore } from "@/components/load-more";
import { useGetListPhoto } from "@/hooks/usePhotos";
import { createFileRoute } from "@tanstack/react-router";
import ImageItem from "@/components/image-item";
import { useState, useEffect } from "react";

const PhotosPage = () => {
	const { list, isLoading, loadMoreProps } = useGetListPhoto();
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const getColumns = () => {
		if (windowWidth >= 1280) return 4;
		if (windowWidth >= 1024) return 3;
		if (windowWidth >= 768) return 2;
		return 1;
	};

	const columns = getColumns();
	const renderClassName = () => {
		if (columns === 1) return "grid grid-cols-1 gap-4 w-full";
		if (columns === 2) return "grid grid-cols-2 gap-4 w-full";
		if (columns === 3) return "grid grid-cols-3 gap-4 w-full";
		if (columns === 4) return "grid grid-cols-4 gap-4 w-full";
	};

	return (
		<main className="pt-10 px-4 md:px-20 flex flex-col items-center">
			<h1 className="text-2xl md:text-6xl mb-10 font-bold uppercase">Photo gallery</h1>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<div className={renderClassName()}>
					{Array.from({ length: columns }).map((_, colIdx) => (
						<div key={colIdx} className="w-full flex-1">
							{list
								.filter((_, idx) => idx % columns === colIdx)
								.map((file) => (
									<ImageItem key={file.id} {...file} />
								))}
						</div>
					))}
				</div>
			)}
			<LoadMore {...loadMoreProps} />
		</main>
	);
};

export const Route = createFileRoute("/photos/")({
	component: PhotosPage,
});
