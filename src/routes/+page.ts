import type { PageLoad } from './$types';
import { load_pages, type Article } from '$lib/load_posts';

export const load: PageLoad = async () => {
	const fullPosts = (await load_pages()).sort(
		(a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
	);

	const toCard = ({ link, title, tagline }: Article) => {
		return {
			link,
			heading: title,
			description: tagline
		};
	};

	const favourites = fullPosts.filter((post) => post.favourite).map(toCard);

	const newest = fullPosts.slice(0, 3).map(toCard);

	return {
		favourites,
		newest
	};
};
