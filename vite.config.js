import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// Used to store the blog posts for the RSS feed plugin.
let blogPosts = [];

function rssPlugin() {
  return {
    name: 'rss-plugin',
    async transformIndexHtml(html) {
      return html.replace(
        '<head>',
        `<head>
          <link rel="alternate" type="application/rss+xml" href="/rss.xml" title="RSS Feed" />
        `
      )
    },
    transform(code, id) {
      if (id.includes('blog/') && id.split('.').pop() === 'svelte') {
        console.info('extracting blog post information from', id);

        let blogID = id?.split('/').pop().split('.')[0];
        let blogTitle = code?.split('title:')[1].split('}')[0].split(',')[0].replace(/"/g, '').trim();
        let blogDate = code?.split('date:')[1].split('}')[0].replace(/"/g, '').trim();

        blogPosts.push({
          id: blogID,
          title: blogTitle,
          date: blogDate,
        });
      }

      return
    },
    buildEnd() {
      console.log("blog posts");
      console.log(blogPosts);
    },
    generateBundle() {
      let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Picat's Blog</title>
    <link>https://picatz.github.io</link>
    <description>Kent 'picat' Gruber's Blog</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <ttl>60</ttl>
    <atom:link href="https://picatz.github.io/rss.xml" rel="self" type="application/rss+xml" />
    ${blogPosts.map((post) => `
      <item>
        <title>${post.title}</title>
        <link>https://picatz.github.io/#blog/${post.id}</link>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <guid>https://picatz.github.io/#blog/${post.id}</guid>
      </item>
    `).join('')}
  </channel>
</rss>`;
      this.emitFile({
        type: 'asset',
        fileName: 'rss.xml',
        source: rss
      });
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    rssPlugin()
  ],
  publicDir: 'public',
  assetsInclude: ['**/me2.png'],
  build: {
    outDir: 'dist',
  }
})
