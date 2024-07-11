import { load_pages } from '$lib/load_posts';
import type { PageLoad } from './$types';

type Project = {
	name: string;
	main_slug: string;
};

// Order matters here
const projects: Project[] = [
	{
		name: 'Whoops! All grapplers',
		main_slug: 'intro-to-wag'
	},
	{
		name: 'IT Teaching',
		main_slug: 'intro-to-teaching'
	},
	{
		name: 'Pet projects',
		main_slug: 'intro-to-pet-projects'
	}
];

export const load: PageLoad = async () => {
	const fullPosts = await load_pages();

	return {
		posts: projects.map(({ name, main_slug }) => {
			const post = fullPosts.find((p) => p.slug === main_slug);

			const description = post!.title;

			return {
				link: post!.link,
				heading: name,
				description: description === name ? undefined : description
			};
		})
	};
};

