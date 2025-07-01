<script>
    import ReadMore from '$lib/BlogReadMore.svelte';
    import Footer from '$lib/Footer.svelte';
</script>

<section class="mt-2 p-6 container mx-auto mb-8">
    <slot/> 
   
    <br>
    
    <ReadMore />
</section>

<Footer />
