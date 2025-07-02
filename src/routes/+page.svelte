<script>
	import BlogCard from '$lib/BlogCard.svelte';
	import LoadingSpinner from '$lib/LoadingSpinner.svelte';
	import Footer from '$lib/Footer.svelte';

	/**
	 * @typedef {Object} Props
	 * @property {import('./$types').PageData} data
	 * @property {number} [currentPage]
	 * @property {number} [pageSize]
	 */

	/** @type {Props} */
	let { data, currentPage = $bindable(1), pageSize = 3 } = $props();

	let posts = $derived(data.posts);

	async function nextPage() {
		const totalPages = Math.ceil(((await posts).length - 1) / pageSize);
		if (currentPage < totalPages) {
			currentPage += 1;
		}
	}

	async function prevPage() {
		if (currentPage > 1) {
			currentPage -= 1;
		}
	}

	/**
	 * @param {number} pageNum
	 */
	async function goToPage(pageNum) {
		currentPage = pageNum;
	}
</script>

<svelte:head>
	<title>Kent Gruber - Security Engineer</title>
	<meta
		name="description"
		content="Security engineer focused on finding vulnerabilities and building safer systems."
	/>
	<meta
		name="keywords"
		content="security engineer, cybersecurity, static analysis, vulnerability research, software security"
	/>
	<meta property="og:title" content="Kent Gruber - Security Engineer" />
	<meta
		property="og:description"
		content="Security engineer focused on finding vulnerabilities and building safer systems."
	/>
	<meta property="og:type" content="website" />
</svelte:head>

<!-- Hero Section -->
<section
	class="relative min-h-screen flex items-center justify-center bg-white dark:bg-black overflow-hidden pt-16"
>
	<!-- Fluid Background Effects -->
	<div class="absolute inset-0">
		<!-- Main gradient background -->
		<div
			class="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/20 dark:to-purple-950/20"
		></div>

		<!-- Enhanced crystalline orbs positioned around edges -->
		<div class="absolute inset-0 pointer-events-none">
			<!-- Primary large orbs -->
			<!-- Top left corner orb -->
			<div
				class="absolute -top-24 -left-24 w-80 h-80 bg-gradient-to-br from-blue-500/25 via-cyan-400/18 to-transparent rounded-full blur-3xl animate-fluid-drift"
			></div>

			<!-- Top right corner orb -->
			<div
				class="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-bl from-purple-500/22 via-violet-400/16 to-transparent rounded-full blur-3xl animate-fluid-drift animation-delay-2000"
			></div>

			<!-- Bottom left edge orb -->
			<div
				class="absolute -bottom-20 -left-20 w-72 h-72 bg-gradient-to-tr from-emerald-500/20 via-teal-400/14 to-transparent rounded-full blur-2xl animate-fluid-drift animation-delay-4000"
			></div>

			<!-- Bottom right corner orb -->
			<div
				class="absolute -bottom-28 -right-28 w-88 h-88 bg-gradient-to-tl from-indigo-500/23 via-blue-400/17 to-transparent rounded-full blur-3xl animate-fluid-drift animation-delay-6000"
			></div>

			<!-- Left edge mid orb -->
			<div
				class="absolute top-1/3 -left-16 w-64 h-64 bg-gradient-to-r from-cyan-500/18 via-blue-400/12 to-transparent rounded-full blur-2xl animate-fluid-drift animation-delay-1000"
			></div>

			<!-- Right edge mid orb -->
			<div
				class="absolute top-2/3 -right-16 w-56 h-56 bg-gradient-to-l from-violet-500/19 via-purple-400/13 to-transparent rounded-full blur-xl animate-fluid-drift animation-delay-5000"
			></div>

			<!-- Top edge center orb -->
			<div
				class="absolute -top-16 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-gradient-to-b from-rose-400/16 via-pink-300/11 to-transparent rounded-full blur-2xl animate-fluid-drift animation-delay-3000"
			></div>

			<!-- Bottom edge center orb -->
			<div
				class="absolute -bottom-12 left-1/3 w-40 h-40 bg-gradient-to-t from-amber-400/15 via-yellow-300/10 to-transparent rounded-full blur-xl animate-fluid-drift animation-delay-7000"
			></div>

			<!-- Smaller bright accent orbs -->
			<!-- Top edge small bright orb -->
			<div
				class="absolute -top-8 left-1/4 w-24 h-24 bg-gradient-to-br from-cyan-400/35 via-blue-300/25 to-transparent rounded-full blur-lg animate-fluid-drift animation-delay-1500"
			></div>

			<!-- Top right small bright orb -->
			<div
				class="absolute top-12 -right-8 w-20 h-20 bg-gradient-to-bl from-fuchsia-400/40 via-purple-300/28 to-transparent rounded-full blur-md animate-fluid-drift animation-delay-2500"
			></div>

			<!-- Left edge small bright orb -->
			<div
				class="absolute top-1/2 -left-8 w-28 h-28 bg-gradient-to-r from-emerald-400/32 via-teal-300/22 to-transparent rounded-full blur-lg animate-fluid-drift animation-delay-3500"
			></div>

			<!-- Right edge upper small bright orb -->
			<div
				class="absolute top-1/4 -right-6 w-16 h-16 bg-gradient-to-l from-violet-400/38 via-indigo-300/26 to-transparent rounded-full blur-md animate-fluid-drift animation-delay-4500"
			></div>

			<!-- Bottom left small bright orb -->
			<div
				class="absolute -bottom-6 left-1/5 w-22 h-22 bg-gradient-to-tr from-lime-400/36 via-green-300/24 to-transparent rounded-full blur-md animate-fluid-drift animation-delay-5500"
			></div>

			<!-- Bottom right small bright orb -->
			<div
				class="absolute bottom-16 -right-4 w-18 h-18 bg-gradient-to-tl from-rose-400/42 via-pink-300/30 to-transparent rounded-full blur-md animate-fluid-drift animation-delay-6500"
			></div>

			<!-- Mid-left small bright orb -->
			<div
				class="absolute top-3/4 -left-6 w-20 h-20 bg-gradient-to-r from-sky-400/34 via-cyan-300/24 to-transparent rounded-full blur-md animate-fluid-drift animation-delay-7500"
			></div>

			<!-- Top center small bright orb -->
			<div
				class="absolute -top-4 left-2/3 w-14 h-14 bg-gradient-to-b from-indigo-400/40 via-blue-300/28 to-transparent rounded-full blur-sm animate-fluid-drift animation-delay-8500"
			></div>

			<!-- Bottom center small bright orb -->
			<div
				class="absolute -bottom-4 left-2/3 w-16 h-16 bg-gradient-to-t from-orange-400/38 via-amber-300/26 to-transparent rounded-full blur-sm animate-fluid-drift animation-delay-9500"
			></div>

			<!-- Additional edge orbs for more coverage -->
			<!-- Top left small accent -->
			<div
				class="absolute -top-6 left-1/6 w-12 h-12 bg-gradient-to-br from-teal-400/42 via-cyan-300/30 to-transparent rounded-full blur-sm animate-fluid-drift animation-delay-10500"
			></div>

			<!-- Top right small accent -->
			<div
				class="absolute -top-3 right-1/5 w-10 h-10 bg-gradient-to-bl from-pink-400/45 via-rose-300/32 to-transparent rounded-full blur-md animate-fluid-drift animation-delay-11500"
			></div>

			<!-- Bottom left small accent -->
			<div
				class="absolute -bottom-8 left-1/8 w-14 h-14 bg-gradient-to-tr from-yellow-400/40 via-lime-300/28 to-transparent rounded-full blur-sm animate-fluid-drift animation-delay-12500"
			></div>

			<!-- Bottom right small accent -->
			<div
				class="absolute -bottom-3 right-1/6 w-12 h-12 bg-gradient-to-tl from-indigo-400/44 via-violet-300/31 to-transparent rounded-full blur-sm animate-fluid-drift animation-delay-13500"
			></div>

			<!-- Left edge additional -->
			<div
				class="absolute top-1/6 -left-4 w-18 h-18 bg-gradient-to-r from-emerald-400/38 via-green-300/26 to-transparent rounded-full blur-md animate-fluid-drift animation-delay-14500"
			></div>

			<!-- Right edge additional -->
			<div
				class="absolute top-5/6 -right-3 w-16 h-16 bg-gradient-to-l from-purple-400/41 via-fuchsia-300/29 to-transparent rounded-full blur-sm animate-fluid-drift animation-delay-15500"
			></div>

			<!-- Subtle center ambient glow -->
			<div
				class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-indigo-400/8 via-purple-300/6 to-transparent rounded-full blur-3xl animate-gentle-pulse"
			></div>
		</div>

		<!-- Subtle dot grid overlay for texture -->
		<div class="absolute inset-0 pointer-events-none">
			<div
				class="absolute inset-0 bg-[radial-gradient(#c7d2fe_0.5px,transparent_1px)] dark:bg-[radial-gradient(#334155_0.5px,transparent_1px)] [background-size:24px_24px] opacity-40"
			></div>
		</div>

		<!-- Elegant floating dots -->
		<div class="absolute inset-0 pointer-events-none">
			{#each Array(8) as _, i}
				<div
					class="absolute w-0.5 h-0.5 bg-white/60 dark:bg-slate-300/40 rounded-full animate-elegant-float"
					style="
						left: {Math.random() * 100}%; 
						top: {Math.random() * 100}%; 
						animation-delay: -{Math.random() * 25}s;
						animation-duration: {22 + Math.random() * 18}s;
					"
				></div>
			{/each}
		</div>

		<!-- Subtle geometric accents -->
		<div class="absolute inset-0 pointer-events-none">
			<div
				class="absolute top-1/4 right-1/6 w-1 h-12 bg-gradient-to-b from-blue-400/20 to-transparent rotate-12 animate-elegant-float"
			></div>
			<div
				class="absolute bottom-1/3 left-1/5 w-8 h-0.5 bg-gradient-to-r from-purple-400/20 to-transparent animate-elegant-float animation-delay-3000"
			></div>
			<div
				class="absolute top-2/3 right-1/3 w-0.5 h-8 bg-gradient-to-b from-emerald-400/20 to-transparent -rotate-12 animate-elegant-float animation-delay-6000"
			></div>
		</div>

		<!-- Dynamic gradient overlay for light/dark blending -->
		<div
			class="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 dark:to-black/10"
		></div>

		<!-- Dynamic gradient overlay -->
		<div
			class="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 dark:to-black/10"
		></div>
	</div>

	<!-- Main Content -->
	<div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
		<!-- Core Mission Statement with enhanced animation -->
		<div class="animate-fade-in-up">
			<h1
				class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 sm:mb-8 lg:mb-12 leading-tight animate-breathing"
			>
				<!-- First line: "Passionate about" -->
				<span class="block mb-0.5 sm:mb-1 lg:mb-2">Passionate about</span>

				<!-- Second line: "finding vulnerabilities and" -->
				<span class="block mb-0.5 sm:mb-1 lg:mb-2">
					<span class="inline-block animate-slide-in-left animation-delay-300">
						finding
						<span
							class="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient-shift ml-2"
						>
							vulnerabilities
						</span>
					</span>
					<span class="inline-block ml-2">and</span>
				</span>

				<!-- Third line: "building safer systems" -->
				<span class="block mb-0.5 sm:mb-1 lg:mb-2">
					<span class="inline-block animate-slide-in-right animation-delay-600">
						building
						<span
							class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient-shift ml-2"
						>
							safer systems
						</span>
					</span>
				</span>

				<!-- Fourth line: "with wonderful people." -->
				<span class="block">
					<span class="inline-block animate-slide-in-left animation-delay-900">
						with
						<span
							class="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent animate-gradient-shift ml-2"
						>
							wonderful people
						</span><span class="text-slate-900 dark:text-white">.</span>
					</span>
				</span>
			</h1>
		</div>

		<!-- Elegant Scroll Invitation -->
		<div class="mt-16 flex flex-col items-center animate-fade-in-up animation-delay-1200">
			<button
				onclick={() => {
					document.getElementById('blog')?.scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					});
				}}
				class="group relative flex items-center justify-center w-10 h-10 transition-all duration-300 hover:animate-shake"
				aria-label="Scroll to blog section"
			>
				<!-- Subtle glow effect -->
				<div
					class="absolute inset-0 bg-gradient-to-b from-blue-400/10 to-purple-400/10 rounded-lg blur-sm group-hover:from-blue-400/20 group-hover:to-purple-400/20 transition-all duration-300"
				></div>

				<svg
					class="relative h-6 w-6 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 animate-gentle-bounce group-hover:animate-none group-hover:scale-110"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2.5"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
				</svg>
			</button>
		</div>
	</div>
</section>

<!-- About Section -->
<section class="py-12 sm:py-16 lg:py-24 bg-slate-50 dark:bg-slate-900">
	<div class="max-w-6xl mx-auto px-4 sm:px-6">
		<!-- Mobile/Tablet Layout -->
		<div class="lg:hidden">
			<!-- Mobile Header -->
			<div class="text-center mb-8">
				<h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">About Me</h2>
			</div>

			<!-- Mobile Profile Image -->
			<div class="flex justify-center mb-8">
				<div class="relative">
					<img
						src="/profile.png"
						alt="Kent Gruber"
						class="w-32 h-32 sm:w-40 sm:h-40 rounded-xl sm:rounded-2xl object-cover shadow-lg border-2 border-white dark:border-slate-700"
					/>
					<div
						class="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-blue-500/15 to-purple-500/15"
					></div>
				</div>
			</div>

			<!-- Mobile Content - Condensed -->
			<div
				class="space-y-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 text-center sm:text-left"
			>
				<p class="leading-relaxed">
					Security engineer passionate about finding vulnerabilities and building secure systems. I
					focus on static analysis, vulnerability research, and helping teams build safer software.
				</p>

				<!-- Show only key info on mobile -->
				<div class="sm:hidden">
					<p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
						Currently at <span class="font-medium text-blue-600 dark:text-blue-400">Temporal</span>
						as a <br /><strong>Staff Application Security Engineer</strong>.
					</p>
				</div>

				<!-- Show more detail on tablet -->
				<div class="hidden sm:block lg:hidden">
					<p class="leading-relaxed">
						With expertise in security tools and programming languages, I help make security
						knowledge accessible to developers and contribute to open source projects.
					</p>
				</div>
			</div>

			<!-- Mobile CTA -->
			<div class="mt-6 text-center">
				<a
					href="/about"
					class="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm sm:text-base"
				>
					Learn more
					<svg class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 8l4 4m0 0l-4 4m4-4H3"
						/>
					</svg>
				</a>
			</div>
		</div>

		<!-- Desktop Layout -->
		<div class="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
			<!-- About Content -->
			<div class="lg:order-2">
				<h2 class="text-4xl font-bold text-slate-900 dark:text-white mb-6">About Me</h2>
				<div class="space-y-6 text-lg text-slate-600 dark:text-slate-300">
					<p>
						I'm a security engineer with a passion for discovering vulnerabilities, building secure
						systems, and sharing knowledge about cybersecurity practices. My work focuses on static
						analysis, vulnerability research, and helping teams build more secure software.
					</p>
					<p>
						With expertise in various programming languages and security tools, I enjoy diving deep
						into code to understand how systems work and where they might be vulnerable. I believe
						that security is everyone's responsibility and strive to make security knowledge
						accessible to all developers.
					</p>
					<p>
						When I'm not analyzing code or writing about security, you can find me contributing to
						open source projects, attending security conferences, or exploring new technologies that
						can make the internet a safer place.
					</p>
				</div>
				<div class="mt-8">
					<a
						href="/about"
						class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
					>
						Learn more
						<svg class="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							/>
						</svg>
					</a>
				</div>
			</div>

			<!-- Desktop Profile Image -->
			<div class="lg:order-1 lg:flex lg:justify-center">
				<div class="relative">
					<img
						src="/profile.png"
						alt="Kent Gruber"
						class="w-80 h-80 xl:w-96 xl:h-96 rounded-2xl object-cover shadow-2xl border-4 border-white dark:border-slate-700"
					/>
					<div
						class="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20"
					></div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Blog Section -->
<section id="blog" class="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-950">
	<div class="max-w-6xl mx-auto px-4 sm:px-6">
		<!-- Section Header -->
		<div class="text-center mb-8 sm:mb-12 lg:mb-16">
			<h2
				class="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4"
			>
				Blog
			</h2>
			<p class="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
				Thoughts on cybersecurity, software, and more.
			</p>
		</div>

		<!-- Blog Posts -->
		{#await data.posts}
			<LoadingSpinner text="Loading blog posts..." />
		{:then posts}
			{#if posts && posts.length > 0}
				<!-- Featured Post -->
				{#if currentPage === 1 && posts[0]}
					<div class="mb-6 sm:mb-8 lg:mb-12">
						<div
							class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-200 dark:border-slate-600"
						>
							<BlogCard
								post={posts[0]}
								featured={true}
								className="bg-transparent border-0 shadow-none"
							/>
						</div>
					</div>
				{/if}

				<!-- Regular Posts Grid -->
				<div
					class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 items-stretch"
				>
					{#each posts.slice((currentPage - 1) * pageSize + (currentPage === 1 ? 1 : 0), currentPage * pageSize + (currentPage === 1 ? 1 : 0)) as post}
						<BlogCard {post} />
					{/each}
				</div>

				<!-- Pagination -->
				{#if posts.length > pageSize + 1}
					<div class="flex flex-col items-center space-y-4 sm:space-y-6">
						<!-- Page Navigation -->
						<div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-2">
							<button
								onclick={prevPage}
								disabled={currentPage === 1}
								class="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed text-sm px-3 py-2"
								aria-label="Previous page"
							>
								<i class="fas fa-chevron-left mr-2"></i>
								Previous
							</button>

							<!-- Page Numbers -->
							<div class="flex items-center space-x-1">
								{#each Array(Math.ceil((posts.length - 1) / pageSize)) as _, i}
									{#if i + 1 === currentPage}
										<button
											class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-600 text-white font-medium text-sm"
											aria-current="page"
										>
											{i + 1}
										</button>
									{:else if Math.abs(i + 1 - currentPage) <= 1 || i === 0 || i === Math.ceil((posts.length - 1) / pageSize) - 1}
										<button
											onclick={() => goToPage(i + 1)}
											class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 text-sm"
										>
											{i + 1}
										</button>
									{:else if Math.abs(i + 1 - currentPage) === 2}
										<span class="px-1 sm:px-2 text-slate-400 text-sm">...</span>
									{/if}
								{/each}
							</div>

							<button
								onclick={nextPage}
								disabled={currentPage === Math.ceil((posts.length - 1) / pageSize)}
								class="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed text-sm px-3 py-2"
								aria-label="Next page"
							>
								Next
								<i class="fas fa-chevron-right ml-2"></i>
							</button>
						</div>

						<!-- Page Info -->
						<p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 text-center">
							{#if currentPage === 1}
								Showing 1 to {Math.min(pageSize + 1, posts.length)} of {posts.length} posts
							{:else}
								Showing {(currentPage - 1) * pageSize + 1} to {Math.min(
									currentPage * pageSize,
									posts.length
								)} of {posts.length} posts
							{/if}
						</p>
					</div>
				{/if}
			{:else}
				<div class="text-center py-12">
					<i class="fas fa-file-alt text-6xl text-slate-300 dark:text-slate-600 mb-4"></i>
					<h3 class="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
						No posts yet
					</h3>
					<p class="text-slate-600 dark:text-slate-400">Check back soon for new content!</p>
				</div>
			{/if}
		{:catch error}
			<div class="text-center py-12">
				<i class="fas fa-exclamation-triangle text-6xl text-red-400 mb-4"></i>
				<h3 class="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
					Oops! Something went wrong
				</h3>
				<p class="text-slate-600 dark:text-slate-400 mb-4">
					We couldn't load the blog posts. Please try again later.
				</p>
				<button onclick={() => window.location.reload()} class="btn-primary">
					<i class="fas fa-redo mr-2"></i>
					Try Again
				</button>
			</div>
		{/await}
	</div>
</section>

<!-- Footer -->
<Footer />

<style>
	/* Fluid drift animation - more sophisticated movement */
	@keyframes fluid-drift {
		0% {
			transform: translate(0px, 0px) scale(1) rotate(0deg);
		}
		20% {
			transform: translate(15px, -25px) scale(1.05) rotate(72deg);
		}
		40% {
			transform: translate(-10px, 10px) scale(0.95) rotate(144deg);
		}
		60% {
			transform: translate(-25px, -10px) scale(1.02) rotate(216deg);
		}
		80% {
			transform: translate(8px, 20px) scale(0.98) rotate(288deg);
		}
		100% {
			transform: translate(0px, 0px) scale(1) rotate(360deg);
		}
	}

	/* Gentle bouncing for scroll indicator */
	@keyframes gentle-bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-8px);
		}
	}

	.animate-gentle-bounce {
		animation: gentle-bounce 3s ease-in-out infinite;
	}

	/* Gentle pulsing for core elements */
	@keyframes gentle-pulse {
		0%,
		100% {
			transform: translate(-50%, -50%) scale(1);
			opacity: 0.6;
		}
		50% {
			transform: translate(-50%, -50%) scale(1.1);
			opacity: 0.8;
		}
	}

	/* Elegant floating for particles */
	@keyframes elegant-float {
		0%,
		100% {
			transform: translateY(0px) translateX(0px);
			opacity: 0.4;
		}
		25% {
			transform: translateY(-15px) translateX(8px);
			opacity: 0.7;
		}
		50% {
			transform: translateY(-30px) translateX(-5px);
			opacity: 0.4;
		}
		75% {
			transform: translateY(-15px) translateX(-10px);
			opacity: 0.6;
		}
	}

	/* Gradient animation */
	@keyframes gradient-shift {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}

	/* Breathing effect */
	@keyframes breathing {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.02);
		}
	}

	/* Fade in up animation */
	@keyframes fade-in-up {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Slide in animations */
	@keyframes slide-in-left {
		from {
			opacity: 0;
			transform: translateX(-30px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes slide-in-right {
		from {
			opacity: 0;
			transform: translateX(30px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	/* Animation classes */
	.animate-fluid-drift {
		animation: fluid-drift 25s infinite ease-in-out;
	}

	.animate-gentle-pulse {
		animation: gentle-pulse 4s ease-in-out infinite;
	}

	.animate-elegant-float {
		animation: elegant-float 25s infinite ease-in-out;
	}

	.animate-gradient-shift {
		background-size: 300% 300%;
		animation: gradient-shift 8s ease infinite;
	}

	.animate-breathing {
		animation: breathing 6s ease-in-out infinite;
	}

	.animate-fade-in-up {
		animation: fade-in-up 1s ease-out forwards;
	}

	.animate-slide-in-left {
		animation: slide-in-left 0.8s ease-out forwards;
	}

	.animate-slide-in-right {
		animation: slide-in-right 0.8s ease-out forwards;
	}

	/* Animation delays */
	.animation-delay-300 {
		animation-delay: 0.3s;
	}

	.animation-delay-600 {
		animation-delay: 0.6s;
	}

	.animation-delay-900 {
		animation-delay: 0.9s;
	}

	.animation-delay-1000 {
		animation-delay: 1s;
	}

	.animation-delay-1200 {
		animation-delay: 1.2s;
	}

	.animation-delay-1500 {
		animation-delay: 1.5s;
	}

	.animation-delay-2000 {
		animation-delay: 2s;
	}

	.animation-delay-2500 {
		animation-delay: 2.5s;
	}

	.animation-delay-3000 {
		animation-delay: 3s;
	}

	.animation-delay-3500 {
		animation-delay: 3.5s;
	}

	.animation-delay-4000 {
		animation-delay: 4s;
	}

	.animation-delay-4500 {
		animation-delay: 4.5s;
	}

	.animation-delay-5000 {
		animation-delay: 5s;
	}

	.animation-delay-5500 {
		animation-delay: 5.5s;
	}

	.animation-delay-6000 {
		animation-delay: 6s;
	}

	.animation-delay-6500 {
		animation-delay: 6.5s;
	}

	.animation-delay-7000 {
		animation-delay: 7s;
	}

	.animation-delay-7500 {
		animation-delay: 7.5s;
	}

	.animation-delay-8500 {
		animation-delay: 8.5s;
	}

	.animation-delay-9500 {
		animation-delay: 9.5s;
	}

	.animation-delay-10500 {
		animation-delay: 10.5s;
	}

	.animation-delay-11500 {
		animation-delay: 11.5s;
	}

	.animation-delay-12500 {
		animation-delay: 12.5s;
	}

	.animation-delay-13500 {
		animation-delay: 13.5s;
	}

	.animation-delay-14500 {
		animation-delay: 14.5s;
	}

	.animation-delay-15500 {
		animation-delay: 15.5s;
	}

	/* Initial states for animations */
	.animate-fade-in-up,
	.animate-slide-in-left,
	.animate-slide-in-right {
		opacity: 0;
	}
</style>
