<script>
	import { onMount } from 'svelte';
	import metadata from './metadata.json';
	import BlogHeader from '$lib/BlogHeader.svelte';
	import BlogPost from '$lib/BlogPost.svelte';
	import Link from '$lib/Link.svelte';
	import Code from '$lib/Code.svelte';
	import Panel from '$lib/Panel.svelte';
	import Graph from '$lib/Graph.svelte';
	import * as d3 from 'd3';

	let graphComponent;
</script>

<BlogPost>
	<BlogHeader title={metadata.title} date="1-2-2023">
		Following my <Link url="/blog/2022/12/4/ssa">previous blog post</Link> on
		<a href="https://en.wikipedia.org/wiki/Static_single-assignment_form"
			>Static Single Assignment
		</a>(SSA), I've been working on a static
		<a href="https://en.wikipedia.org/wiki/Taint_checking">taint analysis</a>
		package for Go programs. It serves as a building block for other analysis like
		<a href="https://en.wikipedia.org/wiki/SQL_injection">SQL injection</a>,
		<a href="https://en.wikipedia.org/wiki/Cross-site_scripting">XSS</a>, and more. This is how it
		works.
	</BlogHeader>

	<div class="mt-6">
		<h2 class="text-l"><strong>Taint Analysis</strong></h2>

		<p>
			Taint analysis is a <a href="https://en.wikipedia.org/wiki/Static_program_analysis"
				>static program analysis</a
			>
			technique that tracks the flow of data through a program to identify where "source" of (user controlled)
			data reaches a "sink", a place where the data is used in an unsafe way. For example, if a user
			controlled string is passed to a function that executes a SQL query, the string is a
			<i>source</i>
			of data that reaches a <i>sink</i>, the SQL query. This would result in a
			<a href="https://en.wikipedia.org/wiki/SQL_injection">SQL injection</a> vulnerability in the program.
		</p>

		<br />

		<Code
			title="Example Go code with SQL injection vulnerability"
			language="go"
			code={`func business(db *sql.DB, q string) {
	rows, _ := db.Query(q) // potential sql injection
	...
}

func run() {
	db, _ := sql.Open("sqlite3", ":memory:")

	mux := http.NewServeMux()

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		business(db, r.URL.Query().Get("sql-query"))
	})

	http.ListenAndServe(":8080", mux)
}`}
		/>
	</div>

	<br />

	<p>
		Static single-assignment (<Link
			url="https://en.wikipedia.org/wiki/Static_single-assignment_form">SSA</Link
		>) provides the foundation for performing taint analysis. SSA is an <Link
			url="https://en.wikipedia.org/wiki/Intermediate_representation"
			>intermediate representation</Link
		>
		that is generally easier to work with than the original program's abstract syntax tree (<Link
			url="https://en.wikipedia.org/wiki/Abstract_syntax_tree">AST</Link
		>). SSA provides value graph of the program, where each node is a value, instruction, or both.
		You can read more about SSA in my
		<Link url="/blog/2022/12/4/ssa">previous blog post</Link>.
	</p>

	<br />

	<p>
		The SSA value graph is transformed to a function <a
			href="https://en.wikipedia.org/wiki/Call_graph">call graph</a
		>, where each node is a function from a target program, and each edge is a <i>call</i> to that
		function. This represents the program's
		<a href="https://en.wikipedia.org/wiki/Control-flow_graph">control flow graph</a>, that can be
		used to identify <a href="https://en.wikipedia.org/wiki/Data-flow_analysis">data flow</a>
		through the program. The data found in the program is represented with specific
		<a href="https://en.wikipedia.org/wiki/Type_system">types</a>, that can be used to find the flow
		form a <i>source</i> to a <i>sink</i>. All of the nodes between the source and sink make up a
		<i>path</i> that represents a potential vulnerability.
	</p>

	<br />

	<div class="grid grid-cols-5 gap-2 items-center">
		<div class="col-span-2">
			<div class="bg-gray-200 rounded-lg p-4">
				<p class="text-center font-bold">Source</p>
				<p class="text-center overflow-hidden">
					<a href="https://pkg.go.dev/net/http#Request" class="text-blue-500"
						><code
							class="hover:bg-yellow-200 hover:text-black transition-colors duration-200 px-1 py-0.5 rounded cursor-pointer"
							on:mouseenter={() =>
								graphComponent?.highlightNodeWithSignature(
									'(*net/http.ServeMux).HandleFunc',
									'*net/http.Request',
									'(*net/http.ServeMux).HandleFunc(pattern string, handler func(net/http.ResponseWriter, *net/http.Request))'
								)}
							on:mouseleave={() => graphComponent?.resetHighlight()}>*net/http.Request</code
						></a
					>
				</p>
			</div>
		</div>

		<div class="col-span-1">
			<div class="flex justify-center items-center flex-col">
				<p class="text-center font-bold">Path</p>
				<div
					class="text-center overflow-hidden cursor-pointer hover:bg-blue-50 transition-colors duration-200 p-2 rounded-lg group"
					role="button"
					on:mouseenter={() =>
						graphComponent?.highlightPath([
							'(*net/http.ServeMux).HandleFunc',
							'run$1',
							'business',
							'(*database/sql.DB).Query'
						])}
					on:mouseleave={() => graphComponent?.resetHighlight()}
				>
					<div class="flex items-center justify-center space-x-2">
						<i class="fas fa-play text-blue-500 text-sm group-hover:text-blue-700 transition-colors"
						></i>
						<span
							class="text-blue-500 font-medium group-hover:text-blue-700 transition-colors text-sm"
							>Trace Attack Path</span
						>
						<i class="fas fa-play text-blue-500 text-sm group-hover:text-blue-700 transition-colors"
						></i>
					</div>
					<div class="text-xs text-gray-500 mt-1 group-hover:text-gray-700 transition-colors">
						hover to see vulnerability flow
					</div>
				</div>
			</div>
		</div>

		<div class="col-span-2">
			<div class="bg-gray-200 rounded-lg p-4">
				<p class="text-center font-bold">Sink</p>
				<p class="text-center overflow-hidden">
					<a href="https://pkg.go.dev/net/http#Request" class="text-blue-500"
						><code
							class="hover:bg-yellow-200 hover:text-black transition-colors duration-200 px-1 py-0.5 rounded cursor-pointer"
							on:mouseenter={() => graphComponent?.highlightNode('(*database/sql.DB).Query')}
							on:mouseleave={() => graphComponent?.resetHighlight()}>(*database/sql.DB).Query</code
						></a
					>
				</p>
			</div>
		</div>
	</div>

	<br />

	<!-- Interactive Guide -->
	<div
		class="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-4"
	>
		<p class="text-center text-gray-600 text-sm">
			<span class="inline-flex items-center space-x-1">
				<i class="fas fa-hand-pointer text-blue-500"></i>
				<span>Hover over the</span>
				<code class="bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono text-xs">Source</code>
				<span>•</span>
				<code class="bg-green-100 text-green-800 px-2 py-1 rounded font-mono text-xs">Path</code>
				<span>•</span>
				<code class="bg-red-100 text-red-800 px-2 py-1 rounded font-mono text-xs">Sink</code>
				<span>elements above to see the magic happen in the graph below!</span>
			</span>
		</p>
	</div>

	<div class="bg-gray-800 p-4 rounded-lg">
		<Graph
			bind:this={graphComponent}
			nodes={[
				{ id: 0, label: 'net/http.NewServeMux' },
				{ id: 1, label: '(*net/http.ServeMux).HandleFunc' },
				{ id: 2, label: 'net/http.ListenAndServe' },
				{ id: 3, label: 'run' },
				{ id: 4, label: 'business' },
				{ id: 5, label: 'database/sql.Open' },
				{ id: 6, label: '(*database/sql.DB).Query' },
				{ id: 7, label: 'run$1' }
			]}
			links={[
				{ source: 4, target: 6 },
				{ source: 7, target: 4 },
				{ source: 3, target: 5 },
				{ source: 3, target: 0 },
				{ source: 3, target: 1 },
				{ source: 3, target: 2 },
				{ source: 1, target: 7 }
			]}
			linkFunctions={[
				(linkElements) => {
					linkElements
						.filter((d) => {
							const ids = [7, 4, 6];
							return ids.includes(d.target.id);
						})
						.attr('stroke', '#3c82f6');

					linkElements
						.filter((d) => {
							const ids = [7, 4, 6];
							return !ids.includes(d.target.id);
						})
						.attr('stroke-dasharray', '5,5');
				}
			]}
			nodeFunctions={[
				(nodeElements) => {
					nodeElements
						.filter((d) => {
							const ids = [1, 7, 4, 6];
							return ids.includes(d.id);
						})
						.attr('stroke', '#3c82f6')
						.attr('stroke-width', 2);
				}
			]}
		>
			<p class="text-white font-mono">
				<span class="text-slate-500">Click and drag the nodes!</span>
			</p>
		</Graph>
	</div>
	<br />

	<p>
		To use the taint analysis package, we need to first create a set of <i>source</i> and
		<i>sink</i>
		values, and then pass them to the <Link url="https://pkg.go.dev/github.com/picatz/taint#Check"
			><code>taint.Check</code></Link
		> function.
	</p>

	<br />

	<Code
		title="Creating sources and sinks for taint analysis"
		language="go"
		code={`sources := taint.NewSources(
	"*net/http.Request",
)

sinks := taint.NewSinks(
	"(*database/sql.DB).Query",
	"(*database/sql.DB).QueryContext",
	"(*database/sql.DB).QueryRow",
	"(*database/sql.DB).QueryRowContext",
	"(*database/sql.Tx).Query",
	"(*database/sql.Tx).QueryContext",
	"(*database/sql.Tx).QueryRow",
	"(*database/sql.Tx).QueryRowContext",
)

results, _ := taint.Check(cg, sources, sinks)`}
	/>

	<br />

	<p>
		The returned <code>results</code> contains of slice of <Link
			url="https://pkg.go.dev/github.com/picatz/taint#Result"><code>taint.Result</code></Link
		>
		values, which contain the <i>path</i> from the <i>source</i> to the <i>sink</i>. We can use
		information from the path to understand the context of the vulnerability.
	</p>

	<br />

	<p>
		For example, if the SQL query is being executed using a prepared statement which would prevent
		SQL injection. This can be done by checking the last node in the path, which is the <i>sink</i>,
		and checking if the <i>sink</i> is a <Link
			url="https://pkg.go.dev/golang.org/x/tools/go/ssa#Const"><code>*ssa.Const</code></Link
		> value. Otherwise we can report a potential vulnerability.
	</p>

	<br />

	<Code
		title="Analyzing taint analysis results"
		language="go"
		code={`for _, result := range results {
	queryEdge := result.Path[len(result.Path)-1]

	queryArgs := queryEdge.Site.Common().Args[1:]

	if strings.HasPrefix(queryEdge.Site.Value().Call.Value.String(), "Context") {
		queryArgs = queryArgs[1:]
	}

	query := queryArgs[0]

	if _, isConst := query.(*ssa.Const); !isConst {
		pass.Reportf(result.SinkValue.Pos(), "potential sql injection")
	}
}`}
	/>

	<br />

	<p>
		A full example of the taint analysis package used to detect SQL injection vulnerabilities is
		available on GitHub <a
			href="https://github.com/picatz/taint/blob/main/sql/injection/injection.go"
			><strong>here</strong></a
		>. This can be installed as the
		<a href="https://github.com/picatz/taint/blob/main/cmd/sqli/main.go"><code>sqli</code></a> CLI tool,
		which can be used to detect SQL injection vulnerabilities in Go programs.
	</p>

	<br />

	<Code
		title="Install sqli CLI tool"
		language="bash"
		code={`$ go install github.com/picatz/taint/cmd/sqli@latest`}
	/>

	<br />

	<p>
		To use the <a href="https://github.com/picatz/taint/blob/main/cmd/sqli/main.go"
			><code>sqli</code></a
		> CLI tool, change to the directory of the target Go program, and run the tool.
	</p>

	<br />

	<Code title="Run sqli analysis" language="bash" code={`$ sqli ./...`} />

	<br />

	<Panel>
		The <code>./...</code> pattern is a <Link
			url="https://pkg.go.dev/golang.org/x/tools/go/analysis"><code>go/analysis</code></Link
		>
		<Link
			url="https://cs.opensource.google/go/x/tools/+/refs/tags/v0.1.10:go/packages/packages.go;drc=c1dd25e80b559a5b0e8e2dd7d5bd1e946aa996a0;l=252"
			><i>pattern</i></Link
		>, which is used to specify the packages to analyze. This pattern is used to specify the current
		directory and all subdirectories, which is useful for analyzing a large Go program. Other
		patterns such as <code>path@version</code> can be found
		<Link url="https://pkg.go.dev/cmd/go/internal/list"><strong>here</strong></Link>.
	</Panel>

	<br />

	<p>
		The core of the taint analysis algorithm is the <Link
			url="https://pkg.go.dev/github.com/picatz/taint#Check"><code>taint.Check</code></Link
		> function, which takes a call graph of a target program and a set of <i>source</i> and
		<i>sink</i>
		values. It first checks for the <Link url="https://en.wikipedia.org/wiki/Reachability"
			><i>reachability</i></Link
		> of the <i>source</i>, then performs "<Link
			url="https://en.wikipedia.org/wiki/Data-flow_analysis#Backward_analysis">backwards</Link
		>" data flow analysis to determine if the <i>source</i> can reach the <i>sink</i>. This is
		implemented in a few hundred lines of code using three internal functions, <Link
			url="https://github.com/picatz/taint/blob/f43d4ad739949712398a6211e4d45ecdc38a524c/check.go#L104"
			><code>checkPath</code></Link
		>,
		<Link
			url="https://github.com/picatz/taint/blob/f43d4ad739949712398a6211e4d45ecdc38a524c/check.go#L140"
			><code>checkSSAValue</code></Link
		>, and
		<Link
			url="https://github.com/picatz/taint/blob/f43d4ad739949712398a6211e4d45ecdc38a524c/check.go#L487"
			><code>checkSSAInstruction</code></Link
		>.
	</p>

	<br />

	<p>
		If you have any questions, issues, or feedback, please feel free to open an issue on the <Link
			url="https://github.com/picatz/taint"><strong>repository</strong></Link
		>. The ultimate goal for the future would be to donate it to the <Link
			url="https://pkg.go.dev/golang.org/x/tools/go/analysis"><code>go/analysis</code></Link
		> collection of packages to be used for other taint analysis problems by the community.
	</p>
</BlogPost>
