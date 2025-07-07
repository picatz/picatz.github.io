<script lang="ts">
	import Footer from '$lib/Footer.svelte';
</script>

<svelte:head>
	<title>Projects - Kent Gruber</title>
	<meta
		name="description"
		content="Explore Kent Gruber's open source projects and security tools."
	/>
</svelte:head>

<div class="min-h-screen bg-white dark:bg-slate-950">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
		<div class="text-center mb-12">
			<h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Projects</h1>
			<p class="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
				Open source projects, security tools, and experiments in code.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<!-- Project cards will be added here -->
			<div class="card p-6">
				<h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-3">Security Tools</h3>
				<p class="text-slate-600 dark:text-slate-400 mb-4">
					Collection of security analysis and testing tools.
				</p>
				<a href="https://github.com/picatz" class="btn-primary text-sm"> View on GitHub </a>
			</div>

			<div class="card p-6">
				<h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-3">Open Source</h3>
				<p class="text-slate-600 dark:text-slate-400 mb-4">
					Contributing to the security community through open source projects.
				</p>
				<a href="https://github.com/picatz" class="btn-primary text-sm"> Explore Code </a>
			</div>

			<div class="card p-6">
				<h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-3">Research</h3>
				<p class="text-slate-600 dark:text-slate-400 mb-4">
					Security research and vulnerability analysis projects.
				</p>
				<a href="https://github.com/picatz" class="btn-primary text-sm"> View Research </a>
			</div>
		</div>
	</div>
</div>

<Footer />
