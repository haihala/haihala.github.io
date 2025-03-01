import { load_posts_serializable } from '$lib/load_posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		posts: await load_posts_serializable({ drafts: 'only' })
	};
};
