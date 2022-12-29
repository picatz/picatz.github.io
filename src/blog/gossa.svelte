<script>
    import BlogPostHeader from '../BlogPostHeader.svelte'
    import Command from '../Command.svelte'
    import CodeSnippet from '../CodeSnippet.svelte'

    import ReadMore from '../ReadMore.svelte'
    import blogPosts from '../posts.js'
	import Footer from '../Footer.svelte'
</script>

<section class="section">
    <BlogPostHeader id='gossa' title="Go SSA" date="2022-12-05" />

    <div class="box">
        <p>
            <i class="fas fa-book fa-1x is-grey has-text-grey" style="margin-right: 0.5rem;"></i>
            <a href="https://en.wikipedia.org/wiki/Static_single-assignment_form">Static Single Assignment</a> 
            (<strong>SSA</strong>) is an <a href="https://en.wikipedia.org/wiki/Intermediate_representation">intermediary representation</a>
            used by compilers to simplify source code analysis. In this representation each variable is
            assigned <i>only once</i>, which removes the need to track the state of a
            variable over time. This is how SSA can be used to analyze <a href="https://go.dev">Go</a> programs.
        </p>
    </div>

   <div class="box has-text-white" style="background-image: linear-gradient(to bottom right, hsl(217, 71%, 53%), hsl(204, 71%, 39%));">
        <p>
            <i class="fas fa-box fa-1x is-grey has-text-white" style="margin-right: 0.5rem;"></i>
            <u><a href="https://pkg.go.dev/golang.org/x/tools/go/ssa"><code style="background: transparent; color: white">golang.org/x/tools/go/ssa</code></a></u>
        </p>
   </div>
   
   <h2 class="subtitle"><strong>SSA Value Graph</strong></h2>

   <p>
    An interesting aspect about SSA is that it is actually a <a href="https://en.wikipedia.org/wiki/Graph_theory">graph</a>. 
    Each node in the graph can either be a <code><a href="https://pkg.go.dev/golang.org/x/tools/go/ssa#Value">ssa.Value</a></code>, <code><a href="https://pkg.go.dev/golang.org/x/tools/go/ssa#Instruction">ssa.Instruction</a></code>, or both.
    The contents of a node can be inspected, including its type information, or the other values it uses.
    </p>

    
    <br>

    <p>
        To make this idea more concrete, let's look at the following snippet for a <a href="https://golang.org/ref/spec#Function_declarations">function declaration</a> 
        named <code>add</code>:
    </p>

    <br>

    <CodeSnippet lang="go" class="is-clipped" block="
    func add(a, b int) int {'{'}
        return a + b
    {'}'}
    "/>

    <p>
        The function takes two arguments, <code>a</code> and <code>b</code> of type <code><a href="https://pkg.go.dev/builtin#int">int</a></code>.
        It also returns a value of type <code>int</code>. The function body is a single <a href="https://golang.org/ref/spec#Return_statements">return statement</a> for the sum of <code>a</code> and <code>b</code>,
        an <code><a href="https://pkg.go.dev/golang.org/x/tools/go/ssa#Return">ssa.Return</a></code> instruction.
    </p>

    <br>

    <p>
        The SSA value graph for this function declaration is shown below in text format. The nodes are labeled with their
        <a href="https://pkg.go.dev/golang.org/x/tools/go/ssa#Value">value number</a> and the <a href="https://pkg.go.dev/golang.org/x/tools/go/ssa#Value#Name">name</a> of the value.
        The <code>add</code> function is represented as a <code><a href="https://pkg.go.dev/golang.org/x/tools/go/ssa#Function">ssa.Function</a></code> which is also an <code>ssa.Value</code> itself.
    </p>

    <br>

    <CodeSnippet lang="go" class="is-clipped" block="
    0: entry
        a = Arg[0] (a int)
        b = Arg[1] (b int)
        t0 = *a (int)
        t1 = *b (int)
        t2 = t0 + t1 (int)
        t3 = *t2 (int)
        return t3

    ----
    
    func add(a int, b int) int:
    0:                                                                entry P:0 S:0
            t0 = a + b                                                          int
            return t0
    "/>

    
    <div class="box">
        <p>
            <i class="fas fa-info-circle fa-1x is-grey has-text-grey" style="margin-right: 0.5rem;"></i>
            Use the <code><a href="https://pkg.go.dev/golang.org/x/tools/cmd/ssadump">ssadump</a></code> CLI
            tool to view the SSA value graph for any Go program.
        </p>
    </div>
    
    <p>
        Starting at the top, <code>0</code> is the <i>entry block</i> of the function, an <code><a href="https://pkg.go.dev/golang.org/x/tools/go/ssa#BasicBlock">ssa.BasicBlock</a></code>
        executed when the function is called.
    </p>

    <br>

    <p>
        In this case, the entry block starts with two
        <code><a href="https://pkg.go.dev/golang.org/x/tools/go/ssa#Instruction">ssa.Instruction</a></code> objects. Both are
        <code><a href="https://pkg.go.dev/golang.org/x/tools/go/ssa#Store">ssa.Store</a></code> instructions to
        store the value of the first function argument (<code>a</code>) into a variable named <code>t0</code>,
        and the second function argument (<code>b</code>) into a variable named <code>t1</code>.
    </p>
    
    <br>

    <div class="columns is-mobile is-centered has-text-centered">
        <div class="column">
            <div class="box" id="t0">
                <code>t0</code>
            </div>
        </div>
        <div class="column">
            <div class="box" id="t1">
                <code>t1</code>
            </div>
        </div>
    </div>

    <br>

    <p>
        Those values are connected to the next value,
        a <a href="https://golang.org/ref/spec#Operators">binary operation</a> (<code><a href="https://pkg.go.dev/golang.org/x/tools/go/ssa#BinOp">ssa.BinOp</a></code>) instruction which adds the values of <code>t0</code>
        and <code>t1</code> together. The result of this operation is stored in a variable named <code>t2</code>. 
    </p>
    
    <br>

    <p>
        Then <code>t2</code> is connected to the next value, another <code>ssa.Instruction</code>
        object. The <code>ssa.Instruction</code> object is a <a href="https://golang.org/ref/spec#Operators">unary operator</a>
        which returns the value of <code>t2</code>. 
    </p>
    
    <br>

    <div class="box has-text-centered">
        <code>t2</code>
    </div>

    <br>

    <p>
        This <code>ssa.Value</code> object is connected to the next
        <code>ssa.Value</code> object by another <code>ssa.Instruction</code> object which stores the value of <code>t3</code>. 
        This value is used in a <a href="https://golang.org/ref/spec#Return_statements">return statement</a> which returns the value
        of <code>t3</code> using the last <code>ssa.Value</code> object in the graph, an <code><a href="https://pkg.go.dev/golang.org/x/tools/go/ssa#Return">ssa.Return</a></code> instruction.
    </p>    

    <br>
    
    <div class="box has-text-centered">
        <code>t3</code>
    </div>

    <br>

    <p>
        The <code>ssa.Value</code> object is connected to the <code>ssa.BasicBlock</code> object by a <code>ssa.Instruction</code>
        , a <a href="https://golang.org/ref/spec#Branch_statements">branch statement</a>
        which returns the value of <code>t3</code> and exits the function.
    </p>

    <br>

    <div class="box is-mobile">
        <p><strong>Function</strong></p>
        <br>
        <code>add(a, b int) int</code>
        <br>
        <br>
        <div class="box has-text-centered">
            <div class="box">
                <div class="columns is-mobile is-centered">
                    <div class="column is-clipped">
                        <div class="box is-clipped" id="t0">
                            <div class="box is-clipped" style="margin-top: 1rem;">
                                <p><strong class="has-text-grey is-clipped">Function Parameter</strong></p>
                                <br>
                                <code>a: int</code>
                            </div>
                            <code>t0: int</code>
                        </div>
                    </div>
                    <div class="column is-clipped">
                        <div class="box is-clipped" id="t1">
                            <div class="box is-clipped" style="margin-top: 1rem;">
                                <p><strong class="has-text-grey">Function Parameter</strong></p>
                                <br>
                                <code>b: int</code>
                            </div>
                            <code>t1: int</code>
                        </div>
                    </div>
                </div>
                <p><strong class="has-text-grey is-clipped">Binary Operation</strong></p>
                <br>
                <code>t2: int</code>
            </div>
            <p><strong class="has-text-grey is-clipped">Return Statement</strong></p>

            <br>
            <code>t3: int</code>
        </div>
    </div>

    <br>

    <p> 
        This is a simple example of a single function with two parameters and one return value. Other 
        functions are likely involved in the program you are trying to analyze, with more
        <code>ssa.Value</code> and <code>ssa.Instruction</code> objects. These objects may be passed
        as arguments to other functions, or returned as the result of a function call. Functions may
        also call other functions, building a related graph called a 
        <strong><a href="https://en.wikipedia.org/wiki/Call_graph">call graph</a></strong>.
    </p>

    <br>

    <p>
        Most static analysis is a combination of a <strong><a href="https://en.wikipedia.org/wiki/Data-flow_analysis">data flow analysis</a></strong> 
        and <strong><a href="https://en.wikipedia.org/wiki/Control-flow_graph">control flow analysis</a></strong>.
        Generally speaking, an SSA value graph is a data flow graph, and a call graph is a control flow graph.
    </p>
    <br>

    <h2 class="subtitle"><strong>Call Graph from SSA and Back Again</strong></h2>

    <p>
        We can construct a call graph by traversing the <code>ssa.Value</code> graph, keeping track of the
        functions we have visited, and how they are connected. This can be modeled using the
        <code><a href="https://pkg.go.dev/golang.org/x/tools/go/callgraph">golang.org/x/tools/go/callgraph</a></code> package.
    </p>
    
    <br>

    <p>
        This package provides a <code><a href="https://pkg.go.dev/golang.org/x/tools/go/callgraph#Graph">callgraph.Graph</a></code> object which contains a 
        <code><a href="https://pkg.go.dev/golang.org/x/tools/go/callgraph#Node">callgraph.Node</a></code> object for
        each function in the program. Each <code>callgraph.Node</code> object keeps track of the functions that call it ("in"), and
        the functions it calls ("out"). 
    </p>

    <br>

    <p>
        Building a <code>callgraph.Graph</code> can be performed using several different algorithms with off-the-shelf packages.
    </p>
    
    <br>

    <div class="table-container">
        <table class="table is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>Package</th>
                    <th>Acronym</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code><a href="https://pkg.go.dev/golang.org/x/tools/go/pointer">golang.org/x/tools/go/pointer</a></code></td>
                    <td class="has-text-grey-light">None</td>
                    <td>Pointer Analysis</td>
                </tr>
                <tr>
                    <td><code><a href="https://pkg.go.dev/golang.org/x/tools/go/callgraph/static">golang.org/x/tools/go/callgraph/static</a></code></td>
                    <td class="has-text-grey-light">None</td>
                    <td>Static Call Analysis</td>
                </tr>
                <tr>
                    <td><code><a href="https://pkg.go.dev/golang.org/x/tools/go/callgraph/cha">golang.org/x/tools/go/callgraph/cha</a></code></td>
                    <td>CHA</td>
                    <td>Class Hierarchy Analysis</td>
                </tr>
                <tr>
                    <td><code><a href="https://pkg.go.dev/golang.org/x/tools/go/callgraph/rta">golang.org/x/tools/go/callgraph/rta</a></code></td>
                    <td>RTA</td>
                    <td>Rapid Type Analysis</td>
                </tr>
                <tr>
                    <td><code><a href="https://pkg.go.dev/golang.org/x/tools/go/callgraph/vta">golang.org/x/tools/go/callgraph/vta</a></code></td>
                    <td>VTA</td>
                    <td>Variable Type Analysis</td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <p>
        Each of these algorithms has its own advantages and disadvantages. The <code>static</code> package is the most
        common, but is not as accurate in complex programs. The <code>cha</code> package is the most accurate, but is
        also the slowest. The <code>rta</code> and <code>vta</code> packages are faster than <code>cha</code>, but are less accurate.
        The <code>pointer</code> package is for <a href="https://en.wikipedia.org/wiki/Pointer_analysis">pointer analysis</a>, which is not a call graph, but can be used to construct one.
    </p>

    <br>

    <p>
        Knowing which algorithm to use depends on the program you are analyzing. The <code>cha</code> package is the most accurate,
        and is a good place to start. If you are analyzing a large program, you may want to use the <code>rta</code> or <code>vta</code> packages.
    </p>

    <br>

    <p>        
        You may need to experiment with different algorithms to find the best one for your targets or use case. I have
        even forked and modifed my own version of these packages to add additional functionality in the past.
    </p>

    <br>

    <p>
        Once you have a <code>callgraph.Graph</code> object, you can use it to anser questions like:
        <br>
        <br>
        <li>
            What functions are called by a given function?
        </li>
        <li>
            What functions call a given function?
        </li>
        <li>
            Are there any cycles in the call graph?
        </li>
        <li>
            Is there a path from function A to function B?
        </li>
        <br>

        And many more!
    </p>

    <br>

    <h3 class="subtitle"><strong>Taint Analysis</strong></h3>
    
    <p>
        The call graph path can be used as the foundation for additional analysis
        such as tainted data flow analysis. Tainted data flow analysis is a type of data flow analysis that
        tracks the flow of data through a program, and marks data as tainted when it is used in an unsafe way.
    </p>
    
    <br>

    <p>
        For example, if a function takes a string as an argument from an HTTP request, and that string is used in a SQL query, the
        string is tainted. If the tainted string is then used in a function that takes a string as an argument,
        the string is passed to the function tainted. This is the foundation for finding exploitable SQL injection vulnerabilities
        in a program.
    </p>

    <br>

    <p>
        Tainted data flow analysis is a fairly complex topic, and is beyond the scope of this blog post. However, I look
        forward to writing about it in depth in the near future. But, the key insight is that
        the call graph is a building block for this type of analysis, which is used
        along with an SSA value graph to perform the full analyis. We find where the SQL
        queries happen through the call graph (the "sink"), then use the SSA value graph to walk back
        to the tainted data (the "source"). The terms "source" and "sink" are common in the world of taint analysis,
        and are used to describe the start and end of the data flow.
    </p>
    
    <br>

    <p>
        The graphs would also indicate how 
        the tainted data is used in the SQL query, which is important for determining if the
        vulnerability is exploitable. If using a <a href="https://en.wikipedia.org/wiki/Prepared_statement">prepared statement</a> 
        (an <code><a href="https://pkg.go.dev/golang.org/x/tools/go/ssa#Const">ssa.Const</a></code>), then there is no exploit. The SQL query is
        safe. If using a <a href="https://en.wikipedia.org/wiki/SQL_injection">string concatenation</a> (an <code><a href="https://pkg.go.dev/golang.org/x/tools/go/ssa#BinOp">ssa.BinOp</a></code>),
        then there is an exploit. The SQL query is unsafe.        
    </p>

    <br>

    <p>
        These two types of graph-based analysis techniques are complementary and can be used to accurately
        inspect programs to find vulnerabilities. SSA provides the substrate for the analysis. This is generally
        a better interface to inspect a program than using the underlying 
        <a href="https://en.wikipedia.org/wiki/Abstract_syntax_tree">Abstract Syntax Tree</a> (AST) directly. The 
        SSA value graph and call graph provide additional
        lenses to view the program.
    </p>

    <br>

    <article class="panel is-info" id="lenses">
        <div class="panel-block has-text-grey is-active">
            <span class="panel-icon">
                <i class="fas fa-arrow-down" aria-hidden="true"></i>
            </span>
            Higher level
            
        </div>
        <div class="panel-block">
          <span class="panel-icon">
            <i class="fas fa-file" aria-hidden="true"></i>
          </span>
          Source
        </div>
        <div class="panel-block">
          <span class="panel-icon">
            <i class="fas fa-tree"  aria-hidden="true"></i>
          </span>
          AST
        </div>
        <div class="panel-block">
          <span class="panel-icon">
            <i class="fas fa-diagram-project"  aria-hidden="true"></i>
          </span>
          SSA
        </div>
        <div class="panel-block">
          <span class="panel-icon">
            <i class="fas fa-share-nodes"  aria-hidden="true"></i>
          </span>
          Call Graph
        </div>
        <div class="panel-block">
          <span class="panel-icon">
            <i class="fas fa-sink" aria-hidden="true"></i>
          </span>
          Taint Analysis
        </div>

        <div>
            <div class="panel-block has-text-grey is-active">
                <span class="panel-icon is-info">
                    <i class="fas fa-arrow-up" aria-hidden="true"></i>
                </span>
                Lower level
            </div>
        </div>

    </article>

    <br>

    <div class="box has-background-white-ter" style="background-image: linear-gradient(to bottom right, hsl(0, 0%, 98%), hsl(0, 0%, 96%));">
        <i class="fas fa-book fa-1x is-grey" style="margin-right: 0.5rem;"></i>
        Keep an eye out for my next blog post where I will dive into the details of SQL
        injection vulnerabilities and how to find them using taint analysis.
    </div>
</section>

<ReadMore posts={blogPosts} random="true" exclude='["gossa"]'/>
<Footer/>

<style>
    #lenses {
        color: white;
        border-width: 6px;
        border-left: 0;
        border-style: solid;
        border-image: 
            linear-gradient(
                to bottom, 
                hsl(217, 71%, 53%),
                hsl(0, 0%, 96%)
            ) 1 100%;
    }
</style>