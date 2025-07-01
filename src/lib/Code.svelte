<script>
	import { onMount } from 'svelte';
	import Prism from 'prismjs';
	import 'prismjs/themes/prism-tomorrow.css';
	import 'prismjs/components/prism-clike.js';
	import 'prismjs/components/prism-go.js';
	import 'prismjs/components/prism-bash.js';
	import 'prismjs/components/prism-javascript.js';
	import 'prismjs/components/prism-json.js';
	import 'prismjs/components/prism-ruby.js';

	export let title = '';
	export let copyable = true;
	export let language = 'go'; // Default to Go since this is a Go-focused blog
	export let code = '';

	let codeElement;
	let copied = false;
	let highlightedCode = '';

	$: if (code) {
		highlightCode();
	}

	function highlightCode() {
		if (code && language) {
			try {
				const grammar = Prism.languages[language] || Prism.languages.text;
				highlightedCode = Prism.highlight(code, grammar, language);
			} catch (err) {
				console.warn('Failed to highlight code:', err);
				highlightedCode = code;
			}
		} else {
			highlightedCode = code;
		}
	}

	onMount(() => {
		highlightCode();
	});

	async function copyToClipboard() {
		if (!codeElement) return;

		const text = code || codeElement.textContent;
		try {
			await navigator.clipboard.writeText(text);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	}
</script>

<div class="bg-slate-900 rounded-xl shadow-lg overflow-hidden border border-slate-700">
	<!-- Header -->
	{#if title || copyable}
		<div class="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
			<div class="flex items-center space-x-3">
				<!-- Terminal dots -->
				<div class="flex space-x-2">
					<div class="w-3 h-3 bg-red-500 rounded-full"></div>
					<div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
					<div class="w-3 h-3 bg-green-500 rounded-full"></div>
				</div>
				{#if title}
					<span class="text-slate-300 text-sm font-medium">{title}</span>
				{/if}
			</div>

			{#if copyable}
				<button
					on:click={copyToClipboard}
					class="flex items-center space-x-2 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors duration-200"
					disabled={copied}
				>
					{#if copied}
						<i class="fas fa-check text-green-400"></i>
						<span class="text-green-400">Copied!</span>
					{:else}
						<i class="fas fa-copy"></i>
						<span>Copy</span>
					{/if}
				</button>
			{/if}
		</div>
	{/if}

	<!-- Code content -->
	<div class="p-4 overflow-x-auto">
		{#if code}
			<pre
				bind:this={codeElement}
				class="text-slate-100 font-mono text-sm leading-relaxed">{@html highlightedCode}</pre>
		{:else}
			<pre bind:this={codeElement} class="text-slate-100 font-mono text-sm leading-relaxed"><slot
				/></pre>
		{/if}
	</div>
</div>
