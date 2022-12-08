<script>
    import BlogPostHeader from '../BlogPostHeader.svelte'
    import Command from '../Command.svelte'
    import CodeSnippet from '../CodeSnippet.svelte'
    
    import ReadMore from '../ReadMore.svelte'
    import blogPosts from '../posts.js'
	import Footer from '../Footer.svelte'
</script>

<section class="section">
    <BlogPostHeader id="howitsmade" title="How it's made" date="2022-12-04" />

    <div class="box">
        <p>
            <i class="fas fa-book fa-1x is-grey has-text-grey" style="margin-right: 0.5rem;"></i>
            For years I've been meaning to build my own blog from scratch. This weekend, I finally made that happen.
            This is how it's made.
        </p>
    </div>

    <p>
        My blog is built with <a href="https://svelte.dev/">Svelte</a>, a JavaScript framework that compiles to HTML,
        CSS, and JavaScript.

        I use GitHub Pages to host the blog, and <a href="https://vitejs.dev/">Vite</a> to build it through
        <a href="https://github.com/features/actions">GitHub Actions</a>. Styling is done
        with
        <a href="https://bulma.io/">Bulma</a>, a CSS framework that is easy to use and looks great. I also use
        <a href="https://fontawesome.com/">Font Awesome</a> for icons.
    </p>

    <br>

    <div class="columns is-mobile has-text-centered is-centered">
        <div class="column is-narrow">
            <img src="https://svelte.dev/svelte-logo.svg" alt="Svelte logo" width="100px">
        </div>

        <div class="column is-narrow">
            <p class="is-size-1" style="margin-top: 1.5rem;">+</p>
        </div>

        <div class="column is-narrow">
            <img src="https://vitejs.dev/logo.svg" alt="Vite logo" width="100px">
        </div>
    </div>

    <p>
        I chose to build my blog from scratch because that is often a fun way to learn. Not because it is the best way
        to build a blog. It provides a ton of flexibility, at the cost of additional maintenance. But,
        I think that is worth it to be able to express myself in a way that is mostly unique to me.
    </p>

    <br>

    <p>
        I've also been using <a href="https://github.com/features/copilot/">GitHub Copilot</a> to help me to build the
        blog, and even write this post. It's a new feature that uses machine learning to help you write code. It's far
        from perfect, but it can help solve some of challenges while writing code, and is particualry useful for quick
        CSS tweaks. It feels like an infintiely better tab complete.
    </p>

    <br>

    <div class="box has-background-white-ter">
        <i class="fas fa-lightbulb fa-1x is-grey has-text-grey" style="margin-right: 0.5rem;"></i>
        I believe programming, like any art, will be impacted dramatically by the introduction of AI. I have an urge
        to resist that, but also want to better understand it. In tandem, I see it a useful tool to help me learn
        and build. Not a replacement.
    </div>

    <br>

    <h2 class="subtitle"><strong>File Structure & Routing</strong></h2>

    <p>
        Blog posts are added as Svelete <a href="https://svelte.dev/docs#component-format">components</a> to
        the <code>src/blog</code> directory. For example, this post is <code>src/blog/howitsmade.svelte</code>
        with <code>howitsmade</code> being the blog ID. The content is written entirely in Svelte, and can
        include any HTML, CSS, or JavaScript.
    </p>

    <br>

    <p>
        This structure serves as foundation for routing of the blog. Each post is routed to <code>/#blog/:id</code>,
        where <code>:id</code> is the blog ID. The <code>src/blog/[id].svelte</code> file is imported
        <a href="https://svelte.dev/docs#template-syntax-svelte-component">dynamically and rendered</a>. This routing
        is hanlded in the <code>src/App.svelete</code> component.
    </p>

    <br>

    <p>
        If there is no blog post with the given ID, an error is shown.
    </p>

    <br>

    <div style="margin-top: 1rem;">
        <div class="has-text-centered">
            <code>https://picatz.github.io/#blog/:id</code>
        </div>

        <div style="margin-top: -.5rem; margin-bottom: -.5rem;">
            <div class="columns is-mobile has-text-centered is-centered">
                <div class="column is-narrow">
                    <p class="is-size-2" style="margin-top: .5rem;">↓</p>
                </div>
            </div>
        </div>

        <div class="has-text-centered">
            <code>src/App.svelte</code>
        </div>


        <div style="margin-top: -.5rem; margin-bottom: -.5rem;">
            <div class="columns is-mobile has-text-centered is-centered">
                <div class="column is-narrow">
                    <p class="is-size-2" style="margin-top: .5rem;">↓</p>
                </div>
            </div>

            <div class="has-text-centered">
                <code>src/blog/[id].svelte</code>
            </div>
        </div>

        <br>

        <h2 class="subtitle" style="margin-top: 2rem;"><strong>Building</strong></h2>

        <p>
            The blog is built with <a href="https://vitejs.dev/">Vite</a>. It is fast, and has a great developer
            experience.
            This is hidden behind <code>npm</code> scripts, which can be run locally or
            remotely through GitHub Actions.
        </p>

        <br>

        <Command input="npm run build" />

        <p>
            The <code>build</code> script runs <code>vite build</code>, which builds the blog into the <code>dist</code>
            directory.
        </p>

        <h2 class="subtitle" style="margin-top: 2rem;"><strong>Deploying</strong></h2>

        <p>
            After a build, the <code>dist</code> directory is uploaded as an artifact and published <a
                href="https://github.com/picatz/picatz.github.io/blob/master/.github/workflows/deploy.yml">using</a> the
            <code><a href="https://github.com/actions/upload-pages-artifact">actions/upload-pages-artifact</a></code>
            and <code><a href="https://github.com/actions/upload-pages-artifact">actions/deploy-page</a></code> actions
            respectively.
            This happens on every <code><a href="https://git-scm.com/docs/git-push">git push</a></code> to the main
            branch.
        </p>

        <br>

        <!-- CodeSnippet block with yaml lang and CSS style the preserves newlines-->
        <CodeSnippet lang="yaml" class="is-clipped" block="
  - name: Build
    run: npm run build
  
  - name: Setup Pages
    uses: actions/configure-pages@v2
  
  - name: Upload Artifact
    uses: actions/upload-pages-artifact@v1
    with:
      path: './dist'
  
  - name: Deploy to GitHub Pages
    uses: actions/deploy-pages@v1
" />

        <p>
            The workflow is <a
                href="https://github.com/picatz/picatz.github.io/blob/c3bee83bfa9f3c212484ef62a026f5dcd3d5fed0/.github/workflows/deploy.yml#L10-L19">configured</a>
            with appropriate permissions and concurrency controls.
        </p>

        <br>

        <CodeSnippet lang="yaml" class="is-clipped" block="
permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true
" />


        <br>

        <h2 class="subtitle"><strong>Future Work</strong></h2>

        <p style="padding-bottom: 1rem;">
            There's a lot of room for improvement. Here are some ideas I have for the future:
        </p>

        <l>
            <li>Better syntax highlight for code snippets.</li>
            <li>Figure out graphing and drawing.</li>
            <li>Add search functionality.</li>
            <li>Spell checking using Vale or similar.</li>
            <li>Investigate SEO and analytics.</li>
            <li>Add staging environments.</li>
            <li>Add more blog content.</li>
        </l>
</section>

<ReadMore posts={blogPosts} random="true" exclude='["hostitsmade"]'/>
<Footer/>