import { load_pages } from '$lib/load_posts';
import type { EntryGenerator, PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const pages = await load_pages({ drafts: 'include' });
	const main_post = pages.find((p) => p.slug === params.slug);
	const similar = pages
		.filter((post) => post.slug !== main_post?.slug && !post.draft)
		.map((post) => {
			return {
				post,
				overlap: post.tags.filter((t) => main_post?.tags.includes(t)).length
			};
		})
		.filter((pair) => pair.overlap > 0)
		.sort((a, b) => {
			if (a.overlap !== b.overlap) {
				return a.overlap - b.overlap;
			}

			return b.post.createdAt.valueOf() - a.post.createdAt.valueOf();
		})
		.map(({ post }) => post);

	return {
		title: main_post!.title,
		subtitle: main_post?.tagline,
		content: main_post!.content,
		updatedAt: main_post!.updatedAt,
		createdAt: main_post!.createdAt,
		similar
	};
};

export const entries: EntryGenerator = async () => {
	return await load_pages();
};
