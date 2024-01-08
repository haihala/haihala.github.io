import { load_pages } from '$lib/load_posts';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const fullPosts = await load_pages();

	return {
		posts: fullPosts.map(({ link, title, tagline }) => {
			return {
				link,
				heading: title,
				description: tagline
			};
		})
	};
};
