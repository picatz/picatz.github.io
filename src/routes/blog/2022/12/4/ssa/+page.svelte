<script>
	// import metadata.json
	import metadata from './metadata.json';
	import BlogPost from '$lib/BlogPost.svelte';
	import BlogHeader from '$lib/BlogHeader.svelte';
	import ReadMore from '$lib/BlogReadMore.svelte';
	import Code from '$lib/Code.svelte';
	import * as d3 from 'd3';
	import { onMount } from 'svelte';

	let title = metadata.title;

	onMount(() => {
		const ssaGraph = d3.select('#ssa-graph');

		let width = ssaGraph.node().getBoundingClientRect().width;
		let height = ssaGraph.node().getBoundingClientRect().height;

		const svg = ssaGraph.append('svg').attr('width', width).attr('height', height);

		const data = {
			nodes: [
				{ id: 0, label: 'entry' },
				{ id: 1, label: 'a' },
				{ id: 2, label: 'b' },
				{ id: 3, label: 't0' },
				{ id: 4, label: 't1' },
				{ id: 5, label: 't2' },
				{ id: 6, label: 't3' }
			],
			links: [
				{ source: 0, target: 1 },
				{ source: 0, target: 2 },
				{ source: 1, target: 3 },
				{ source: 2, target: 4 },
				{ source: 3, target: 5 },
				{ source: 4, target: 5 },
				{ source: 5, target: 6 }
			]
		};

		// Create the force simulation
		const simulation = d3
			.forceSimulation(data.nodes)
			.force('charge', d3.forceManyBody().strength(-500)) // Increase the strength value to spread out the nodes
			.force('link', d3.forceLink(data.links).distance(50))
			.force('center', d3.forceCenter(width / 2, height / 2))
			.force(
				'x',
				d3.forceX().x((d) => {
					if (d.label === 'entry') {
						return 0;
					} else if (d.label === 't3') {
						return width;
					} else {
						return width / 2;
					}
				})
			);

		// Create the links
		const links = svg
			.selectAll('line')
			.data(data.links)
			.enter()
			.append('line')
			.attr('stroke', 'gray')
			.attr('stroke-opacity', 0.6)
			.attr('stroke-width', 1);

		// Create the nodes
		const nodes = svg
			.selectAll('circle')
			.data(data.nodes)
			.enter()
			.append('circle')
			.attr('r', 25)
			.attr('fill', 'rgb(96 165 250)');

		// Add labels to the nodes
		const labels = svg
			.selectAll('text')
			.data(data.nodes)
			.enter()
			.append('text')
			.attr('font-family', 'monospace')
			.text((d) => d.label)
			.attr('font-size', 12)
			// move text to the center of the circle
			.attr('dy', 4)
			.attr('text-anchor', 'middle')
			.attr('fill', 'white');

		// Update the positions of the nodes and links on each tick of the simulation
		simulation.on('tick', () => {
			links
				.attr('x1', (d) => d.source.x)
				.attr('y1', (d) => d.source.y)
				.attr('x2', (d) => d.target.x)
				.attr('y2', (d) => d.target.y);

			nodes.attr('cx', (d) => d.x).attr('cy', (d) => d.y);

			labels.attr('x', (d) => d.x).attr('y', (d) => d.y);
		});

		// Re-run the simulation when the window is resized
		window.addEventListener('resize', () => {
			width = ssaGraph.node().getBoundingClientRect().width;
			height = ssaGraph.node().getBoundingClientRect().height;

			svg.attr('width', width).attr('height', height);
			simulation.force('center', d3.forceCenter(width / 2, height / 2));
			simulation.alpha(1).restart();
		});
	});
</script>

<BlogPost>
	<BlogHeader {title} date="12-4-2022">
		<a href="https://en.wikipedia.org/wiki/Static_single-assignment_form" class="text-blue-500"
			>Static Single Assignment</a
		>
		(<strong>SSA</strong>) is an
		<a href="https://en.wikipedia.org/wiki/Intermediate_representation" class="text-blue-500"
			>intermediary representation</a
		>
		used by compilers to simplify the analysis of programs. In this representation each variable is assigned
		only once, which removes the need to track the state of a variable over time. This is how SSA can
		be used to analyze <a href="https://go.dev" class="text-blue-500">Go</a> programs.
	</BlogHeader>

	<br />

	<h2 class="subtitle"><strong>SSA Value Graph</strong></h2>

	<br />

	<p>
		An interesting aspect about SSA is that it is actually a <a
			href="https://en.wikipedia.org/wiki/Graph_theory"
			class="text-blue-500 font-sans">graph</a
		>. Each node in the graph can either be an <code>ssa.Value</code>, <code>ssa.Instruction</code>,
		or both. The contents of a node can be inspected, including its type information or the values
		it uses or references.
	</p>

	<br />

	<p>To make this idea more concrete, let's look at the following function:</p>

	<br />

	<Code
		language="go"
		code={`func add(a, b int) int {
    return a + b
}`}
	/>

	<br />

	<p>
		The function takes two function arguments, <code>a</code> and <code>b</code> of type
		<code>int</code>; it returns a value of type <code>int</code>. The function body is a single
		<a href="https://golang.org/ref/spec#Return_statements" class="text-blue-500"
			><code>return</code></a
		>
		statement, which returns the sum of <code>a</code> and <code>b</code>. The SSA form of this
		function is:
	</p>

	<br />

	<Code
		language="go"
		code={`add
0: entry
  a = Arg[0] (a int)
  b = Arg[1] (b int)
  t0 = *a (int)
  t1 = *b (int)
  t2 = t0 + t1 (int)
  t3 = *t2 (int)
  return t3`}
	/>

	<br />

	<p>
		The first <code>ssa.BasicBlock</code> object in the graph is the entry block (<code>0</code>).
		The entry block is the first block to be executed when the function is called. This entry block
		starts with two <code>ssa.Instruction</code> objects:
		<!-- Numbered list -->
	</p>
	<ol class="list-decimal list-inside m-4">
		<li class="mb-2">
			An <code>ssa.Store</code> which stores the value of the first function argument (<code>a</code
			>) into a variable named <code>t0</code>.
		</li>
		<li>
			Another <code>ssa.Store</code> which stores the value of the second function argument (<code
				>b</code
			>) into a variable named <code>t1</code>.
		</li>
	</ol>

	<p>
		They are connected to the next <code>ssa.Value</code> object by an <code>ssa.Instruction</code>
		object for a <a href="https://golang.org/ref/spec#Operators">binary operation</a> which adds the
		values of <code>t0</code>
		and <code>t1</code> together. The result of the addition is stored in a variable named
		<code>t2</code>.
	</p>

	<br />

	<p>
		<code>t2</code> is connected to the next <code>ssa.Value</code> object by another
		<code>ssa.Instruction</code>, a
		<a href="https://golang.org/ref/spec#Operators">unary operation</a>
		which returns the value of <code>t2</code>. It is connected with another
		<code>ssa.Instruction</code>
		object that stores the value of <code>t3</code>. This value is used in a
		<a href="https://golang.org/ref/spec#Return_statements">return statement</a>
		using the value of <code>t3</code>, the last <code>ssa.Value</code> object in the function subgraph.
	</p>

	<br />

	<!-- Using a D3.js graph to visualize the SSA graph -->
	<div class="bg-gray-800 p-4 rounded-lg">
		<p class="text-white font-mono">
			<span class="text-yellow-200">add</span>
		</p>
		<div id="ssa-graph" class="h-96"></div>
	</div>

	<br />

	<div class="bg-gray-200 p-2 rounded-lg">
		<p class="m-4">
			<i class="fas fa-info-circle fa-1x text-slate-500 mr-2"></i>
			We can programmatically traverse (or "walk") the SSA value graph to inspect the contents of each
			node. This is useful for analyzing the control flow of a program, enable optimizations, code generation,
			security analysis, constructing related graphs, and more. It can enable as a simpler way to understand
			the behavior of a program, especially when the program is large and complex; you'll find this better
			than working with the AST (Abstract Syntax Tree) or the original source code itself.
		</p>
	</div>

	<br />

	<p>
		While we were able to easily visualize the SSA value graph for the <code>add</code> function, it
		is important to note that the graph is not limited to just a single function. Other functions
		are likely involved in the program you are trying to analyze, with more even more
		<code>ssa.Value</code> and <code>ssa.Instruction</code> objects. These objects may be passed as
		arguments to other functions, or returned as the result of a function call. Functions may also
		call other functions, building a related graph called a "<a
			href="https://en.wikipedia.org/wiki/Call_graph"
			class="text-blue-500">call graph</a
		>".
	</p>

	<br />

	<p>
		Most static analysis is a combination of a <strong
			><a href="https://en.wikipedia.org/wiki/Data-flow_analysis">data flow analysis</a></strong
		>
		and
		<strong
			><a href="https://en.wikipedia.org/wiki/Control-flow_graph">control flow analysis</a></strong
		>. Generally speaking, an SSA value graph is a data flow graph, and a call graph is a control
		flow graph.
	</p>

	<br />

	<h2 class="text-xl"><strong>Function Call Graphs from SSA</strong></h2>

	<br />

	<p>
		We can construct a call graph by traversing the <code>ssa.Value</code> graph, keeping track of
		the functions we have visited, and how they are connected. This can be modeled using the
		<code
			><a href="https://pkg.go.dev/golang.org/x/tools/go/callgraph"
				>golang.org/x/tools/go/callgraph</a
			></code
		> package.
	</p>

	<br />

	<p>
		It provides a <code
			><a href="https://pkg.go.dev/golang.org/x/tools/go/callgraph#Graph">callgraph.Graph</a></code
		>
		object which contains a
		<code><a href="https://pkg.go.dev/golang.org/x/tools/go/callgraph#Node">callgraph.Node</a></code
		>
		object for each function in the program. Each <code>callgraph.Node</code> object keeps track of the
		functions that call it ("in"), and the functions it calls ("out").
	</p>

	<br />

	<p>
		Building a <code>callgraph.Graph</code> can be performed using several different algorithms with
		off-the-shelf packages.
	</p>

	<br />

	<table class="table-auto w-full rounded-lg ring-1 ring-gray-200">
		<thead class="text-left border-b border-gray-200">
			<tr>
				<th class="text-gray-700 px-4 py-2 bg-gray-200 rounded-tl-lg">Package</th>
				<th class="text-gray-700 px-4 py-2 bg-gray-200 rounded-tr-lg">Name</th>
			</tr>
		</thead>

		<tbody class="text-left">
			<tr>
				<td class="px-4 py-2"
					><code
						><a href="https://pkg.go.dev/golang.org/x/tools/go/pointer" class="text-blue-500"
							>golang.org/x/tools/go/pointer</a
						></code
					>
				</td>
				<td class="px-4 py-2"
					>Pointer Analysis
					<!-- pill style box that says deprecated -->
					<span class="bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full ml-2"
						>Deprecated</span
					>
				</td>
			</tr>
			<tr>
				<td class="px-4 py-2"
					><code
						><a
							href="https://pkg.go.dev/golang.org/x/tools/go/callgraph/static"
							class="text-blue-500">golang.org/x/tools/go/callgraph/static</a
						></code
					></td
				>
				<td class="px-4 py-2">Static Call Analysis</td>
			</tr>
			<tr>
				<td class="px-4 py-2"
					><code
						><a href="https://pkg.go.dev/golang.org/x/tools/go/callgraph/cha" class="text-blue-500"
							>golang.org/x/tools/go/callgraph/cha</a
						></code
					></td
				>
				<td class="px-4 py-2">Class Hierarchy Analysis</td>
			</tr>
			<tr>
				<td class="px-4 py-2"
					><code
						><a href="https://pkg.go.dev/golang.org/x/tools/go/callgraph/rta" class="text-blue-500"
							>golang.org/x/tools/go/callgraph/rta</a
						></code
					></td
				>
				<td class="px-4 py-2">Rapid Type Analysis</td>
			</tr>
			<tr>
				<td class="px-4 py-2"
					><code
						><a href="https://pkg.go.dev/golang.org/x/tools/go/callgraph/vta" class="text-blue-500"
							>golang.org/x/tools/go/callgraph/vta</a
						></code
					></td
				>
				<td class="px-4 py-2">Variable Type Analysis</td>
			</tr>
		</tbody>
	</table>

	<br />

	<p>
		Each of these algorithms have their advantages and disadvantages. The <code>cha</code> package
		is the most accurate, and is a good place to start. If you are analyzing a large and complex
		program, you may want to use the <code>rta</code> or <code>vta</code> packages.
	</p>

	<br />

	<p>
		You may need to experiment with different algorithms to find the best one for your targets or
		use case.
	</p>

	<br />

	<p>
		Once you have a <code>callgraph.Graph</code> object, you can use it to anser questions like:
		<br />
		<br />
		<li>What functions are called by a given function?</li>
		<li>What functions call a given function?</li>
		<li>Are there any cycles in the call graph?</li>
		<li>Is there a path from function A to function B?</li>
		<br />

		And many more! I find it useful as a foundation for other types of analysis, such as taint
		analysis.
	</p>

	<br />

	<h3 class="text-xl"><strong>Taint Analysis</strong></h3>

	<br />

	<p>
		A call graph path can be used as the foundation for additional analysis such as tainted data
		flow analysis (or " <a href="https://en.wikipedia.org/wiki/Taint_checking" class="text-blue-500"
			>taint analysis</a
		>") to find security vulnerabilities in a program.
	</p>

	<br />

	<p>
		For example, if a function takes a string as an argument from an HTTP request, and that string
		is used in a SQL query, the string is tainted. If the tainted string is then used in a function
		that takes a string as an argument, the string is passed to the function tainted. This is the
		foundation for finding exploitable SQL injection vulnerabilities in a program.
	</p>

	<br />

	<p>
		Tainted data flow analysis is a fairly complex topic, and is beyond the scope of this blog post.
		However, I look forward to writing about it in depth in the near future. But, the key insight is
		that the call graph is a building block for this type of analysis, which is used along with an
		SSA value graph to perform the full analyis. We find where the SQL queries happen through the
		call graph (the "sink"), then use the SSA value graph to walk back to the tainted data (the
		"source"). The terms "source" and "sink" are common in the world of taint analysis, and are used
		to describe the start and end of the data flow.
	</p>

	<br />

	<p>
		The graphs would also indicate how the tainted data is used in the SQL query, which is important
		for determining if the vulnerability is exploitable. If using a <a
			href="https://en.wikipedia.org/wiki/Prepared_statement">prepared statement</a
		>
		(an <code><a href="https://pkg.go.dev/golang.org/x/tools/go/ssa#Const">ssa.Const</a></code>),
		then there is no exploit. The SQL query is safe. If using a
		<a href="https://en.wikipedia.org/wiki/SQL_injection">string concatenation</a>
		(an <code><a href="https://pkg.go.dev/golang.org/x/tools/go/ssa#BinOp">ssa.BinOp</a></code>),
		then there is an exploit. The SQL query is unsafe.
	</p>

	<br />

	<p>
		These two types of graph-based analysis techniques are complementary and can be used to
		accurately inspect programs to find vulnerabilities. SSA provides the substrate for the
		analysis. This is generally a better interface to inspect a program than using the underlying
		<a href="https://en.wikipedia.org/wiki/Abstract_syntax_tree">Abstract Syntax Tree</a> (AST) directly.
		The SSA value graph and call graph provide additional lenses to view the program.
	</p>
</BlogPost>
