<script lang="ts">
	import { listBlogPosts } from '$lib/utils';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let blogPosts = $state([]);

	// Get 3 random blog posts, not including the current one
	// (using the current slug) and the most recent one
	async function fetchBlogPosts() {
		try {
			blogPosts = await listBlogPosts();
			blogPosts = blogPosts.filter((post) => '/blog/' + post.slug !== page.route.id).slice(0, 2);
		} catch (error) {
			console.error(error);
		}
	}

	onMount(fetchBlogPosts);
</script>

<section class="mt-16 pt-16 border-t border-slate-200">
	<div class="max-w-4xl mx-auto">
		<h2 class="text-2xl font-bold text-slate-900 mb-8">Continue Reading</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			{#each blogPosts as post}
				<a
					href={`/blog/${post.slug}`}
					class="group block p-6 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md transition-all duration-200"
				>
					<div class="space-y-3">
						<div class="flex items-start justify-between gap-4">
							<h3
								class="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight"
							>
								{post.title}
							</h3>
							<time
								class="text-xs text-slate-500 font-medium tracking-wide uppercase whitespace-nowrap"
							>
								{post.date}
							</time>
						</div>
						<p class="text-slate-600 text-sm leading-relaxed line-clamp-3">
							{post.description}
						</p>
						<div
							class="flex items-center text-sm text-blue-600 font-medium group-hover:text-blue-700 transition-colors"
						>
							Read article
							<i
								class="fas fa-arrow-right text-xs ml-2 group-hover:translate-x-0.5 transition-transform"
							></i>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>
