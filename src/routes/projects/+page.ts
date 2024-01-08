import { load_pages } from '$lib/load_posts';
import type { PageLoad } from './$types';

type Project = {
	name: string;
	main_slug: string;
};

// Order matters here
const projects: Project[] = [
	{
		name: 'Whoops! all grapplers',
		main_slug: 'intro-to-wag'
	},
	{
		name: 'IT Teaching',
		main_slug: 'intro-to-teaching'
	},
	{
		name: 'Webdev',
		main_slug: 'intro-to-webdev'
	}
];

export const load: PageLoad = async () => {
	const fullPosts = await load_pages();

	return {
		posts: projects.map(({ name, main_slug }) => {
			const post = fullPosts.find((p) => p.slug === main_slug);

			return { link: post!.link, heading: name, description: post!.title };
		})
	};
};
