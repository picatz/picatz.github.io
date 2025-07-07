import type { PageLoad } from './$types';
import { listBlogPosts } from '$lib/utils';

export const load: PageLoad = async () => {
	const posts = await listBlogPosts();
	return { posts };
};
