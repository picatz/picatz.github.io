<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [icon]
	 * @property {string} [iconColor]
	 * @property {string} [color]
	 * @property {string} [ring]
	 * @property {string} [ringColor]
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let {
		icon = 'fa-info-circle',
		iconColor = 'text-slate-500',
		color = 'bg-gray-200',
		ring = '',
		ringColor = '',
		children
	} = $props();
</script>

<div class="{color} p-2 rounded-lg {ring} {ringColor}">
	<p class="m-4">
		<i class="fas {icon} fa-1x {iconColor} mr-2"></i>
		{@render children?.()}
	</p>
</div>
