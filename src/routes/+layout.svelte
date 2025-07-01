<script>
	import '../app.css';
	import Navigation from '$lib/Navigation.svelte';
</script>

<!-- Navigation -->
<Navigation />

<!-- Main content with top padding for fixed nav -->
<main class="pt-16">
	<slot />
</main>
