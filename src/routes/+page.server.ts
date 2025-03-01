import type { PageServerLoad } from './$types';
import { load_posts_serializable } from '$lib/load_posts';

export const load: PageServerLoad = async () => {
	const posts = await load_posts_serializable();

	return {
		favourites: posts.filter((post) => post.favourite),
		newest: posts.slice(0, 3)
	};
};
