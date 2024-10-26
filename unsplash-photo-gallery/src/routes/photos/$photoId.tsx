import { useGetPhotoDetail } from "@/hooks/usePhotos";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Blurhash } from "react-blurhash";
import { useState } from "react";
import { ChevronLeftIcon } from "lucide-react";

const PhotoPage = () => {
	const { photoId } = Route.useParams();
	const { data, isLoading, isSuccess } = useGetPhotoDetail(photoId);
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	if (isLoading) return <div>Loading...</div>;
	if (isSuccess && data)
		return (
			<main className="px-20 flex flex-col pb-20">
				<div className="sticky top-0 pt-10 bg-white z-10">
					<Link
						to="/photos"
						className="mb-4 text-blue-500 hover:underline items-center inline-flex"
					>
						<ChevronLeftIcon className="w-6 h-6 inline-block mr-2" />
						Back to gallery
					</Link>
					<div className="flex flex-row gap-2 items-center mb-4">
						<img
							src={data.user.profile_image.medium}
							alt={data.user.name}
							className="rounded-full size-10 inline-block mr-2"
						/>
						<p>{data.user.name}</p>
					</div>
				</div>
				<div className="flex items-center flex-col">
					<div className="grid place-items-center">
						{!isImageLoaded && (
							<Blurhash
								hash={data.blur_hash}
								width={data.width}
								height={data.height}
								resolutionX={32}
								resolutionY={32}
								punch={1}
								style={{ aspectRatio: `${data.width}/${data.height}` }}
								className="max-w-3/4 max-h-[40rem] object-cover rounded-md"
							/>
						)}
						<img
							src={data.urls.regular}
							alt={data.alt_description}
							style={{ aspectRatio: `${data.width}/${data.height}` }}
							srcSet={`${data.urls.thumb} 480w, ${data.urls.small} 800w, ${data.urls.regular} 1200w`}
							className={`max-w-3/4 max-h-[40rem] object-cover rounded-md`}
							onLoad={() => setIsImageLoaded(true)}
						/>
					</div>
					<p className="mt-4 text-xl font-semibold">{data.description ?? data.alt_description}</p>
				</div>
			</main>
		);
	return null;
};

export const Route = createFileRoute("/photos/$photoId")({
	component: PhotoPage,
});
