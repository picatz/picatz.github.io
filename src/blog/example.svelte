<script>
    import BlogPostHeader from '../BlogPostHeader.svelte'
    import Command from '../Command.svelte'
</script>


<section class="section">
    <BlogPostHeader id="example" title="Example" date="2020-01-01" content="This is an example blog post."/>
    <Command input="echo hello"/>
    <p>This is my blog</p>
</section>
