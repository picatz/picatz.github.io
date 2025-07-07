import { listBlogPosts } from '$lib/utils';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const posts = await listBlogPosts();
	const siteUrl = 'https://picatz.github.io';

	const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Kent Gruber's Blog</title>
    <description>Security Engineer's Blog</description>
    <link>${siteUrl}</link>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts
			.map(
				(post) => `
    <item>
      <title>${post.title}</title>
      <description>${post.description}</description>
      <link>${siteUrl}/blog/${post.slug}</link>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>${siteUrl}/blog/${post.slug}</guid>
    </item>`
			)
			.join('')}
  </channel>
</rss>`.trim();

	return new Response(rss, {
		headers: {
			'Content-Type': 'application/rss+xml'
		}
	});
};
