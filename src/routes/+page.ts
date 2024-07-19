import type { PageLoad } from './$types';
import { load_pages } from '$lib/load_posts';

export const load: PageLoad = async () => {
	const fullPosts = await load_pages();
	const favourites = fullPosts
		.filter((post) => post.favourite)
		.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
		.map(({ link, title, tagline }) => {
			return {
				link,
				heading: title,
				description: tagline
			};
		});

	return {
		favourites
	};
};
