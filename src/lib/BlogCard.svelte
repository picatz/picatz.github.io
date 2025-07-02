<script>
	/**
	 * @typedef {Object} Props
	 * @property {any} post
	 * @property {boolean} [featured]
	 * @property {string} [className]
	 */

	/** @type {Props} */
	let { post, featured = false, className = '' } = $props();

	// Format date nicely - handle both numeric and string month values
	let formattedDate = $derived((() => {
		try {
			// If we have a dateObj, use it directly
			if (post.dateObj) {
				return post.dateObj.toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'short',
					day: 'numeric'
				});
			}

			// Create date from numeric values
			const dateObj = new Date(post.year, post.month - 1, post.day);

			// Check if date is valid
			if (isNaN(dateObj.getTime())) {
				return `${post.month}/${post.day}/${post.year}`;
			}

			return dateObj.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			});
		} catch (error) {
			// Fallback to simple format if anything goes wrong
			return `${post.month}/${post.day}/${post.year}`;
		}
	})());

	// Create ISO date string for datetime attribute
	let isoDate = $derived((() => {
		try {
			if (post.dateObj) {
				return post.dateObj.toISOString().split('T')[0];
			}
			const dateObj = new Date(post.year, post.month - 1, post.day);
			if (isNaN(dateObj.getTime())) {
				return `${post.year}-${String(post.month).padStart(2, '0')}-${String(post.day).padStart(2, '0')}`;
			}
			return dateObj.toISOString().split('T')[0];
		} catch (error) {
			return `${post.year}-${String(post.month).padStart(2, '0')}-${String(post.day).padStart(2, '0')}`;
		}
	})());
</script>

<button
	type="button"
	class="group card-hover {className} {featured
		? 'col-span-full'
		: ''} text-left w-full h-full p-0 bg-transparent border-0 focus:outline-none"
	onclick={() => (window.location.href = `/blog/${post.slug}`)}
	onkeydown={(e) => e.key === 'Enter' && (window.location.href = `/blog/${post.slug}`)}
>
	<article
		class="h-full {className.includes('bg-transparent')
			? 'bg-transparent border-0 shadow-none'
			: 'bg-white dark:bg-slate-800'} rounded-lg sm:rounded-xl lg:rounded-2xl {className.includes(
			'border-0'
		)
			? ''
			: 'border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg'} transition-all duration-300 {className.includes(
			'border-0'
		)
			? ''
			: 'group-hover:border-blue-300 dark:group-hover:border-blue-600'} flex flex-col"
	>
		<div class="p-4 sm:p-5 lg:p-6 {featured ? 'lg:p-8' : ''} flex-1 flex flex-col">
			<!-- Header with date -->
			<div
				class="flex flex-col {featured ? 'sm:flex-row' : ''} {featured
					? 'sm:items-center sm:justify-between'
					: ''} mb-3 sm:mb-4 {featured ? 'gap-2 sm:gap-0' : 'gap-2'}"
			>
				<div
					class="flex flex-col {featured ? 'sm:flex-row' : ''} {featured
						? 'sm:items-center'
						: ''} {featured ? 'sm:space-x-3' : ''} space-y-1 {featured ? 'sm:space-y-0' : ''}"
				>
					{#if featured}
						<span
							class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white w-fit"
						>
							<i class="fas fa-star mr-1"></i>
							Featured
						</span>
					{/if}
					<time datetime={isoDate} class="text-sm text-slate-500 dark:text-slate-400 font-medium">
						{formattedDate}
					</time>
				</div>
			</div>

			<!-- Title -->
			<h3
				class="font-bold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 leading-tight {featured
					? 'text-xl sm:text-2xl lg:text-3xl'
					: 'text-base sm:text-lg lg:text-xl'}"
			>
				{post.title}
			</h3>

			<!-- Description -->
			<div class="flex-1 flex flex-col">
				<p
					class="text-slate-600 dark:text-slate-300 mb-4 sm:mb-5 leading-relaxed {featured
						? 'text-base sm:text-lg'
						: 'text-sm sm:text-base'} line-clamp-3 flex-1"
				>
					{post.description}
				</p>

				<!-- Tags/Categories (if available) -->
				{#if post.tags && post.tags.length > 0}
					<div class="flex flex-wrap gap-2 mb-4 sm:mb-5">
						{#each post.tags.slice(0, 3) as tag}
							<span
								class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
							>
								{tag}
							</span>
						{/each}
					</div>
				{/if}

				<!-- Read more link -->
				<div class="flex items-center justify-between mt-auto">
					<a
						href="/blog/{post.slug}"
						class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm group-hover:translate-x-1 transition-all duration-200"
					>
						Read article
						<svg class="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							/>
						</svg>
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
		min-height: 300px;
		flex-direction: column;
	}

	@media (min-width: 640px) {
		button {
			min-height: 340px;
		}
	}

	@media (min-width: 1024px) {
		button {
			min-height: 360px;
		}
	}

	.card-hover {
		transition: transform 0.2s ease-in-out;
	}

	.card-hover:hover {
		transform: translateY(-2px);
	}
</style>
