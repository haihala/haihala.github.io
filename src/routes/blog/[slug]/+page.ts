import { load_pages } from '$lib/load_posts';
import type { EntryGenerator, PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const post = await import(`../../../lib/posts/${params.slug}.md`);

	return {
		content: post.default
	};
};

export const entries: EntryGenerator = async () => {
	const pages = await load_pages();

	return pages.map((page) => {
		return {
			slug: page.slug
		};
	});
};
