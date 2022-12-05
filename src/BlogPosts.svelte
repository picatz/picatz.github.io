<script>
    import BlogPost from './BlogPost.svelte';

    export let posts = [];
</script>
  
<section class="section">
    <div class="container is-fluid">
      <div class="content">
        <h1>Blog Posts</h1>
      </div>
        {#each Object.entries(posts) as [id, post]}
            <BlogPost
            id={id}
            title={post.title}
            date={post.date}
            />
        {/each}
    </div>
</section>