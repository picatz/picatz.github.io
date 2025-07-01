<script>
	export let text = 'Loading...';
	export let size = 'md'; // 'sm', 'md', 'lg'

	const sizeClasses = {
		sm: 'w-4 h-4',
		md: 'w-8 h-8',
		lg: 'w-12 h-12'
	};
</script>

<div class="flex flex-col items-center justify-center py-12">
	<!-- Animated spinner -->
	<div class="relative">
		<div
			class="{sizeClasses[
				size
			]} border-4 border-slate-200 dark:border-slate-700 border-t-blue-600 rounded-full animate-spin"
		></div>
		<div
			class="absolute inset-0 {sizeClasses[
				size
			]} border-4 border-transparent border-b-purple-600 rounded-full animate-spin"
			style="animation-direction: reverse; animation-duration: 0.8s;"
		></div>
	</div>

	<!-- Loading text -->
	<p class="mt-4 text-slate-600 dark:text-slate-400 font-medium animate-pulse">
		{text}
	</p>

	<!-- Optional dots animation -->
	<div class="flex space-x-1 mt-2">
		<div
			class="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
			style="animation-delay: 0ms;"
		></div>
		<div
			class="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
			style="animation-delay: 150ms;"
		></div>
		<div
			class="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
			style="animation-delay: 300ms;"
		></div>
	</div>
</div>
