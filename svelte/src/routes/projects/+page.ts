import { load_pages, type Article } from '$lib/load_posts';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const fullPosts = await load_pages();

	const tagged = fullPosts.reduce(
		(acc, next) => {
			for (const tag of next.tags) {
				if (!(tag in acc)) {
					acc[tag] = next;
				} else if (acc[tag].published > next.published) {
					acc[tag] = next;
				}
			}

			return acc;
		},
		{} as Record<string, Article>
	);

	return {
		posts: Object.entries(tagged)
			.map(([tag, post]) => {
				return {
					link: post.link,
					heading: tag,
					description: post.title,
					published: post.published
				};
			})
			.sort((a, b) => a.published.valueOf() - b.published.valueOf())
			.map(({ link, heading, description }) => {
				return { link, heading, description };
			})
	};
};
