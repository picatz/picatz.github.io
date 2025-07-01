<script>
	export let title = '';
	export let subtitle = '';
	export let date = '';

	$: humanDate = (() => {
		try {
			// Handle different date formats
			let dateObj;
			
			if (date.includes('-')) {
				// Handle formats like "12-29-2022" or "2022-12-29"
				const parts = date.split('-');
				if (parts.length === 3) {
					// Check if it's MM-DD-YYYY or YYYY-MM-DD
					if (parts[0].length === 4) {
						// YYYY-MM-DD format
						dateObj = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
					} else {
						// MM-DD-YYYY format
						dateObj = new Date(parseInt(parts[2]), parseInt(parts[0]) - 1, parseInt(parts[1]));
					}
				}
			} else {
				// Try parsing as-is
				dateObj = new Date(date);
			}
			
			// Check if date is valid
			if (dateObj && !isNaN(dateObj.getTime())) {
				return dateObj.toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				});
			} else {
				// Fallback: return the original date string
				return date;
			}
		} catch (error) {
			// Fallback: return the original date string
			return date;
		}
	})();
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
