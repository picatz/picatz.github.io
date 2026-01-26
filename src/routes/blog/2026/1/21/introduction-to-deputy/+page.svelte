<script>
	import { onDestroy } from 'svelte';
	import metadata from './metadata.json';
	import BlogHeader from '$lib/BlogHeader.svelte';
	import BlogPost from '$lib/BlogPost.svelte';
	import Code from '$lib/Code.svelte';
	import Link from '$lib/Link.svelte';
	import Panel from '$lib/Panel.svelte';

	const commandCompass = [
		{
			command: 'deputy scan',
			purpose: 'Find known vulnerabilities across repos, dirs, images, VM images, SBOMs, and PURLs',
			why: 'Baseline risk and gate releases',
			preview: '$ deputy scan --policy policy/ci/security-gate.yaml',
			note: ['Add ', { code: '--format json' }, ' when you want machine-readable output.']
		},
		{
			command: 'deputy graph',
			purpose: 'Explore dependency paths (e.g. why a package exists)',
			why: 'Answer "why is this here?" quickly',
			preview: '$ deputy graph why github.com/google/osv-scalibr',
			note: 'Great for explaining transitive deps in PRs.'
		},
		{
			command: 'deputy diff',
			purpose: 'Compare dependency changes between Git refs or container images',
			why: 'Review what actually changed',
			preview: '$ deputy diff main WORKING',
			note: ['Use ', { code: '--policy' }, ' to flag new deps in reviews.']
		},
		{
			command: 'deputy sbom',
			purpose: 'Generate CycloneDX, SPDX, or Protobom SBOMs',
			why: 'Inventory you can share, sign, or archive',
			preview: '$ deputy sbom --format spdx-json --output sbom.spdx.json',
			note: ['Add ', { code: '--enrich-licenses' }, ' when you need license metadata.']
		},
		{
			command: 'deputy list',
			purpose: 'List dependencies as PURLs for scripting',
			why: 'Fast inventory without a full SBOM',
			preview: '$ deputy list --format tsv --no-header',
			note: 'Great for quick checks and pipelines.'
		},
		{
			command: 'deputy fix',
			purpose: 'Generate or apply remediation plans',
			why: 'Turn findings into action',
			preview: '$ deputy fix --report scan.json',
			note: 'Plans are explicit so they can be reviewed.'
		},
		{
			command: 'deputy triage',
			purpose: 'Prioritize findings (optional agent help)',
			why: 'Focus effort where it matters',
			preview: '$ deputy triage --agent claude',
			note: 'Triage reduces noise before you fix.'
		},
		{
			command: 'deputy exec',
			purpose: 'Run commands in a sandbox with supply chain protections',
			why: 'Safer installs and builds',
			preview: '$ deputy exec --review -- npm audit fix',
			note: ['Use ', { code: '--review' }, ' for a human check before syncing changes.']
		},
		{
			command: 'deputy proxy',
			purpose: 'Enforce policies at download time',
			why: 'Block risky dependencies early',
			preview:
				'$ deputy proxy go --policy policy/ci/security-gate.yaml -- go get github.com/example/pkg@latest',
			note: 'Pairs well with policy gates in CI.'
		},
		{
			command: 'deputy policy',
			purpose: 'Lint, test, bundle, and evaluate policies',
			why: 'Treat guardrails as code',
			preview: '$ deputy policy lint policy/ci/security-gate.yaml',
			note: 'Keep policy work testable and reviewable.'
		}
	];

	let activeCommand = commandCompass[0];
	let previewCode = activeCommand.preview;
	let scrambleTimer;
	const scrambleGlyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*+=?<>/\\\\✦✧✶✷⠋⠙';
	const stableGlyphs = new Set([' ', '\n', '\t', '$', '/', '-', '.', ':', '@', '_']);

	const scramblePreview = (target) => {
		if (scrambleTimer) {
			clearTimeout(scrambleTimer);
			scrambleTimer = null;
		}

		if (typeof window !== 'undefined') {
			const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
			if (reduceMotion) {
				previewCode = target;
				return;
			}
		}

		const chars = target.split('');
		let frame = 0;
		const maxFrames = 26;
		const fastPhase = 0.45;
		const fastReveal = 0.6;
		const fastDelay = 26;
		const slowDelay = 68;
		const easeOut = (t) => Math.sin((t * Math.PI) / 2);

		const tick = () => {
			frame += 1;
			const progress = Math.min(1, frame / maxFrames);
			const revealProgress =
				progress < fastPhase
					? (progress / fastPhase) * fastReveal
					: fastReveal + (1 - fastReveal) * easeOut((progress - fastPhase) / (1 - fastPhase));
			const revealCount = Math.floor(revealProgress * chars.length);
			previewCode = chars
				.map((ch, idx) => {
					if (stableGlyphs.has(ch) || idx < revealCount) {
						return ch;
					}
					return scrambleGlyphs[Math.floor(Math.random() * scrambleGlyphs.length)];
				})
				.join('');

			if (frame >= maxFrames) {
				scrambleTimer = null;
				previewCode = target;
				return;
			}

			const delay = progress < fastPhase ? fastDelay : slowDelay;
			scrambleTimer = setTimeout(tick, delay);
		};

		tick();
	};

	const setActiveCommand = (command) => {
		if (command.command === activeCommand.command) return;
		activeCommand = command;
		scramblePreview(command.preview);
	};

	onDestroy(() => {
		if (scrambleTimer) {
			clearTimeout(scrambleTimer);
		}
	});
</script>

<BlogPost>
	<BlogHeader
		title={metadata.title}
		date="1-21-2026"
		subtitle="Secure dependency management at scale, from diff to fix."
	>
		<Link url="https://github.com/picatz/deputy">Deputy</Link> is a tool to help enable secure dependency
		management at scale. It brings the full dependency lifecycle workflow together in one place: vulnerability
		scans, diffs, fixes, SBOMs, sandboxed executions, download-time enforcement, and policy as code.
		It works across repos, directories, container images, VM disk images, SBOMs, one-off PURLs, and more.
		<strong
			>This project is still early and experimental. Expect sharp edges, rapid iteration, and
			continuous feedback loops.</strong
		>
	</BlogHeader>

	<h2 class="text-l mt-10"><strong>The core idea</strong></h2>
	<p class="mt-3">
		Dependencies are most of modern software. They live in repos, images, registries, and SBOMs,
		each with its own identity rules and edge cases. Most tooling solves a slice. You end up doing
		the reconciliation by hand.
	</p>

	<p class="mt-3">
		Deputy flips that. It reconciles everything into a high-fidelity, inspectable dependency
		inventory, and when the input has relationship data, a dependency graph on demand. Then it keeps
		the rest of the workflow close to that foundation: <code>scan</code>
		for known issues, <code>diff</code> for reviews, <code>sbom</code> for sharing and archiving,
		<code>graph why</code> for paths, <code>fix</code> for reviewable remediation plans,
		<code>exec</code> for sandboxed installs and builds, and <code>proxy</code> for enforcement at download
		time.
	</p>

	<p class="mt-3">Deputy helps answer questions you need answered fast:</p>

	<ul class="list-disc ml-6 mt-4">
		<li><strong>What's in here?</strong> (repo, dir, image, Dockerfile, SBOM)</li>
		<li><strong>What changed?</strong> (between two git refs, container images, etc)</li>
		<li><strong>Why is it here?</strong> (the dependency path)</li>
		<li><strong>Is it allowed?</strong> (policy, everywhere)</li>
		<li><strong>What do we do next?</strong> (a reviewable remediation plan)</li>
	</ul>

	<h2 class="text-l mt-10"><strong>Policy keeps the guardrails consistent</strong></h2>
	<p class="mt-3">
		Policies are authored in YAML using <Link url="https://cel.dev/">CEL</Link>, a small expression
		language for writing readable, deterministic checks over structured data. That keeps policies
		easy to review, and the exact same expressions run in local scans, CI, and proxy enforcement.
	</p>
	<p class="mt-3">
		Check them into your repo, lint them in CI, and reuse the same bundle across
		<code>scan</code>, <code>diff</code>, and <code>proxy</code>. They can warn or deny. The point
		is that the same rule shows up in review, in CI, and at download time. If you want to borrow
		patterns, start with the
		<Link url="https://github.com/picatz/deputy/tree/main/policy/examples">policy examples</Link>
		or the
		<Link url="https://github.com/picatz/deputy/tree/main/docs/guides/policy-cookbook.md"
			>policy cookbook</Link
		> for easy recipes.
	</p>

	<div class="mt-6 grid gap-6">
		<div class="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
			<div class="text-xs uppercase tracking-[0.2em] text-slate-500">Example 1</div>
			<h3 class="mt-2 text-lg font-semibold text-slate-900">Block copyleft licenses</h3>
			<p class="mt-2 text-sm text-slate-600">
				A simple compliance guardrail: deny packages with disallowed licenses and flag missing
				metadata. Works anywhere policy is evaluated (scan, diff, proxy, or SBOM analysis).
			</p>
			<div class="mt-4">
				<Code
					title="CEL policy snippet"
					language="yaml-cel"
					code={`policies:
  - name: allow-sans-copyleft
    vars:
      forbidden:
        - SSPL-1.0
        - AGPL-3.0-only
        - GPL-3.0
    rules:
      - action: deny
        when: pkg.licenses.exists(l, l in forbidden)
        reason: package carries a forbidden license`}
				/>
			</div>
			<div class="mt-4">
				<Code
					language="bash"
					copyable={false}
					codeClass="text-xs"
					code={`$ deputy scan --policy policy/examples/license-allowlist.yaml`}
				/>
			</div>
		</div>

		<div class="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
			<div class="text-xs uppercase tracking-[0.2em] text-slate-500">Example 2</div>
			<h3 class="mt-2 text-lg font-semibold text-slate-900">Require review for new dependencies</h3>
			<p class="mt-2 text-sm text-slate-600">
				PR guardrail: allow known prefixes and force review for anything else. This plugs straight
				into <code>deputy diff</code> so reviewers see the policy decision next to the change.
			</p>
			<div class="mt-4">
				<Code
					title="CEL policy snippet"
					language="yaml-cel"
					code={`policies:
  - name: new-dependency-review
    vars:
      approvedPrefixes:
        - github.com/acme
        - npm:@acme
      isAddition: 'change.type == "added"'
      name: 'pkg.name'
      matchesPrefix: 'approvedPrefixes.exists(p, name.lowerAscii().startsWith(p.lowerAscii()))'
    rules:
      - action: deny
        when: env.entrypoint == "diff_dependency_change" && isAddition && !matchesPrefix
        reason: New dependency requires review or is outside the approved allowlist`}
				/>
			</div>
			<div class="mt-4">
				<Code
					language="bash"
					copyable={false}
					codeClass="text-xs"
					code={`$ deputy diff --policy policy/examples/new-dependency-review.yaml main WORKING`}
				/>
			</div>
		</div>

		<div class="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
			<div class="text-xs uppercase tracking-[0.2em] text-slate-500">Example 3</div>
			<h3 class="mt-2 text-lg font-semibold text-slate-900">Block high/critical vulns in CI</h3>
			<p class="mt-2 text-sm text-slate-600">
				A hard gate for release pipelines: fail scans when critical or high vulnerabilities are
				still present. This is the classic “don’t ship with known fires burning” policy.
			</p>
			<div class="mt-4">
				<Code
					title="CEL policy snippet"
					language="yaml-cel"
					code={`policies:
  - name: deny-critical-and-high
    entrypoints: ["scan_report"]
    rules:
      - action: deny
        when: |
          vulnerabilities.orValue([]).exists(v,
            v.advisory.severity.level in [severity.critical, severity.high])
        reason: dependency has unresolved high-severity vulnerabilities`}
				/>
			</div>
			<div class="mt-4">
				<Code
					language="bash"
					copyable={false}
					codeClass="text-xs"
					code={`$ deputy scan --policy policy/examples/severity-guardrail.yaml`}
				/>
			</div>
		</div>
	</div>

	<div class="mt-8 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
		<div class="text-xs uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
			<i class="fas fa-code-branch text-slate-400"></i>
			<span>CI example</span>
		</div>
		<h3 class="mt-2 text-lg font-semibold text-slate-900">
			GitHub Actions: policy gate in one job
		</h3>
		<p class="mt-2 text-sm text-slate-600">
			Same policy bundle, now enforced in CI. Deputy’s GitHub Actions can scan on every push or PR
			and upload SARIF to Code Scanning. See the
			<Link url="https://github.com/picatz/deputy/tree/main/docs/guides/github-actions.md"
				>GitHub Actions guide</Link
			>
			for options.
		</p>
		<div class="mt-4">
			<Code
				title="GitHub Actions (scan + policy)"
				language="yaml"
				code={`name: Security Scan
on: [push, pull_request]

permissions:
  security-events: write
  contents: read

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: picatz/deputy/actions/setup@main
      - uses: picatz/deputy/actions/scan@main
        with:
          upload-sarif: true
          policy: policy/ci/security-gate.yaml`}
			/>
		</div>
	</div>

	<div class="mt-8">
		<Code
			title="One policy, everywhere"
			language="bash"
			code={`# Sanity check a policy bundle
$ deputy policy lint policy/ci/security-gate.yaml

# Enforce policy during scan
$ deputy scan --policy policy/ci/security-gate.yaml

# Require review for new dependencies in diffs
$ deputy diff --policy policy/ci/pr-review.yaml main WORKING

# Block risky downloads at install time
$ deputy proxy go --policy policy/ci/security-gate.yaml -- go get github.com/example/pkg@latest`}
		/>
	</div>

	<h2 class="text-l mt-10"><strong>The command compass</strong></h2>

	<p class="mt-3">
		Deputy has enough subcommands that it's worth a map. The full list is in the
		<Link url="https://github.com/picatz/deputy/tree/main/docs/commands/README.md"
			>command docs</Link
		>.
	</p>
	<p class="mt-2 text-sm text-slate-500">Hover a command to preview a real invocation.</p>

	<div class="mt-8">
		<div class="overflow-hidden rounded-xl ring-1 ring-slate-200">
			<table class="table-auto w-full text-left text-sm">
				<thead class="bg-slate-100/80 text-slate-700">
					<tr>
						<th class="p-3 font-semibold">Command</th>
						<th class="p-3 font-semibold">Purpose</th>
						<th class="p-3 font-semibold">Why it matters</th>
					</tr>
				</thead>
				<tbody>
					{#each commandCompass as cmd (cmd.command)}
						<tr
							class={`group border-b border-slate-200/70 transition-colors hover:bg-slate-50/80 focus-within:bg-slate-50/80 cursor-pointer ${
								activeCommand.command === cmd.command ? 'bg-slate-50/80' : ''
							}`}
							on:mouseenter={() => setActiveCommand(cmd)}
						>
							<td class="p-3">
								<button
									type="button"
									class="inline-flex items-center gap-2 text-left"
									aria-pressed={activeCommand.command === cmd.command}
									aria-label={`Preview ${cmd.command}`}
									on:focus={() => setActiveCommand(cmd)}
									on:click={() => setActiveCommand(cmd)}
								>
									<code
										class={`rounded-md px-2 py-1 text-xs ring-1 transition ${
											activeCommand.command === cmd.command
												? 'bg-slate-900 ring-slate-900'
												: 'bg-slate-100 ring-slate-200 group-hover:bg-slate-800 group-hover:ring-slate-800'
										}`}
									>
										<span
											class={`font-mono ${
												activeCommand.command === cmd.command
													? 'text-slate-400'
													: 'text-slate-500 group-hover:text-slate-300'
											}`}
										>
											deputy
										</span>
										<span
											class={`ml-1 font-semibold ${
												activeCommand.command === cmd.command
													? 'text-slate-100'
													: 'text-slate-900 group-hover:text-slate-100'
											}`}
										>
											{cmd.command.replace('deputy ', '')}
										</span>
									</code>
								</button>
							</td>
							<td class="p-3 text-slate-700">{cmd.purpose}</td>
							<td class="p-3 text-slate-600">{cmd.why}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div
			class="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-5 shadow-sm"
		>
			<div
				class="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-500"
			>
				<span class="inline-flex items-center gap-2">
					<i class="fas fa-terminal text-slate-400"></i>
					<span>Command preview</span>
				</span>
				<span class="font-mono">{activeCommand.command}</span>
			</div>
			<div class="mt-3">
				<Code language="bash" copyable={false} code={previewCode} />
			</div>
			{#if activeCommand.note}
				<p class="mt-3 text-sm text-slate-600">
					{#if Array.isArray(activeCommand.note)}
						{#each activeCommand.note as part}
							{#if typeof part === 'string'}
								{part}
							{:else}
								<code>{part.code}</code>
							{/if}
						{/each}
					{:else}
						{activeCommand.note}
					{/if}
				</p>
			{/if}
		</div>
	</div>

	<h2 class="text-l mt-10"><strong>Where to start</strong></h2>

	<p class="mt-3">A few on-ramps, depending on what you're trying to solve:</p>

	<ul class="list-disc ml-6 mt-4">
		<li>
			<strong>Developers / PR reviewers:</strong> start with <code>deputy diff</code>. If something
			looks weird, follow with <code>deputy scan</code> and <code>deputy graph why</code>.
		</li>
		<li>
			<strong>Security:</strong> start with a policy bundle, run it in CI, then consider rolling out
			<code>deputy proxy</code>.
		</li>
		<li>
			<strong>Platform/CI:</strong> generate an SBOM with <code>deputy sbom</code> and keep it as a
			build artifact, then <code>scan</code> or <code>diff</code> it later.
		</li>
		<li>
			<strong>New to Deputy:</strong> run <code>deputy init</code> to generate a starter
			<code>.deputy.yaml</code> and policy bundle, then iterate from there.
		</li>
	</ul>

	<p class="mt-3">
		If you want the guided tour:
		<Link url="https://github.com/picatz/deputy/tree/main/docs/getting-started.md"
			>getting started</Link
		>, the <Link url="https://github.com/picatz/deputy/tree/main/docs/cheatsheet.md"
			>cheat sheet</Link
		>,
		<Link url="https://github.com/picatz/deputy/tree/main/docs/guides/workflows.md">workflows</Link
		>, and the <Link url="https://github.com/picatz/deputy/tree/main/docs/guides/ci.md"
			>CI guide</Link
		>.
	</p>

	<h2 class="text-l mt-10"><strong>Targets everywhere</strong></h2>

	<p class="mt-3">
		Deputy commands take a target, meaning the thing you want to analyze. A target can be a repo, a
		directory, a container image, a VM disk image, an SBOM document, a Dockerfile, or a single
		package identified by a PURL.
	</p>

	<p class="mt-3">
		Deputy inspects the target you pass in and applies the right semantics for that artifact. That
		might mean extracting packages from a filesystem view, importing an SBOM document, or parsing a
		Dockerfile, then applying the same policies to the results. For repos and directories, Deputy
		can also resolve dependency relationships from manifests and lockfiles, which powers graph
		questions like <code>deputy graph why</code>. When relationship data is missing or partial,
		Deputy falls back to a flat inventory that is still useful for scans, diffs, and SBOMs.
	</p>

	<p class="mt-3">
		SBOM files and one-off PURLs skip extraction and go straight to analysis. Dockerfiles are parsed
		for static dependency analysis rather than scanned like a filesystem. As Deputy grows, the
		intent is to keep this pipeline stable so new target kinds can slot in cleanly, including live
		targets like a running container or a cloud artifact like Lambda.
	</p>

	<ul class="list-disc ml-6 mt-4">
		<li><strong>Repositories</strong> (local or remote Git) and plain directories</li>
		<li><strong>Container images</strong> (remote registries, local Docker daemon, tarballs)</li>
		<li>
			<strong>VM disk images</strong> (qcow2, vmdk, vhd, vhdx, vdi, raw) and
			<strong>raw filesystem images</strong> (ext4)
		</li>
		<li><strong>SBOM files</strong> (CycloneDX / SPDX / Protobom JSON)</li>
		<li><strong>PURLs</strong> for one-off package queries</li>
		<li><strong>Dockerfiles</strong> for static dependency analysis</li>
	</ul>

	<p class="mt-3">
		For VM disk images, Deputy stays unprivileged. It reads the disk image, parses the partition
		table (GPT or MBR), identifies a Linux partition, opens the filesystem (ext4), and walks it to
		build the inventory. No mounts and no root.
	</p>

	<p class="mt-4">
		More details:
		<Link url="https://github.com/picatz/deputy/tree/main/docs/concepts/targets-and-refs.md"
			>targets and refs</Link
		>, <Link url="https://github.com/picatz/deputy/tree/main/docs/guides/container-images.md"
			>container images</Link
		>, and
		<Link url="https://github.com/picatz/deputy/tree/main/docs/guides/dockerfile.md"
			>Dockerfile scanning</Link
		>.
	</p>

	<div class="mt-8">
		<Code
			title="Scan anything"
			language="bash"
			code={`# Scan the current repo
$ deputy scan

# Scan a remote repo at a ref
$ deputy scan github.com/picatz/deputy --ref main

# Scan a container image
$ deputy scan image nginx:1.25

# Scan a VM disk image
$ deputy scan vm:///path/to/disk.qcow2

# Scan a rootfs filesystem image
$ deputy scan rootfs:///path/to/rootfs.ext4

# Scan an SBOM file from another tool
$ deputy scan sbom sbom.spdx.json

# Scan a single package by PURL
$ deputy scan purl pkg:golang/github.com/gin-gonic/gin@v1.9.0`}
		/>
	</div>


	<div class="mt-8">
		<Code
			title="Scan output (excerpt)"
			language="bash"
			code={`$ deputy scan

Scan Results:
  Target: /repo/deputy
  Ref: WORKING (b0f72a3)
  Origin: https://github.com/picatz/deputy.git

∴ Vulnerabilities Found:

github.com/google/osv-scalibr v0.3.3 [direct]:
  • CVE-2025-13425 [LOW] (↑ 0.3.4) [2 related]
    OSV-SCALIBR has NULL Pointer Dereference
    Aliases: GHSA-f786-75f3-74xj, GO-2025-4149
    Published: 2025-11-20
    Context:
      Sources:
        • go.mod
      Artifacts:
        • deputy (go)

Vulnerability Summary:
  ↑ 1 can be fixed by upgrading

Recommended Actions:
  1. Upgrade affected modules
       go.mod:
         › go get github.com/google/osv-scalibr@0.3.4
         ↻ go mod tidy`}
		/>
	</div>

	<p class="mt-3">
		When something pops up, the next question is always: "why is this here?"
		<code>deputy graph why</code> answers with the dependency path. More in the
		<Link url="https://github.com/picatz/deputy/tree/main/docs/commands/graph.md">graph docs</Link>.
	</p>

	<div class="mt-8">
		<Code
			title="Why is this dependency here?"
			language="bash"
			code={`$ deputy graph why github.com/google/osv-scalibr
github.com/google/osv-scalibr@0.3.3
[direct dependency]`}
		/>
	</div>

	<h2 class="text-l mt-10">
		<strong><code>deputy triage</code>: turn findings into priorities</strong>
	</h2>

	<p class="mt-3">
		Scanning is cheap. Decision-making isn't. <code>deputy triage</code> helps you turn a raw report
		into priorities you can act on, and it can optionally pull in an agent for extra context. The
		<Link url="https://github.com/picatz/deputy/tree/main/docs/commands/triage.md">triage docs</Link
		>
		cover report formats and flags.
	</p>

	<div class="mt-8">
		<Code
			title="Triage workflows"
			language="bash"
			code={`# Triage the current repo
$ deputy triage

# Delegate prioritization to an agent
$ deputy triage --agent claude`}
		/>
	</div>

	<h2 class="text-l mt-10"><strong><code>deputy diff</code>: where reviews get real</strong></h2>

	<p class="mt-3">
		For PR review or base-image bumps, <code>deputy diff</code> answers the only question that matters:
		"what actually changed?" It works on Git refs and container images, and it can include vulnerability
		deltas and policy findings so you can spot regressions before you merge them.
	</p>

	<div class="mt-8">
		<Code
			title="Diff repos and containers"
			language="bash"
			code={`# Git diff (default in a repo)
$ deputy diff main WORKING

# Compare container images
$ deputy diff nginx:1.24 nginx:1.25

# Use local Docker daemon images to avoid pull limits
$ deputy diff --source docker-daemon python:3.11 python:3.12`}
		/>
	</div>

	<div class="mt-8">
		<Code
			title="Diff summary (excerpt)"
			language="bash"
			code={`$ deputy diff
Comparing dependencies: main -> HEAD

Dependency Changes:
  ↑ github.com/google/osv-scalibr @ 0.3.2 -> 0.3.4 [direct]
  ↑ golang.org/x/crypto @ 0.44.0 -> 0.46.0 [direct]
  + cloud.google.com/go/compute/metadata @ 0.9.0 [indirect]
  ↓ osv.dev/bindings/go @ 0.0.0-20250905014459-96958296f6f2 → 0.0.0-20250808040635-c189436f8791 [direct]

Summary:
  + 1 packages
  ↑ 2 packages
  ↓ 1 package
  
✓ No vulnerabilities found`}
		/>
	</div>

	<h2 class="text-l mt-10"><strong><code>deputy proxy</code>: enforce at download time</strong></h2>

	<p class="mt-3">
		<code>deputy proxy</code> runs at download time. It supports Go, npm, PyPI, RubyGems, and OCI,
		and it uses the same policy bundles you run in <code>scan</code> and <code>diff</code>, so the
		decision stays consistent. This is where your toolchain reaches out to the internet. It's a
		great place to enforce guardrails before a dependency lands in a lockfile or image layer.
	</p>

	<div
		class="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-5 shadow-sm"
	>
		<div class="text-xs uppercase tracking-[0.2em] text-slate-500">Proxy in practice</div>
		<div class="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
			<div
				class="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm flex h-full flex-col"
			>
				<div class="text-xs uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
					<i class="fas fa-laptop-code text-slate-400"></i>
					<span>Local dev</span>
				</div>
				<div class="mt-3 flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
					<div
						class="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[0.7rem] leading-tight font-medium text-slate-700"
					>
						Developer
					</div>
					<svg
						class="h-4 w-4 text-slate-400 rotate-90 xl:rotate-0"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M12.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L15.586 11H1a1 1 0 110-2h14.586l-3.293-3.293a1 1 0 010-1.414z"
						/>
					</svg>
					<div
						class="flex-1 rounded-xl border border-slate-200 bg-slate-900 px-3 py-2 text-[0.7rem] leading-tight font-semibold text-slate-100"
					>
						Deputy proxy
					</div>
					<svg
						class="h-4 w-4 text-slate-400 rotate-90 xl:rotate-0"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M12.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L15.586 11H1a1 1 0 110-2h14.586l-3.293-3.293a1 1 0 010-1.414z"
						/>
					</svg>
					<div
						class="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[0.7rem] leading-tight font-medium text-slate-700"
					>
						Registry
					</div>
				</div>
				<p class="mt-3 text-xs text-slate-600">
					Policies live in the repo and enforce guardrails on every download while you work.
				</p>
				<div class="mt-auto pt-3">
					<Code
						language="bash"
						copyable={false}
						codeClass="text-xs"
						code={`$ deputy proxy go --policy policy/ci/security-gate.yaml -- go get github.com/example/pkg@latest`}
					/>
				</div>
			</div>

			<div
				class="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm flex h-full flex-col"
			>
				<div class="text-xs uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
					<i class="fas fa-gears text-slate-400"></i>
					<span>CI job</span>
				</div>
				<div class="mt-3 flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
					<div
						class="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[0.7rem] leading-tight font-medium text-slate-700"
					>
						CI runner
					</div>
					<svg
						class="h-4 w-4 text-slate-400 rotate-90 xl:rotate-0"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M12.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L15.586 11H1a1 1 0 110-2h14.586l-3.293-3.293a1 1 0 010-1.414z"
						/>
					</svg>
					<div
						class="flex-1 rounded-xl border border-slate-200 bg-slate-900 px-3 py-2 text-[0.7rem] leading-tight font-semibold text-slate-100"
					>
						Deputy proxy
					</div>
					<svg
						class="h-4 w-4 text-slate-400 rotate-90 xl:rotate-0"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M12.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L15.586 11H1a1 1 0 110-2h14.586l-3.293-3.293a1 1 0 010-1.414z"
						/>
					</svg>
					<div
						class="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[0.7rem] leading-tight font-medium text-slate-700"
					>
						Registry
					</div>
				</div>
				<p class="mt-3 text-xs text-slate-600">
					The exact same policies run inside the pipeline during installs and image pulls.
				</p>
				<div class="mt-auto pt-3">
					<Code
						language="bash"
						copyable={false}
						codeClass="text-xs"
						code={`$ deputy proxy npm --policy policy/ci/license-allowlist.yaml -- npm ci`}
					/>
				</div>
			</div>

			<div
				class="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm flex h-full flex-col"
			>
				<div class="text-xs uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
					<i class="fas fa-lock text-slate-400"></i>
					<span>Remote proxy with auth</span>
				</div>
				<div class="mt-3 flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
					<div
						class="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[0.7rem] leading-tight font-medium text-slate-700"
					>
						Dev or CI
					</div>
					<svg
						class="h-4 w-4 text-slate-400 rotate-90 xl:rotate-0"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M12.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L15.586 11H1a1 1 0 110-2h14.586l-3.293-3.293a1 1 0 010-1.414z"
						/>
					</svg>
					<div
						class="flex-1 rounded-xl border border-slate-200 bg-amber-50 px-3 py-2 text-[0.7rem] leading-tight font-semibold text-amber-900"
					>
						Auth and policy
					</div>
					<svg
						class="h-4 w-4 text-slate-400 rotate-90 xl:rotate-0"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M12.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L15.586 11H1a1 1 0 110-2h14.586l-3.293-3.293a1 1 0 010-1.414z"
						/>
					</svg>
					<div
						class="flex-1 rounded-xl border border-slate-200 bg-slate-900 px-3 py-2 text-[0.7rem] leading-tight font-semibold text-slate-100"
					>
						Deputy proxy
					</div>
					<svg
						class="h-4 w-4 text-slate-400 rotate-90 xl:rotate-0"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M12.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L15.586 11H1a1 1 0 110-2h14.586l-3.293-3.293a1 1 0 010-1.414z"
						/>
					</svg>
					<div
						class="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[0.7rem] leading-tight font-medium text-slate-700"
					>
						Registry
					</div>
				</div>
				<p class="mt-3 text-xs text-slate-600">
					Central proxy with JWT or OIDC auth and shared policy bundles for teams.
				</p>
				<div class="mt-auto pt-3">
					<Code
						language="bash"
						copyable={false}
						codeClass="text-xs"
						code={`$ deputy proxy serve --config proxy.yaml`}
					/>
				</div>
			</div>
		</div>
		<p class="mt-4 text-xs text-slate-500">
			Policy decisions stay the same. Local and CI use repo policies. Remote adds auth and shared
			bundles.
		</p>
	</div>

	<p class="mt-3">
		If you're thinking about rolling it out beyond a single repo, the
		<Link url="https://github.com/picatz/deputy/tree/main/docs/guides/proxy-rollout.md"
			>proxy rollout guide</Link
		>
		covers the operational rollout details. The
		<Link url="https://github.com/picatz/deputy/tree/main/docs/commands/proxy.md">proxy docs</Link>
		cover config and auth.
	</p>

	<div class="mt-8">
		<Code
			title="Proxy in front of registries"
			language="bash"
			code={`# Run commands through the proxy with policies
$ deputy proxy go --policy policy/ci/security-gate.yaml -- go get github.com/example/pkg@latest
$ deputy proxy npm --policy policy/ci/license-allowlist.yaml -- npm install

# Run a standalone proxy service
$ deputy proxy template > proxy.yaml
$ deputy proxy serve --config proxy.yaml`}
		/>
	</div>

	<h2 class="text-l mt-10"><strong>Composable workflows</strong></h2>

	<p class="mt-3">
		Most commands can emit JSON, so you can treat them like building blocks: pipe outputs around or
		save them as artifacts. A <code>scan</code> can feed <code>triage</code> or a <code>fix</code>
		plan. An <code>sbom</code> can be generated once and scanned later. In CI, you can stash the JSON
		output and SBOM alongside build artifacts, which keeps "what did we know then?" conversations short.
	</p>

	<div class="mt-8">
		<Code
			title="From scan to fix"
			language="bash"
			code={`# Generate a JSON scan report
$ deputy scan --format json --output scan.json

# Turn that report into a remediation plan
$ deputy fix --report scan.json

# Or stream the report directly into fix
$ deputy scan --format json | deputy fix --report -`}
		/>
	</div>

	<div class="mt-8">
		<Code
			title="SBOM as a stable artifact"
			language="bash"
			code={`# Generate an SPDX SBOM
$ deputy sbom --format spdx-json --output sbom.spdx.json

# Scan the SBOM later
$ deputy scan sbom sbom.spdx.json`}
		/>
	</div>

	<h2 class="text-l mt-10"><strong><code>deputy fix</code>: remediation plans</strong></h2>

	<p class="mt-3">
		<code>deputy fix</code> prints an explicit plan first, because dependency changes deserve the
		same review as code changes. You can review it, export it, or apply it. If you run an agent,
		keep it behind a sandbox and keep review checkpoints in place. More in the
		<Link url="https://github.com/picatz/deputy/tree/main/docs/commands/fix.md">fix docs</Link>.
	</p>

	<div class="mt-8">
		<Code
			title="Fix workflows"
			language="bash"
			code={`# Generate a plan
$ deputy fix

# Save a plan for review or approval
$ deputy fix --format json --output fix-plan.json

# Apply fixes automatically
$ deputy fix --apply .

# Ask an agent to help implement upgrades
$ deputy fix --agent claude --agent-full-auto`}
		/>
	</div>

	<div class="mt-8">
		<Code
			title="Agent remediation (excerpt)"
			language="bash"
			code={`$ deputy fix --agent claude --agent-full-auto 
Remediation Plan:
  Target: /repo/deputy
  Commit: b0f72a33a9a74cf1d19c869971c342871f5630ab
  • Apply dependency upgrades (1 total, 2 runnable)
       go.mod:
         › go get github.com/google/osv-scalibr@0.3.4
         ↻ go mod tidy

Agent Remediation

WARNING: Full-auto mode enabled: commands and file writes will execute without approval

  ## Summary                                                                  
                                                                              
  Successfully executed the remediation plan:                                 
                                                                              
  Completed actions:                                                          
                                                                              
  1. ✓ Updated  github.com/google/osv-scalibr  from v0.3.3 to v0.3.4          
  2. ✓ Ran  go mod tidy  to clean up dependencies (added  github.com/tink-    
  crypto/tink-go/v2 v2.4.0  as a new transitive dependency)                   
  3. ✓ All tests passed (113 test packages executed successfully)             
                                                                              
  The dependency update has been applied and verified. The repository is now  
  using the patched version of osv-scalibr.                                   

✦ claude · 58.9s`}
		/>
	</div>

	<p class="mt-3">
		Full-auto mode executes commands and writes files without approval. Treat it like a power tool
		(it can be dangerous if misused). Use it in controlled environments, and pair it with builtin
		review safeguards like <code>--review</code>, or normal branch protections, pre-merge checks,
		etc.
	</p>

	<h2 class="text-l mt-10"><strong><code>deputy exec</code>: safer installs and builds</strong></h2>

	<p class="mt-3">
		If you don't fully trust <code>npm install</code>, you're not being paranoid.
		<code>deputy exec</code> runs package manager commands and build scripts inside a sandbox with
		workspace isolation, file masking, network allowlists, and resource limits. The point isn't
		magic safety. It's about shrinking the blast radius. Use <code>--review</code> to inspect
		changes before syncing them back. Full flag details are in the
		<Link url="https://github.com/picatz/deputy/tree/main/docs/commands/exec.md">exec docs</Link>.
	</p>

	<div class="mt-8">
		<Code
			title="Sandboxed execution"
			language="bash"
			code={`# Isolate workspace and mask common secrets during npm install
$ deputy exec --runtime docker \\
  --workspace-isolation snapshot \\
  --mask-preset supply-chain \\
  --image node:22-alpine \\
  -- npm install

# Review changes before syncing them back
$ deputy exec --workspace-isolation snapshot --review -- npm audit fix

# VM-based isolation on macOS (VZ plugin)
$ deputy exec --runtime plugin --plugin vz \\
  --workspace-isolation snapshot \\
  --review \\
  -- npm install`}
		/>
	</div>

	<div class="mt-4 grid gap-4 md:grid-cols-2">
		<div class="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
			<div class="text-xs uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
				<i class="fas fa-layer-group text-slate-400"></i>
				<span>Sandbox runtimes</span>
			</div>
			<table class="mt-3 w-full text-left text-sm">
				<thead class="text-slate-500">
					<tr>
						<th class="py-2 pr-3 font-semibold">Runtime</th>
						<th class="py-2 pr-3 font-semibold">Platform</th>
						<th class="py-2 font-semibold">Notes</th>
					</tr>
				</thead>
				<tbody class="text-slate-600">
					<tr class="border-t border-slate-200">
						<td class="py-2 pr-3"><code>docker</code></td>
						<td class="py-2 pr-3">All</td>
						<td class="py-2">Container isolation (default).</td>
					</tr>
					<tr class="border-t border-slate-200">
						<td class="py-2 pr-3"><code>gvisor</code></td>
						<td class="py-2 pr-3">Linux</td>
						<td class="py-2">Stronger isolation via gVisor.</td>
					</tr>
					<tr class="border-t border-slate-200">
						<td class="py-2 pr-3"><code>plugin (vz)</code></td>
						<td class="py-2 pr-3">macOS ARM64</td>
						<td class="py-2">VM-based isolation.</td>
					</tr>
					<tr class="border-t border-slate-200">
						<td class="py-2 pr-3"><code>sandbox-exec</code></td>
						<td class="py-2 pr-3">macOS</td>
						<td class="py-2">Host sandboxing (more limited).</td>
					</tr>
					<tr class="border-t border-slate-200">
						<td class="py-2 pr-3"><code>none</code></td>
						<td class="py-2 pr-3">All</td>
						<td class="py-2">No sandboxing (trusted only).</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
			<div class="text-xs uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
				<i class="fas fa-folder-tree text-slate-400"></i>
				<span>Workspace isolation</span>
			</div>
			<table class="mt-3 w-full text-left text-sm">
				<thead class="text-slate-500">
					<tr>
						<th class="py-2 pr-3 font-semibold">Mode</th>
						<th class="py-2 font-semibold">What it does</th>
					</tr>
				</thead>
				<tbody class="text-slate-600">
					<tr class="border-t border-slate-200">
						<td class="py-2 pr-3"><code>direct</code></td>
						<td class="py-2">Mount workspace directly (fastest).</td>
					</tr>
					<tr class="border-t border-slate-200">
						<td class="py-2 pr-3"><code>snapshot</code></td>
						<td class="py-2">Copy workspace to a temp dir.</td>
					</tr>
					<tr class="border-t border-slate-200">
						<td class="py-2 pr-3"><code>overlay</code></td>
						<td class="py-2">Copy‑on‑write overlay (Linux).</td>
					</tr>
					<tr class="border-t border-slate-200">
						<td class="py-2 pr-3"><code>tmpfs</code></td>
						<td class="py-2">Memory‑backed workspace (ephemeral).</td>
					</tr>
					<tr class="border-t border-slate-200">
						<td class="py-2 pr-3"><code>git-worktree</code></td>
						<td class="py-2">Isolate via a Git worktree.</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<div class="mt-4">
		<Panel
			icon="fa-lightbulb"
			color="bg-blue-50"
			ring="ring-1"
			ringColor="ring-blue-100"
			iconColor="text-blue-500"
		>
			Use <code>--review</code> to inspect and confirm workspace changes before they sync back to
			your repo. For a manual audit, add <code>--preserve-workspace</code> to keep the isolated
			workspace around. Filesystem mode (<code>--mode</code>) is separate from workspace isolation:
			the default is <code>workspace-write</code>; for analysis‑only runs, use
			<code>--mode read-only</code>.
		</Panel>
	</div>
	<div class="mt-3">
		<Panel
			icon="fa-triangle-exclamation"
			color="bg-amber-50"
			ring="ring-1"
			ringColor="ring-amber-100"
			iconColor="text-amber-500"
		>
			VM isolation helps prevent host-level compromise, but it doesn't make supply chain risk go
			away. A malicious package can still poison the build output or artifact you ship. Use
			defense-in-depth, keep blast radius small, and treat sandboxing as one (useful) layer, not a
			guarantee.
		</Panel>
	</div>

	<div class="mt-4 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
		<div class="text-xs uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
			<i class="fas fa-cube text-slate-400"></i>
			<span>VZ plugin (macOS)</span>
		</div>
		<p class="mt-2 text-sm text-slate-600">
			VZ is a sandbox runtime plugin that boots a lightweight Linux VM on macOS Apple Silicon using
			the Apple <code>Virtualization.framework</code> (via
			<Link url="https://github.com/Code-Hex/vz">Code‑Hex/vz</Link>). It's a good fit when you want
			VM-level isolation without even needing Docker, and it's a concrete example of how
			customizable sandbox runtime plugins work in Deputy. What's really cool: boot time is very
			fast in the example plugin (≈1-2s), but it depends on the rootfs and what's installed inside
			the VM.
		</p>
		<div class="mt-4 rounded-xl border border-slate-200 bg-slate-50/80 p-4">
			<div class="text-xs uppercase tracking-[0.2em] text-slate-500">How it fits together</div>
			<div class="mt-3 rounded-xl border border-slate-200 bg-white p-3">
				<div class="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500">macOS host</div>
				<div class="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
					<span class="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1">deputy CLI</span>
					<svg
						class="h-3 w-3 text-slate-400"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M12.293 4.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
						/>
					</svg>
					<span class="rounded-lg border border-slate-200 bg-white px-2 py-1">Unix socket RPC</span>
					<svg
						class="h-3 w-3 text-slate-400"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M12.293 4.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
						/>
					</svg>
					<span class="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1"
						>deputy-sandbox-vz</span
					>
					<svg
						class="h-3 w-3 text-slate-400"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M12.293 4.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
						/>
					</svg>
					<span class="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1"
						>Virtualization.framework</span
					>
					<svg
						class="h-3 w-3 text-slate-400"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M12.293 4.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
						/>
					</svg>
					<span class="rounded-lg border border-slate-200 bg-slate-900 px-2 py-1 text-slate-100"
						>VZ VM (Linux)</span
					>
				</div>
			</div>

			<div class="mt-3 grid gap-3 lg:grid-cols-2">
				<div class="rounded-xl border border-slate-200 bg-white p-3">
					<div
						class="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2"
					>
						<i class="fas fa-folder-tree text-slate-400"></i>
						<span>Filesystem + isolation</span>
					</div>
					<div class="mt-2 grid gap-3 text-xs text-slate-600">
						<div class="rounded-lg border border-slate-200 bg-white p-3">
							<div class="flex items-center gap-2 text-[0.7rem] font-semibold text-slate-700">
								<i class="fas fa-folder-open text-slate-400"></i>
								<span>Workspace (host → VM)</span>
							</div>
							<p class="mt-1 text-[0.7rem] text-slate-500">
								Isolation mode decides how the workspace is staged before it is mounted.
							</p>
							<div class="mt-2 flex flex-wrap gap-1.5 text-[0.65rem]">
								<span class="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5"
									>direct</span
								>
								<span class="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5"
									>snapshot</span
								>
								<span class="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5"
									>overlay</span
								>
								<span class="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5">tmpfs</span
								>
								<span class="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5"
									>git-worktree</span
								>
							</div>
							<div class="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-2">
								<div class="text-[0.65rem] uppercase tracking-[0.15em] text-slate-400">
									Mount path
								</div>
								<div class="mt-1 flex flex-wrap items-center gap-2 text-[0.7rem]">
									<span class="rounded-md border border-slate-200 bg-white px-2 py-0.5"
										>host workspace</span
									>
									<svg
										class="h-3 w-3 text-slate-400"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											d="M12.293 4.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
										/>
									</svg>
									<span
										class="rounded-md border border-slate-900 bg-slate-900 px-2 py-0.5 text-slate-100"
										>/workspace (virtio‑fs)</span
									>
								</div>
							</div>
						</div>
						<div class="rounded-lg border border-slate-200 bg-white p-3">
							<div class="flex items-center gap-2 text-[0.7rem] font-semibold text-slate-700">
								<i class="fas fa-hard-drive text-slate-400"></i>
								<span>Rootfs + kernel (VM base)</span>
							</div>
							<p class="mt-1 text-[0.7rem] text-slate-500">
								Boot assets live under <code>~/.deputy/vz/*</code> and attach via virtio‑blk.
							</p>
							<div class="mt-2 flex flex-wrap gap-1.5 text-[0.65rem]">
								<span class="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5"
									>rootfs.img</span
								>
								<span class="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5"
									>vmlinuz</span
								>
								<span class="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5"
									>initrd</span
								>
							</div>
							<div class="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-2">
								<div class="text-[0.65rem] uppercase tracking-[0.15em] text-slate-400">
									Mount path
								</div>
								<div class="mt-1 flex flex-wrap items-center gap-2 text-[0.7rem]">
									<span class="rounded-md border border-slate-200 bg-white px-2 py-0.5"
										>~/.deputy/vz/*</span
									>
									<svg
										class="h-3 w-3 text-slate-400"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											d="M12.293 4.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
										/>
									</svg>
									<span
										class="rounded-md border border-slate-900 bg-slate-900 px-2 py-0.5 text-slate-100"
										>/ (virtio‑blk)</span
									>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					class="rounded-xl border border-slate-200 bg-slate-900 p-3 text-slate-100 flex flex-col"
				>
					<div
						class="text-[0.65rem] uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2"
					>
						<i class="fas fa-server text-slate-500"></i>
						<span>Inside the VM</span>
					</div>
					<div class="mt-2 grid gap-2 text-xs md:grid-cols-2">
						<div class="rounded-lg border border-slate-700 bg-slate-800 p-2">
							<strong>/deputy-init</strong> (PID 1) runs your command.
						</div>
						<div class="rounded-lg border border-slate-700 bg-slate-800 p-2">
							<strong>Lifecycle:</strong> boot → init → run → poweroff.
						</div>
						<div class="rounded-lg border border-slate-700 bg-slate-800 p-2 md:col-span-2">
							<strong>Device map (virtio):</strong>
							<div class="mt-2 grid gap-2 text-[0.7rem] text-slate-300 sm:grid-cols-2">
								<div
									class="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 flex items-center gap-2"
								>
									<i class="fas fa-folder-open text-slate-500"></i>
									<span>virtio‑fs → <code>/workspace</code></span>
								</div>
								<div
									class="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 flex items-center gap-2"
								>
									<i class="fas fa-hard-drive text-slate-500"></i>
									<span>virtio‑blk → <code>/</code> (rootfs)</span>
								</div>
								<div
									class="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 flex items-center gap-2"
								>
									<i class="fas fa-network-wired text-slate-500"></i>
									<span>virtio‑net → NAT / allowlist</span>
								</div>
								<div
									class="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 flex items-center gap-2"
								>
									<i class="fas fa-terminal text-slate-500"></i>
									<span>virtio‑console → stdout/stderr</span>
								</div>
							</div>
							<div class="mt-2 text-[0.65rem] text-slate-400">
								The VM only sees <code>/</code> and <code>/workspace</code>—nothing else from the
								host.
							</div>
						</div>
						<div class="rounded-lg border border-slate-700 bg-slate-800 p-2 md:col-span-2">
							<strong>Example rootfs:</strong>
							<div class="mt-1 flex flex-wrap gap-1.5 text-[0.7rem] text-slate-300">
								<span class="rounded-md border border-slate-700 bg-slate-900 px-2 py-0.5"
									>Go 1.23.5</span
								>
								<span class="rounded-md border border-slate-700 bg-slate-900 px-2 py-0.5"
									>Node.js 22</span
								>
								<span class="rounded-md border border-slate-700 bg-slate-900 px-2 py-0.5"
									>build tools</span
								>
							</div>
							<div class="mt-1 text-[0.65rem] text-slate-400">
								Applies to the bundled Alpine rootfs used by the VZ example plugin.
							</div>
						</div>
						<div class="rounded-lg border border-slate-700 bg-slate-800 p-2 md:col-span-2">
							<strong>Boot sequence (simplified):</strong>
							<div class="mt-2 flex flex-wrap items-center gap-1.5 text-[0.7rem] text-slate-300">
								<span class="rounded-md border border-slate-700 bg-slate-900 px-2 py-0.5">
									load kernel
								</span>
								<span class="text-slate-500">→</span>
								<span class="rounded-md border border-slate-700 bg-slate-900 px-2 py-0.5">
									mount rootfs
								</span>
								<span class="text-slate-500">→</span>
								<span class="rounded-md border border-slate-700 bg-slate-900 px-2 py-0.5">
									load virtio
								</span>
								<span class="text-slate-500">→</span>
								<span class="rounded-md border border-slate-700 bg-slate-900 px-2 py-0.5">
									net/DNS
								</span>
								<span class="text-slate-500">→</span>
								<span class="rounded-md border border-slate-700 bg-slate-900 px-2 py-0.5">
									mount /workspace
								</span>
								<span class="text-slate-500">→</span>
								<span class="rounded-md border border-slate-700 bg-slate-900 px-2 py-0.5">
									decode command
								</span>
								<span class="text-slate-500">→</span>
								<span class="rounded-md border border-slate-700 bg-slate-900 px-2 py-0.5">
									exec
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<p class="mt-3 text-xs text-slate-500">
			The hypervisor is the security boundary: the host treats everything inside the VM (kernel,
			userspace, your command) as untrusted.
		</p>
		<p class="mt-3 text-xs text-slate-500">
			Setup details:
			<Link url="https://github.com/picatz/deputy/tree/main/examples/sandbox-plugins/vz"
				>VZ plugin example</Link
			>.
		</p>
	</div>

	<h2 class="text-l mt-10"><strong>Agents, but with guardrails</strong></h2>

	<p class="mt-3">
		Agents are optional. If you pass <code>--agent</code>, Deputy can hand the context to an
		assistant for explanations, triage, or help applying a plan. Different agents run in different
		sandboxes (and may or may not have network access), so test the one you plan to use. Keep them
		on a leash: use <code>read-only</code> for analysis, and pair <code>workspace-write</code> with
		review checkpoints. The
		<Link url="https://github.com/picatz/deputy/tree/main/docs/guides/agents.md">agents guide</Link>
		covers sandboxes and tradeoffs.
	</p>

	<div class="mt-8">
		<Code
			title="Agent-assisted workflows"
			language="bash"
			code={`# Explain a vulnerability
$ deputy explain --agent codex CVE-2021-44228

# Prioritize findings
$ deputy triage --agent claude

# Apply fixes with an agent in a safer sandbox
$ deputy fix --agent claude --agent-sandbox workspace-write`}
		/>
	</div>

	<h2 class="text-l mt-10"><strong>Plugins: extend the inventory</strong></h2>

	<p class="mt-3">
		If Deputy doesn't understand your ecosystem, you can teach it. Plugins are external executables
		(write them in Go or anything) that return packages to include in the inventory.
	</p>
	<p class="mt-3">
		The <Link url="https://github.com/picatz/deputy/tree/main/docs/guides/plugins.md"
			>plugins guide</Link
		>
		walks through packaging, discovery, and testing.
	</p>

	<div class="mt-8">
		<Code
			title="Minimal extractor plugin (Go)"
			language="go"
			code={`package main

import (
    "strings"

    "github.com/picatz/deputy/sdk/plugin"
)

func main() {
    plugin.Main(&myExtractor{})
}

type myExtractor struct{}

func (e *myExtractor) Name() string           { return "custom/myformat" }
func (e *myExtractor) DisplayName() string    { return "My Custom Format" }
func (e *myExtractor) Ecosystem() string      { return "custom" }
func (e *myExtractor) Version() int           { return 1 }
func (e *myExtractor) Description() string    { return "Extracts packages from .myformat files" }
func (e *myExtractor) FilePatterns() []string { return []string{"*.myformat"} }

func (e *myExtractor) FileRequired(path string, isDir bool, mode uint32, size int64) bool {
    return !isDir && strings.HasSuffix(path, ".myformat")
}

func (e *myExtractor) Extract(path string, contents []byte, root string) ([]*plugin.Package, error) {
    return []*plugin.Package{plugin.NewPackage("example-pkg", "1.0.0", "custom")}, nil
}`}
		/>
	</div>

	<h2 class="text-l mt-10"><strong>Where Deputy Is Headed</strong></h2>

	<p class="mt-3">
		I want dependency work to feel like a system, not a scavenger hunt: one inventory, one set of
		policies, and a straight line from "we have a problem" to "it's fixed". Predictable. Reviewable.
		Routine. Tractable. The goal is fewer fire drills and more reliable, explainable outcomes: every
		change is traceable, every finding is actionable, and the guardrails stay consistent no matter
		where the software lives. If Deputy does its job, the inventory becomes quiet infrastructure in
		the background, not another dashboard to babysit, just a source of truth that makes reviews
		faster and fixes repeatable. If you want to kick the tires, the repo is
		<Link url="https://github.com/picatz/deputy">here</Link>. Bug reports, sharp-edge notes, and
		ideas are all welcome.
	</p>
</BlogPost>
