type Post = {
	metadata: MetaArticle;
};

export type MetaArticle = {
	link: string;
	title: string;
	tagline?: string;
	tags: string[];
	updatedAt: string;
};

export type Article = {
	link: string;
	slug: string;
	title: string;
	tagline?: string;
	tags: string[];
	updatedAt: Date;
};

export const load_pages = async () => {
	const raw = import.meta.glob(`./posts/*.md`, { eager: true });

	const posts = Object.entries(raw)
		.map(([path, post]) => {
			const { tagline, title, tags, updatedAt } = (post as Post).metadata;
			const fname = path.replace(/^.*[\\/]/, '');
			const slug = fname.replace(/\.md$/, '');

			return {
				link: `/blog/${slug}`,
				slug,
				title,
				tagline,
				tags,
				updatedAt: new Date(updatedAt)
			};
		})
		.sort((a, b) => b.updatedAt.valueOf() - a.updatedAt.valueOf());

	return posts;
};
