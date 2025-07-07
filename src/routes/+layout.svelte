<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/Navigation.svelte';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<!-- Navigation -->
<Navigation />

<!-- Main content with top padding for fixed nav -->
<main class="pt-16">
	{@render children?.()}
</main>
