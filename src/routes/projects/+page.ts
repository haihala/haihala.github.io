import { load_pages } from '$lib/load_posts';
import type { PageLoad } from './$types';

type Project = {
	name: string;
	main_slug: string;
	description: string;
};

// Order matters here
const projects: Project[] = [
	{
		name: 'Whoops! All grapplers',
		main_slug: 'wag-intro',
		description: 'A fighting game built in rust'
	},
	{
		name: 'IT Teaching',
		main_slug: 'intro-to-teaching',
		description: 'Lessons from teaching to high schoolers'
	},
	{
		name: 'Pet projects',
		main_slug: 'intro-to-pet-projects',
		description: 'Weekend quickies'
	}
];

export const load: PageLoad = async () => {
	const fullPosts = await load_pages();

	return {
		posts: projects.map(({ name, main_slug, description }) => {
			const post = fullPosts.find((p) => p.slug === main_slug);

			return {
				link: post!.link,
				heading: name,
				description
			};
		})
	};
};
