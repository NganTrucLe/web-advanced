import { Photo } from "@/services/photos";
import { Link } from "@tanstack/react-router";

export default function ImageItem({ urls, alt_description, user, width, height, id }: Photo) {
	return (
		<Link to={id} className="break-inside-avoid">
			<div
				style={{ aspectRatio: `${width}/${height}` }}
				className="mb-4 grid-item hover:cursor-pointer relative rounded-md overflow-hidden [&_div]:hover:opacity-100 [&_div]:opacity-0 [&_img]:hover:scale-105"
			>
				<img
					src={urls.small}
					srcSet={`${urls.thumb} 480w, ${urls.small} 800w, ${urls.regular} 1200w`}
					sizes="(max-width: 480px) 480px, (max-width: 800px) 800px"
					alt={alt_description}
					className="mb-4 w-full transition-transform duration-300 ease-in-out object-cover"
				/>
				<div className="absolute bottom-0 w-full h-full p-2 flex flex-col gap-2 justify-end bg-black/20 transition-opacity duration-100">
					<div className="flex items-center">
						<img
							src={user.profile_image.small}
							alt={user.name}
							className="rounded-full w-8 h-8 inline-block mr-2"
						/>
						<p className="text-sm font-medium text-white/80 shadow-sm">{user.name}</p>
					</div>
				</div>
			</div>
		</Link>
	);
}
