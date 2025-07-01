<script>
	export let title = '';
	export let subtitle = '';
	export let date = '';

	$: humanDate = new Date(date).toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
</script>

<header class="mb-12">
	<!-- Back navigation -->
	<div class="mb-8">
		<a
			href="/"
			class="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors group"
		>
			<i class="fas fa-arrow-left text-xs group-hover:-translate-x-0.5 transition-transform"></i>
			Back to home
		</a>
	</div>

	<!-- Article header -->
	<div class="space-y-4">
		{#if date}
			<time class="text-sm text-slate-500 font-medium tracking-wide uppercase">
				{humanDate}
			</time>
		{/if}

		<h1 class="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
			{title}
		</h1>

		{#if subtitle}
			<h2 class="text-xl text-slate-600 font-medium leading-relaxed">
				{subtitle}
			</h2>
		{/if}
	</div>

	<!-- Article summary/description -->
	{#if $$slots.default}
		<div class="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-xl">
			<div class="prose prose-slate max-w-none">
				<slot />
			</div>
		</div>
	{/if}
</header>
