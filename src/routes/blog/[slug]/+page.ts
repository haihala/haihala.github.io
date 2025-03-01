import { all_posts } from '$lib/load_posts';
import type { EntryGenerator, PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const main_post = all_posts.find((p) => p.slug === params.slug);
	const similar = all_posts
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

			return b.post.createdAt.getTime() - a.post.createdAt.getTime();
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
	return all_posts;
};
