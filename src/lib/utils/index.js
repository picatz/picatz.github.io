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

      const date = new Date(`${month} ${day}, ${year}`).toLocaleDateString(undefined, { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric'
      });

      return {
        title: metadata.title,
        description: metadata.description,
        slug: `${year}/${month}/${day}/${slug}`,
        day,
        month,
        year,
        date,
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
  const dateA = new Date(`${a.month} ${a.day}, ${a.year}`);
  const dateB = new Date(`${b.month} ${b.day}, ${b.year}`);
  return +dateB - +dateA;
}