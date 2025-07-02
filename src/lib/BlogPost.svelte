<script>
    import ReadMore from '$lib/BlogReadMore.svelte';
    import Footer from '$lib/Footer.svelte';
   /**
    * @typedef {Object} Props
    * @property {import('svelte').Snippet} [children]
    */

   /** @type {Props} */
   let { children } = $props();
</script>

<section class="mt-2 p-6 container mx-auto mb-8">
    {@render children?.()} 
   
    <br>
    
    <ReadMore />
</section>

<Footer />
