type Post = {
	metadata: Article;
};

export type Article = {
	link: string;
	title: string;
	tagline?: string;
	tags: string[];
	published: Date;
};

export const load_pages = async () => {
	const raw = import.meta.glob(`./posts/*.md`, { eager: true });

	const posts = Object.entries(raw)
		.map(([path, post]) => {
			const { tagline, title, tags, published } = (post as Post).metadata;
			const fname = path.replace(/^.*[\\/]/, '');

			return {
				link: `/blog/${fname.replace(/\.md$/, '')}`,
				title,
				tagline,
				tags,
				published
			};
		})
		.sort((a, b) => {
			return a.published.valueOf() - b.published.valueOf();
		});

	return posts;
};
