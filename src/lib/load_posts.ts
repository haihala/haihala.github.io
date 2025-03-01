import type { SvelteComponent } from 'svelte';

type Post = {
	default: typeof SvelteComponent;
	metadata: MetaArticle;
};

export type MetaArticle = {
	link: string;
	title: string;
	tagline: string;
	favourite?: boolean;
	draft?: boolean;
	tags: string[];
	createdAt: string;
	updatedAt?: string;
};

export type Article = {
	link: string;
	slug: string;
	title: string;
	tagline: string;
	tags: string[];
	createdAt: Date;
	updatedAt?: Date;
	favourite: boolean;
	draft: boolean;
	content: typeof SvelteComponent;
	wordCount: number;
};

type LoadOptions = {
	drafts?: 'include' | 'only';
};

const load_posts = async (opts?: LoadOptions): Promise<Article[]> => {
	const raw = import.meta.glob(`./posts/*.md`, { eager: true });

	const posts = Object.entries(raw)
		.map(([path, untypedPost]) => {
			const post = untypedPost as Post;
			const { tagline, title, tags, createdAt, updatedAt, favourite, draft } = post.metadata;
			const fname = path.replace(/^.*[\\/]/, '');
			const slug = fname.replace(/\.md$/, '');

			return {
				link: `/blog/${slug}`,
				slug,
				title,
				tagline,
				tags,
				createdAt: new Date(createdAt),
				updatedAt: updatedAt === undefined ? undefined : new Date(updatedAt),
				content: post.default,
				favourite: !!favourite,
				draft: !!draft,
				// This was easy, and is proportional, but not accurate.
				// There are a bunch of tags and vite garbage in there
				wordCount: post.default.toString().split(/\s+/).length
			} satisfies Article;
		})
		.filter(
			(post) =>
				opts?.drafts === 'include' ||
				(opts?.drafts == 'only' && post.draft) ||
				(opts?.drafts === undefined && !post.draft)
		);

	return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const public_posts = await load_posts();
export const draft_posts = await load_posts({ drafts: 'only' });
export const all_posts = await load_posts({ drafts: 'include' });
