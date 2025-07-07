<script lang="ts">
	import { slide } from 'svelte/transition';

	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<nav
	class="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between h-16">
			<!-- Logo/Brand -->
			<div class="flex items-center">
				<a href="/" class="flex items-center space-x-2 sm:space-x-3 group relative">
					<div
						class="w-8 h-8 sm:w-9 sm:h-9 p-0.5 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg sm:rounded-xl transform transition-all duration-200 group-hover:scale-105"
					>
						<img
							src="/profile.png"
							alt="Kent Gruber"
							class="w-full h-full object-cover rounded-md sm:rounded-lg"
						/>
					</div>

					<!-- Chat Bubble Tooltip -->
					<div
						class="absolute top-12 left-0 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
					>
						<div
							class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 min-w-[280px] backdrop-blur-sm"
						>
							<!-- Arrow pointing up -->
							<div
								class="absolute -top-2 left-4 w-4 h-4 bg-white dark:bg-slate-800 border-l border-t border-slate-200 dark:border-slate-700 transform rotate-45"
							></div>

							<div class="flex items-start space-x-3">
								<!-- Larger profile image -->
								<div class="flex-shrink-0">
									<img
										src="/profile.png"
										alt="Kent Gruber"
										class="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500"
									/>
								</div>

								<!-- Chat content -->
								<div class="flex-1">
									<div
										class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 rounded-lg p-3 relative"
									>
										<p class="text-sm text-slate-700 dark:text-slate-200 font-medium mb-1">
											👋 Hey there! I'm Kent
										</p>
										<p class="text-xs text-slate-600 dark:text-slate-300 mb-2">
											📍 Located in Ann Arbor, Michigan
										</p>
										<p class="text-xs text-slate-600 dark:text-slate-300">
											Recently joined <span class="font-semibold text-blue-600 dark:text-blue-400"
												>Temporal</span
											> as Staff Application Security Engineer (previously at HashiCorp)
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="hidden sm:block">
						<span class="font-bold text-lg sm:text-xl text-slate-900 dark:text-white"
							>Kent Gruber</span
						>
						<div class="text-xs text-slate-500 dark:text-slate-400 font-medium">
							Security Engineer
						</div>
					</div>
				</a>
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center space-x-6">
				<!-- Home Button -->
				<a
					href="/"
					class="relative group inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-200"
				>
					<svg
						class="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
						/>
					</svg>
					Home

					<!-- Simple tooltip -->
					<div
						class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
					>
						<div
							class="bg-slate-900 dark:bg-slate-700 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap"
						>
							Back to homepage
							<div
								class="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-slate-900 dark:border-b-slate-700"
							></div>
						</div>
					</div>
				</a>

				<!-- Blog Link -->
				<a
					href="/#blog"
					class="relative group inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-200"
				>
					<svg
						class="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
					Blog

					<!-- Simple tooltip -->
					<div
						class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
					>
						<div
							class="bg-slate-900 dark:bg-slate-700 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap"
						>
							Read my thoughts on security & tech
							<div
								class="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-slate-900 dark:border-b-slate-700"
							></div>
						</div>
					</div>
				</a>

				<!-- GitHub Link -->
				<a
					href="https://github.com/picatz"
					target="_blank"
					rel="noopener noreferrer"
					class="relative group inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-200"
					aria-label="GitHub Profile"
				>
					<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
						/>
					</svg>
					GitHub

					<!-- Simple tooltip -->
					<div
						class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
					>
						<div
							class="bg-slate-900 dark:bg-slate-700 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap"
						>
							Check out my code & projects
							<div
								class="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-slate-900 dark:border-b-slate-700"
							></div>
						</div>
					</div>
				</a>
			</div>

			<!-- Mobile menu button -->
			<div class="md:hidden flex items-center">
				<button
					onclick={toggleMenu}
					class="p-2.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
					aria-label="Toggle menu"
					aria-expanded={isMenuOpen}
				>
					<svg
						class="h-5 w-5 transition-transform duration-200"
						class:rotate-90={isMenuOpen}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						{#if isMenuOpen}
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						{:else}
							<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
						{/if}
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Navigation Menu -->
	{#if isMenuOpen}
		<div
			class="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800"
			transition:slide={{ duration: 200 }}
		>
			<div class="px-4 pt-3 pb-4 space-y-1">
				<a
					href="/"
					class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
					onclick={() => (isMenuOpen = false)}
				>
					<svg
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
						/>
					</svg>
					Home
				</a>

				<a
					href="/#blog"
					class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
					onclick={() => (isMenuOpen = false)}
				>
					<svg
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
					Blog
				</a>

				<a
					href="https://github.com/picatz"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
					aria-label="GitHub Profile"
					onclick={() => (isMenuOpen = false)}
				>
					<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
						/>
					</svg>
					GitHub
				</a>
			</div>
		</div>
	{/if}
</nav>
