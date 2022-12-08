<script>
    import BlogPostHeader from '../BlogPostHeader.svelte'
    import CodeSnippet from '../CodeSnippet.svelte'
    
    import ReadMore from '../ReadMore.svelte'
    import blogPosts from '../posts.js'
	import Footer from '../Footer.svelte'
    
    import cssSnippet from './readmore.snippet.css?raw'
    import readMore from '../ReadMore.svelte?raw'
</script>

<section class="section">
    <BlogPostHeader id="readmore" title="Read More" date="2022-12-08" />

    <div class="box">
        <p>
            <i class="fas fa-book fa-1x is-grey has-text-grey" style="margin-right: 0.5rem;"></i>
            Many blogging platforms have section at the end of a post that says "Read More from X" or "Continue Reading". 
            This is a good way to keep your readers engaged and to keep them on your site. This is a short write-up on how I did it.
        </p>
    </div>

    <!-- Reference previous post on using Vite to build an RSS feed with a link -->
   <p>
        Following my <a href="/#blog/howitsmade">first post</a> on using <a href="https://svelte.dev">Svelte</a> to build by blog, 
        I used it to build a <strong>Read More</strong> section. This section is a three panel grid,
        with the most recent three posts from my blog displayed with a title, date, and a short excerpt. Each panel
        will link to the full post using its <code>id</code> in the URL.
    </p>

    <br>

    <!-- Three column grid mobile friendly example -->
    <div class="columns is-mobile is-multiline">
        {#each [1,2,3] as i}
            <div class="column">
                <div class="card">
                    <div class="card-content">
                        <p class="title">
                            Post Title {i}
                        </p>
                        <p class="subtitle">
                            Post Date
                        </p>
                        <p>
                            Post excerpt
                        </p>
                    </div>
                </div>
            </div>
        {/each}
    </div>
    <br>

    <p>
        To add a little more style to the cards, I added a <code>box-shadow</code> to the <code>.card</code> class
        with a <code>transform</code> and <code>transition</code> to make the shadow appear to be pressed in when the user hovers over it.    
    </p>

    <br>

    <CodeSnippet
        language="javascript"
        block="
{cssSnippet}
    "
    />

    <br>

    <div class="card example">
        <div class="card-content">
            <!-- a little note in grey over it that says hover over me -->
            <p class="title">
                Post Title
            </p>
            <p class="subtitle">
                Post Date
            </p>
            <p>
                Post excerpt
            </p>
        </div>
    </div>

    <p class="has-text-centered example-pointer">
        <i class="fa-solid fa-arrow-pointer"></i>     
        Try me!
    </p>

    <br>

    <p>
        I created a <code>ReadMore.svelte</code> component that is 
        used to display the reccomended posts. Additionally, it allows
        for control over the number of posts to display and which posts
        in case I want to only display a select few.
    </p>
    
    <br>

    <CodeSnippet
        language="javascript"
        block="
{readMore}"
    />

    <br>
 
    <p>
        An example of how to use the component:
    </p>

    <br>

    <CodeSnippet
        language="javascript"
        block="
<script>
    import ReadMore from './ReadMore.svelte'

    let posts = {'{'}
        readmore: {'{'} 
            etitle: 'Read More',
            date: '2022-12-08',
            excerpt: 'Many blogs have section at...'
        {'}'},
        ...
    {'}'}
</script>

<ReadMore posts={'{'}posts{'}'}/> random=true"/>

    <br>

    <p>
        The <code>random</code> property is optional and will display the posts in a random order if set to <code>true</code>.
        The <code>exclude</code> property is also optional and will exclude the posts with the given <code>id</code> values from being displayed.
    </p>

    <br>

    <p>
        There are a lot of ways to improve this component, but for now it works well enough. I will be adding a <code>Read More</code> section to the bottom of each post.
        Including this one!
    </p>
</section>



<ReadMore posts={blogPosts} random="true" exclude='["readmore"]'/>

<Footer/>

<style>
    .example {
        box-shadow: 0 2px 3px rgba(hsl(0, 0%, 4%).2), 0 0 0 6px hsl(0, 0%, 4%);
        transition: all 0.5s ease-in-out;
    }

    .example:hover {
        box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 2px 4px 0 rgba(10,10,10,.1);
        transition: all 0.5s ease-in-out;
        transform: scale(0.98);
    }

    /* Animate the example-pointer so that it looks like the mouse is hovering over the card 
        by moving it up and down in a spring like fashion */
    .example-pointer {
        animation: example-pointer 3s infinite;
        /* fade the mouse pointer to grey */
        color: grey;
    }

    @keyframes example-pointer {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-0.5rem);
        }
        100% {
            transform: translateY(0);
        }
    }
</style>