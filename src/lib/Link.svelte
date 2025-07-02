<script>
	/** @type {{ url?: string, children?: import('svelte').Snippet }} */
	let { url, children } = $props();
</script>

<!-- Without this check, other things can break? -->
{#if url}
	<a href={url} class="text-blue-500 hover:underline">
		{@render children?.()}
	</a>
{/if}
