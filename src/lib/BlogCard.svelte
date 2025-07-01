<script>
	export let post;
	export let featured = false;
	export let className = '';

	// Format date nicely
	$: formattedDate = new Date(`${post.month} ${post.day}, ${post.year}`).toLocaleDateString(
		'en-US',
		{
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		}
	);
</script>

<button
	type="button"
	class="group card-hover {className} {featured
		? 'col-span-full lg:col-span-2'
		: ''} text-left w-full h-full p-0 bg-transparent border-0 focus:outline-none"
	on:click={() => (window.location.href = `/blog/${post.slug}`)}
	on:keydown={(e) => e.key === 'Enter' && (window.location.href = `/blog/${post.slug}`)}
>
	<article
		class="h-full {className.includes('bg-transparent')
			? 'bg-transparent border-0 shadow-none'
			: 'bg-white dark:bg-slate-800'} rounded-2xl {className.includes('border-0')
			? ''
			: 'border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg'} transition-all duration-300 {className.includes(
			'border-0'
		)
			? ''
			: 'group-hover:border-blue-300 dark:group-hover:border-blue-600'}"
	>
		<div class="p-6 {featured ? 'lg:p-8' : ''} h-full flex flex-col">
			<!-- Header with date -->
			<div class="flex items-center justify-between mb-4">
				<div class="flex items-center space-x-3">
					{#if featured}
						<span
							class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white"
						>
							<i class="fas fa-star mr-1"></i>
							Featured
						</span>
					{/if}
					<time
						datetime="{post.year}-{post.month.padStart(2, '0')}-{post.day.padStart(2, '0')}"
						class="text-sm text-slate-500 dark:text-slate-400 font-medium"
					>
						{formattedDate}
					</time>
				</div>
			</div>

			<!-- Title -->
			<h3
				class="font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 {featured
					? 'text-2xl lg:text-3xl'
					: 'text-xl'}"
			>
				{post.title}
			</h3>

			<!-- Description -->
			<p
				class="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed {featured
					? 'text-lg'
					: ''} flex-grow"
			>
				{post.description}
			</p>

			<!-- Tags/Categories (if available) -->
			{#if post.tags && post.tags.length > 0}
				<div class="flex flex-wrap gap-2 mb-4">
					{#each post.tags.slice(0, 3) as tag}
						<span
							class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
						>
							{tag}
						</span>
					{/each}
				</div>
			{/if}

			<!-- Read more link -->
			<div class="flex items-center justify-between mt-auto pt-2">
				<a
					href="/blog/{post.slug}"
					class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm group-hover:translate-x-1 transition-all duration-200"
				>
					Read article
					<i class="fas fa-arrow-right ml-2 text-xs"></i>
				</a>

				<!-- Security-related icon if relevant -->
				{#if post.title.toLowerCase().includes('security') || post.title
						.toLowerCase()
						.includes('vulnerability') || post.title.toLowerCase().includes('exploit')}
					<div class="flex items-center text-amber-500 dark:text-amber-400">
						<i class="fas fa-shield-alt text-sm" title="Security-related content"></i>
					</div>
				{/if}
			</div>
		</div>
	</article>
</button>

<style>
	article {
		position: relative;
	}
	button {
		all: unset;
		cursor: pointer;
		display: flex;
		width: 100%;
		height: 100%;
		min-height: 280px;
	}

	.card-hover {
		transition: transform 0.2s ease-in-out;
	}

	.card-hover:hover {
		transform: translateY(-2px);
	}
</style>
