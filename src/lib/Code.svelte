<script>
	import { run } from 'svelte/legacy';

	import { onMount } from 'svelte';
	import Prism from 'prismjs';
	import 'prismjs/themes/prism-tomorrow.css';
	import 'prismjs/components/prism-clike.js';
	import 'prismjs/components/prism-go.js';
	import 'prismjs/components/prism-bash.js';
	import 'prismjs/components/prism-javascript.js';
	import 'prismjs/components/prism-json.js';
	import 'prismjs/components/prism-ruby.js';
	import 'prismjs/components/prism-yaml.js';

	if (!Prism.languages.cel) {
		const celString =
			/[rR]?"""[\s\S]*?"""|[rR]?'''[\s\S]*?'''|[rR]?"(?:\\.|[^"\\\r\n])*"|[rR]?'(?:\\.|[^'\\\r\n])*'/;
		Prism.languages.cel = {
			comment: /\/\/.*/,
			bytes: {
				pattern: /[bB](?:[rR]?"""[\s\S]*?"""|[rR]?'''[\s\S]*?'''|[rR]?"(?:\\.|[^"\\\r\n])*"|[rR]?'(?:\\.|[^'\\\r\n])*')/,
				greedy: true,
				alias: 'string'
			},
			string: {
				pattern: celString,
				greedy: true
			},
			number: [
				/\b(?:0x[0-9a-fA-F]+|\d+)[uU]\b/,
				/\b(?:\d+\.\d+(?:[eE][+-]?\d+)?|\d+(?:[eE][+-]?\d+)|\.\d+(?:[eE][+-]?\d+)?)\b/,
				/\b(?:0x[0-9a-fA-F]+|\d+)\b/
			],
			boolean: /\b(?:true|false|null)\b/,
			function: /\b[a-zA-Z_]\w*(?=\s*\()/,
			operator: /==|!=|<=|>=|\|\||&&|\bin\b|[-+*/%<>?:]/,
			punctuation: /[()[\]{},.]/
		};
	}

	if (!Prism.languages['yaml-cel']) {
		Prism.languages['yaml-cel'] = Prism.languages.extend('yaml', {});
		Prism.languages.insertBefore('yaml-cel', 'scalar', {
			'cel-value-single': {
				pattern:
					/(^[ \t]*[^:\r\n]+:\s*)(?='[^'\r\n]*(?:[()=.!]|&&|\|\||\bin\b)[^'\r\n]*')(?:'[^'\r\n]*')/m,
				lookbehind: true,
				inside: {
					punctuation: /'/,
					cel: {
						pattern: /[^']+/,
						inside: Prism.languages.cel
					}
				}
			},
			'cel-value-double': {
				pattern:
					/(^[ \t]*[^:\r\n]+:\s*)(?="[^"\r\n]*(?:[()=.!]|&&|\|\||\bin\b)[^"\r\n]*")(?:\"[^\"\r\n]*\")/m,
				lookbehind: true,
				inside: {
					punctuation: /"/,
					cel: {
						pattern: /[^"]+/,
						inside: Prism.languages.cel
					}
				}
			},
			'cel-block': {
				pattern:
					/(^([ \t]*)when:\s*[|>][ \t]*\r?\n)(?:\2[ \t]+[^\r\n]*(?:\r?\n\2[ \t]+[^\r\n]*)*)/m,
				lookbehind: true,
				inside: Prism.languages.cel
			},
			'cel-inline': {
				pattern: /(^[ \t]*when:[ \t]*)([^#\r\n]+)/m,
				lookbehind: true,
				inside: Prism.languages.cel
			}
		});
	}

	/**
	 * @typedef {Object} Props
	 * @property {string} [title]
	 * @property {boolean} [copyable]
	 * @property {string} [language] - Default to Go since this is a Go-focused blog
	 * @property {string} [code]
	 * @property {string} [codeClass]
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let {
		title = '',
		copyable = true,
		language = 'go',
		code = '',
		codeClass = '',
		children
	} = $props();

	let codeElement = $state();
	let copied = $state(false);
	let highlightedCode = $state('');


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
	run(() => {
		if (code) {
			highlightCode();
		}
	});
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
					onclick={copyToClipboard}
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
				class={`text-slate-100 font-mono text-sm leading-relaxed ${codeClass}`}
				>{@html highlightedCode}</pre>
		{:else}
			<pre
				bind:this={codeElement}
				class={`text-slate-100 font-mono text-sm leading-relaxed ${codeClass}`}
				>{@render children?.()}</pre>
		{/if}
	</div>
</div>
