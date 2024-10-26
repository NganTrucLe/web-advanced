import ky from "ky";

const BASE_URL = import.meta.env.VITE_UNSPLASH_ENDPOINT || "http://localhost:3000";
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || "YOUR_ACCESS_KEY";
const api = ky.create({
	prefixUrl: `${BASE_URL}`,
	hooks: {
		beforeRequest: [
			async (request) => {
				console.log(ACCESS_KEY);
				request.headers.set("Authorization", `Client-ID ${ACCESS_KEY}`);
			},
		],
	},
});

export const apiAuth = ky.create({ prefixUrl: BASE_URL });

export default api;
