<script>
    import BlogPostHeader from '../BlogPostHeader.svelte'
    import CodeSnippet from '../CodeSnippet.svelte'

    import config from './rssvite.snippet.js?raw'
</script>

<section class="section">
    <BlogPostHeader id="rssvite" title="Building an RSS Feed with Vite" date="2022-12-06"/>

    <div class="box">
        <p>
            <i class="fas fa-book fa-1x is-grey has-text-grey" style="margin-right: 0.5rem;"></i>
            On request of a friend, I built an RSS feed for my blog using Vite,
            a build tool for modern web applications. This is a short write-up on how I did it. 
        </p>
    </div>

    <p>
        <a href="https://en.wikipedia.org/wiki/RSS">RSS</a> is a simple <a href="https://en.wikipedia.org/wiki/XML">XML</a> 
        based format for <a href="https://en.wikipedia.org/wiki/Web_syndication"><i>syndicating</i></a> content. It's a great 
        way to keep up with blogs and other websites. To setup an RSS feed for my blog, I decided to use a custom 
        <a href="https://vitejs.dev/">Vite</a> plugin. 
    </p>

    <br>

    <p>
        Vite <a href="https://vitejs.dev/guide/api-plugin.html">plugins</a> extend <a href="https://rollupjs.org/">Rollup</a> style plugins with additional
        functionality. These plugins can be used to customize the build process of a website.
        I edited my <code><a href="https://github.com/picatz/picatz.github.io/blob/master/vite.config.js">vite.config.js</a></code> file to include a function callled <code>rssPlugin</code>:
    </p>

    <br>

    <CodeSnippet
            language="javascript"
            block="
{config}
"
    />

    <p>
        The plugin handles the creation of the RSS feed, adding a generated <code>rss.xml</code> file. This file's content is generated from the blog posts
        in the <code>src/blog</code> folder, extracting the each post's <code>id</code>, <code>title</code>, and <code>date</code>
        into individual objects for the feed generated in <code>generateBundle</code>.
    </p>
</section>