<script lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<footer class="bg-slate-900 text-slate-300 mt-24">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
		<!-- Main footer content -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
			<!-- RSS Feed Section -->
			<div class="space-y-6">
				<h3 class="text-xl font-bold text-white">Stay Updated</h3>
				<p class="text-slate-400 leading-relaxed">
					Get notified about new blog posts and security insights via RSS feed.
				</p>
				<a
					href="/rss.xml"
					class="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-all duration-200 font-medium group"
				>
					<i class="fas fa-rss mr-3 group-hover:scale-110 transition-transform duration-200"></i>
					Subscribe to RSS Feed
				</a>
				<p class="text-sm text-slate-500">
					Compatible with Feedly, Inoreader, and other RSS readers.
				</p>
			</div>

			<!-- Connect Section -->
			<div class="space-y-6">
				<h3 class="text-xl font-bold text-white">Connect</h3>
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<a
						href="https://twitter.com/KentGruber"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center space-x-3 text-slate-400 hover:text-white transition-colors duration-200 p-3 rounded-lg hover:bg-slate-800/50 group"
						aria-label="Twitter"
					>
						<i
							class="fab fa-twitter text-lg w-5 group-hover:scale-110 transition-transform duration-200"
						></i>
						<span class="font-medium">Twitter</span>
					</a>
					<a
						href="https://medium.com/@KentGruber"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center space-x-3 text-slate-400 hover:text-white transition-colors duration-200 p-3 rounded-lg hover:bg-slate-800/50 group"
						aria-label="Medium"
					>
						<i
							class="fab fa-medium text-lg w-5 group-hover:scale-110 transition-transform duration-200"
						></i>
						<span class="font-medium">Medium</span>
					</a>
					<a
						href="https://www.linkedin.com/in/kent-gruber-80ab0a67/"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center space-x-3 text-slate-400 hover:text-white transition-colors duration-200 p-3 rounded-lg hover:bg-slate-800/50 group"
						aria-label="LinkedIn"
					>
						<i
							class="fab fa-linkedin text-lg w-5 group-hover:scale-110 transition-transform duration-200"
						></i>
						<span class="font-medium">LinkedIn</span>
					</a>
					<a
						href="https://github.com/picatz"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center space-x-3 text-slate-400 hover:text-white transition-colors duration-200 p-3 rounded-lg hover:bg-slate-800/50 group"
						aria-label="GitHub"
					>
						<i
							class="fab fa-github text-lg w-5 group-hover:scale-110 transition-transform duration-200"
						></i>
						<span class="font-medium">GitHub</span>
					</a>
				</div>
			</div>
		</div>

		<!-- Bottom section -->
		<div class="border-t border-slate-800 mt-16 pt-8 text-center">
			<p class="text-slate-400 text-sm">
				© {currentYear} Kent Gruber. Made with
				<span class="text-red-500 mx-1">♥</span>
				using SvelteKit
			</p>
		</div>
	</div>
</footer>
