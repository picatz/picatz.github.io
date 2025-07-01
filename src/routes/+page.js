import { listBlogPosts } from '$lib/utils';

/** @type {import('./$types').PageLoad} */
export async function load() {
    const posts = listBlogPosts();
    return { posts };
}