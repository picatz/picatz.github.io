<script>
    import BlogPostHeader from '../BlogPostHeader.svelte'
    import Command from '../Command.svelte'
    import CodeSnippet from '../CodeSnippet.svelte'

    import ReadMore from '../ReadMore.svelte'
    import blogPosts from '../posts.js'
	import Footer from '../Footer.svelte'
</script>

<section class="section">
    <BlogPostHeader id="taint" title="Static Taint Analysis for Go" date="2023-1-2"/>

    <div class="box">
        <p>
            <i class="fas fa-book fa-1x is-grey has-text-grey" style="margin-right: 0.5rem;"></i>
            Following my <a href="/#blog/gossa"><strong>previous blog post</strong></a> on <a href="https://en.wikipedia.org/wiki/Static_single-assignment_form">Static Single Assignment </a>(SSA),
            I've been working on a static <a href="https://en.wikipedia.org/wiki/Taint_checking">taint analysis</a> package for Go programs. It serves as a building block for
            other analysis like <a href="https://en.wikipedia.org/wiki/SQL_injection">SQL injection</a>, <a href="https://en.wikipedia.org/wiki/Cross-site_scripting">XSS</a>, and more. This is how it works.
        </p>
    </div>
   
    <div class="box has-text-white" style="background-image: linear-gradient(to bottom right, hsl(217, 71%, 53%), hsl(204, 71%, 39%));">
        <p>
            <i class="fas fa-box fa-1x is-grey has-text-white" style="margin-right: 0.5rem;"></i>
            <u><a href="https://pkg.go.dev/github.com/picatz/taint"><code style="background: transparent; color: white">github.com/picatz/taint</code></a></u>
        </p>
   </div>
   
   <h2 class="subtitle"><strong>Taint Analysis</strong></h2>

    <p>
        Taint analysis is a <a href="https://en.wikipedia.org/wiki/Static_program_analysis">static program analysis</a> technique 
        that tracks the flow of data through a program to identify where "source" of (user controlled) data reaches a "sink", a 
        place where the data is used in an unsafe way. For example, if a user controlled string is passed to a function that 
        executes a SQL query, the string is a <i>source</i> of data that reaches a <i>sink</i>, the SQL query. This would result
        in a <a href="https://en.wikipedia.org/wiki/SQL_injection">SQL injection</a> vulnerability in the program.
    </p>

    <br>

    <CodeSnippet lang="go" class="is-clipped" block='
func business(db *sql.DB, q string) {"{"}
    db.Query(q) // potential sql injection
}

func run() {"{"}
    db, _ := sql.Open("sqlite3", ":memory:")

    mux := http.NewServeMux()

    mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {"{"}
            business(db, r.URL.Query().Get("sql-query"))
    })

    http.ListenAndServe(":8080", mux)
}
'/>

    <br>

    <p>
        Static single-assignment (<a href="https://en.wikipedia.org/wiki/Static_single-assignment_form">SSA</a>) provides the foundation for
        performing taint analysis. SSA is an <a href="https://en.wikipedia.org/wiki/Intermediate_representation">intermediate representation</a> 
        that is generally easier to work with than the original program's abstract syntax tree (<a href="https://en.wikipedia.org/wiki/Abstract_syntax_tree">AST</a>).
        SSA provides value graph of the program, where each node is a value, instruction, or both. Read more about SSA in my
        <a href="/#blog/gossa"><strong>previous blog post</strong></a>.
    </p>

    <br>

    <p>
        The SSA value graph is transformed to a function <a href="https://en.wikipedia.org/wiki/Call_graph">call graph</a>, where each node is a function from a target
        program, and each edge is a <i>call</i> to that function. This represents the program's <a href="https://en.wikipedia.org/wiki/Control-flow_graph">control flow graph</a>,
        that can be used to identify <a href="https://en.wikipedia.org/wiki/Data-flow_analysis">data flow</a> through the program. The data found in the program is
        represented with specific <a href="https://en.wikipedia.org/wiki/Type_system">types</a>, that can be used to find the flow form a <i>source</i> to a <i>sink</i>.
        All of the nodes between the source and sink make up a <i>path</i> that represents a potential vulnerability.
    </p>
    
    <br>

    <div class="columns is-vcentered is-mobile">
        <div class="column is-two-fifths">
            <div class="box is-clipped">
                <p class="has-text-centered"><strong>Source</strong></p>
                    <p class="has-text-centered is-clipped">
                        <a href="https://pkg.go.dev/net/http#Request"><code>*net/http.Request</code></a>
                    </p>
            </div>
        </div>

        <div class="column has-text-centered is-narrow is-one-fifth is-clipped">
            <p class="has-text-centered"><strong>Path</strong></p>
            <i class="fas fa-arrow-right fa-2x is-grey has-text-grey"></i>
        </div>

        <div class="column is-two-fifthsd">
            <div class="box is-clipped">
            <p class="has-text-centered"><strong>Sink</strong></p>
                <p id="memory" class="has-text-centered is-clipped">
                    <a href="https://pkg.go.dev/net/http#Request"><code>(*database/sql.DB).Query</code></a>
                </p>
            </div>
        </div>
    </div>

    <br>

    <p>
        To use the taint analysis package, we need to first create a set of <i>source</i> and <i>sink</i> values,
        and then pass them to the <a href="https://pkg.go.dev/github.com/picatz/taint#Check"><code>taint.Check</code></a> function.
    </p>

    <br>

    <CodeSnippet lang="go" class="is-clipped" block='
sources := taint.NewSources(
    "*net/http.Request",
)

sinks := taint.NewSources(
    "(*database/sql.DB).Query",
    "(*database/sql.DB).QueryContext",
    "(*database/sql.DB).QueryRow",
    "(*database/sql.DB).QueryRowContext",
    "(*database/sql.Tx).Query",
    "(*database/sql.Tx).QueryContext",
    "(*database/sql.Tx).QueryRow",
    "(*database/sql.Tx).QueryRowContext",
)

results, _ := taint.Check(cg, sources, sinks)
'/>

    <p>
        The returned <code>results</code> contains of slice of <a href="https://pkg.go.dev/github.com/picatz/taint#Result"><code>taint.Result</code></a> 
        values, which contain the <i>path</i> from the <i>source</i> to the <i>sink</i>. We can use information from the path to understand the context of the vulnerability. For example, if
        the SQL query is being executed using a prepared statement which would prevent SQL injection. This can be done by checking the last node in the path, which is the <i>sink</i>, and
        checking if the <i>sink</i> is a <a href="https://pkg.go.dev/golang.org/x/tools/go/ssa#Const"><code>*ssa.Const</code></a> value. Otherwise we can report a potential vulnerability.
    </p>

    <br>


    <CodeSnippet lang="go" class="is-clipped" block='
for _, result := range results {"{"}
    queryEdge := result.Path[len(result.Path)-1]
    
    queryArgs := queryEdge.Site.Common().Args[1:]
    
    if strings.HasPrefix(queryEdge.Site.Value().Call.Value.String(), "Context") {"{"}
    	queryArgs = queryArgs[1:]
    }
    
    query := queryArgs[0]
    
    if _, isConst := query.(*ssa.Const); !isConst {"{"}
    	pass.Reportf(result.SinkValue.Pos(), "potential sql injection")
    }
}
'/>

    <p>
        A full example of the taint analysis package used to detect SQL injection vulnerabilities is available on
        GitHub <a href="https://github.com/picatz/taint/blob/main/sql/injection/injection.go"><strong>here</strong></a>.
        This can be installed as the <a href="https://github.com/picatz/taint/blob/main/cmd/sqli/main.go"><code>sqli</code></a> CLI tool, which can be used to detect SQL injection vulnerabilities
        in Go programs.
    </p>

    <br>

    <Command input="go install github.com/picatz/taint/cmd/sqli@latest"/>

    <p>
        To use the <a href="https://github.com/picatz/taint/blob/main/cmd/sqli/main.go"><code>sqli</code></a> CLI tool, change to the directory of the target Go program, and run the tool.
    </p>
    
    <br>
    
    <Command input="sqli ./..."/>

    <div class="box">
        <p>
            <i class="fas fa-info-circle fa-1x is-grey has-text-grey" style="margin-right: 0.5rem;"></i>
            The <code>./...</code> pattern is a <a href="https://pkg.go.dev/golang.org/x/tools/go/analysis"><code>go/analysis</code></a> 
            <a href="https://cs.opensource.google/go/x/tools/+/refs/tags/v0.1.10:go/packages/packages.go;drc=c1dd25e80b559a5b0e8e2dd7d5bd1e946aa996a0;l=252"><i>pattern</i></a>, which is used to specify the packages to analyze.
            This pattern is used to specify the current directory and all subdirectories, which is useful for analyzing a large Go program. Other patterns such as <code>path@version</code> can be found
            <a href="https://pkg.go.dev/cmd/go/internal/list"><strong>here</strong></a>.
        </p>
    </div>

    <p>
        The core of the taint analysis algorithm is the <a href="https://pkg.go.dev/github.com/picatz/taint#Check"><code>taint.Check</code></a> function, which takes a call graph of a target program
        and a set of <i>source</i> and <i>sink</i> values. It first checks for the <a href="https://en.wikipedia.org/wiki/Reachability"><i>reachability</i></a> of the <i>source</i>, then performs
        "<a href="https://en.wikipedia.org/wiki/Data-flow_analysis#Backward_analysis">backwards</a>" data flow analysis to determine if the <i>source</i> can reach the <i>sink</i>. This is implemented
        in a few hundred lines of code using three internal functions, <a href="https://github.com/picatz/taint/blob/f43d4ad739949712398a6211e4d45ecdc38a524c/check.go#L104"><code>checkPath</code></a>,
        <a href="https://github.com/picatz/taint/blob/f43d4ad739949712398a6211e4d45ecdc38a524c/check.go#L140"><code>checkSSAValue</code></a>, and 
        <a href="https://github.com/picatz/taint/blob/f43d4ad739949712398a6211e4d45ecdc38a524c/check.go#L487"><code>checkSSAInstruction</code></a>.
    </p>

    <br>
 
    <div class="diagram is-flex is-flex-shrink-1 has-text-centered">
        <div class="columns is-mobile is-vcentered">
            <div class="column">
                <div class="box" id="Check"><a href="https://pkg.go.dev/github.com/picatz/taint#Check"><code>taint.Check</code></a></div>
            </div>
            <div class="column is-narrow">
                <i class="fas fa-arrow-right fa-2x is-grey has-text-grey"></i>
            </div>
            <div class="column">
                <div class="box">
                    <div class="box" id="checkPath"><a href="https://github.com/picatz/taint/blob/f43d4ad739949712398a6211e4d45ecdc38a524c/check.go#L104"><code>checkPath</code></div>
                    <div class="box" id="checkSSAValue"><a href="https://github.com/picatz/taint/blob/f43d4ad739949712398a6211e4d45ecdc38a524c/check.go#L140"><code>checkSSAValue</code></a></div>
                    <div class="box" id="checkSSAInstruction"><a href="https://github.com/picatz/taint/blob/f43d4ad739949712398a6211e4d45ecdc38a524c/check.go#L487"><code>checkSSAInstruction</code></div>
                </div>
            </div>
            <div class="column is-narrow">
                <i class="fas fa-arrow-right fa-2x is-grey has-text-grey"></i>
            </div>
            <div class="column">
                <div class="box" id="Results"><a href="https://pkg.go.dev/github.com/picatz/taint#Results"><code>taint.Results</code></a></div>
            </div>
        </div>
    </div>

    <br>

    <p>
        If you have any questions, issues, or feedback, please feel free to open an issue on the <a href="https://github.com/picatz/taint"><strong>repository</strong></a>.
        The ultimate goal for the future would be to donate it to the <a href="https://pkg.go.dev/golang.org/x/tools/go/analysis"><code>go/analysis</code></a> collection
        of packages to be used for other taint analysis problems by the community. 
    </p> 
</section>

<ReadMore posts={blogPosts} random="true" exclude='["taint"]'/>
<Footer/>

<style>
    .diagram {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  
    .diagram .box {
      margin: 0.5em;
      padding: 0.5em;
      text-align: center;
    }
</style>