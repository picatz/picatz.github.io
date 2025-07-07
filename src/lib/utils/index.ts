export interface BlogPostMetadata {
	title: string;
	description: string;
	slug: string;
	day: number;
	month: number;
	year: number;
	date: string;
	dateObj: Date;
}

export const listBlogPosts = async (): Promise<BlogPostMetadata[]> => {
	const blogPosts = import.meta.glob('../../routes/blog/**/metadata.json');

	const posts = await Promise.all(
		Object.entries(blogPosts).map(async ([path, read]) => {
			const metadata: any = await read();

			const slug = path.split('/').slice(-2, -1)[0];
			const year = path.split('/')[4];
			const month = path.split('/')[5];
			const day = path.split('/')[6];

			const metadataContent =
				metadata && typeof metadata === 'object' && 'default' in metadata
					? metadata.default
					: metadata;

			const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
			const date = dateObj.toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			});

			return {
				title: (metadataContent && metadataContent['title']) || 'Untitled',
				description:
					(metadataContent && metadataContent['description']) || 'No description available',
				slug: `${year}/${month}/${day}/${slug}`,
				day: parseInt(day),
				month: parseInt(month),
				year: parseInt(year),
				date,
				dateObj
			} as BlogPostMetadata;
		})
	);

	posts.sort((a, b) => {
		return compareDates(a, b);
	});

	return posts;
};

function compareDates(a: BlogPostMetadata, b: BlogPostMetadata): number {
	return b.dateObj.getTime() - a.dateObj.getTime();
}
