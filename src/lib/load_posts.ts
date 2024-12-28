import type { SvelteComponent } from 'svelte';

type Post = {
	default: typeof SvelteComponent;
	metadata: MetaArticle;
};

export type MetaArticle = {
	link: string;
	title: string;
	tagline?: string;
	favourite?: boolean;
	draft?: boolean;
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
	favourite: boolean;
	draft: boolean;
	content: typeof SvelteComponent;
};

export type LoadOptions = {
	drafts?: 'include' | 'only';
};

export const load_pages = async (opts?: LoadOptions): Promise<Article[]> => {
	const raw = import.meta.glob(`./posts/*.md`, { eager: true });

	const posts = Object.entries(raw)
		.map(([path, untypedPost]) => {
			const post = untypedPost as Post;
			const { tagline, title, tags, updatedAt, favourite, draft } = post.metadata;
			const fname = path.replace(/^.*[\\/]/, '');
			const slug = fname.replace(/\.md$/, '');

			return {
				link: `/blog/${slug}`,
				slug,
				title,
				tagline,
				tags,
				updatedAt: new Date(updatedAt),
				content: post.default,
				favourite: !!favourite,
				draft: !!draft
			};
		})
		.filter(
			(post) =>
				opts?.drafts === 'include' ||
				(opts?.drafts == 'only' && post.draft) ||
				(opts?.drafts === undefined && !post.draft)
		);

	return posts.sort((a, b) => b.updatedAt.valueOf() - a.updatedAt.valueOf());
};
