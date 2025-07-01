/**
 * Retrieves a list of blog posts with their metadata.
 * @returns {Promise<Array<Object>>} The list of blog posts with metadata.
 */
export const listBlogPosts = async () => {
  // const blogPosts = import.meta.glob('../../routes/blog/**/+page.svelte');
  const blogPosts = import.meta.glob('../../routes/blog/**/metadata.json');
 
  const posts = await Promise.all(
    Object.entries(blogPosts).map(async ([path, read]) => {
      const metadata = await read();

      const slug = path.split('/').slice(-2, -1)[0];
      const year = path.split('/')[4];
      const month = path.split('/')[5];
      const day = path.split('/')[6];

      // Handle different import formats (ES modules vs JSON)
      const metadataContent = metadata && typeof metadata === 'object' && 'default' in metadata 
        ? metadata.default 
        : metadata;
      
      // Create date properly by parsing the numeric values
      const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      const date = dateObj.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric'
      });

      return {
        title: (metadataContent && metadataContent['title']) || 'Untitled',
        description: (metadataContent && metadataContent['description']) || 'No description available',
        slug: `${year}/${month}/${day}/${slug}`,
        day: parseInt(day),
        month: parseInt(month),
        year: parseInt(year),
        date,
        dateObj // Add the actual date object for easier comparison
      };
    })
  );

  // sort posts by date (newest first)
  posts.sort((a, b) => {
    return compareDates(a, b);
  });

  return posts;
}

/**
 * Compares the dates of two blog posts.
 * @param {Object} a - The first blog post.
 * @param {Object} b - The second blog post.
 * @returns {number} The comparison result.
 */
function compareDates(a, b) {
  // Use the dateObj for more reliable comparison
  return b.dateObj.getTime() - a.dateObj.getTime();
}