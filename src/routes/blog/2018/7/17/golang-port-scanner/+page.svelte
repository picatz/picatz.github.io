<script lang="ts">
	import metadata from './metadata.json';
	import BlogHeader from '$lib/BlogHeader.svelte';
	import BlogPost from '$lib/BlogPost.svelte';
	import Code from '$lib/Code.svelte';
	import Link from '$lib/Link.svelte';
	import Panel from '$lib/Panel.svelte';
</script>

<BlogPost>
	<BlogHeader title={metadata.title} date="7-17-2018">
		<a href="https://golang.org/" class="text-blue-500">Golang</a> has a fantastic multi-threading API
		which allows for all sorts of opportunities for building high performance tools, including one of
		my favorites, a port scanner!
	</BlogHeader>

	<div class="mt-6">
		<Panel
			icon="fa-info-circle"
			color="bg-blue-50"
			iconColor="text-blue-500"
			ring="ring-1"
			ringColor="ring-blue-200"
		>
			<strong>Side Note:</strong> If you also like async/await style programming and Ruby, <Link
				url="/blog/2018/6/8/ruby-port-scanner">you might like this</Link
			>.
		</Panel>

		<p class="mt-6">
			I've written about building a port scanner several times before; and this implementation is
			the fastest one I've been able to create thus far. Utilizing the multi-threaded runtime and
			the baked-in concurrency model provided by Golang, asynchronous I/O performance is just
			beautiful.👌
		</p>

		<p class="mt-4">
			What does that end up looking like to actually code, and how fast does it go?
		</p>

		<h2 class="text-2xl font-bold mt-8 mb-4">📦 Assembling our Package</h2>

		<p class="mt-4">
			Like any other language, we'll pull in some libraries that have encapsulated the stuff we're
			interested in orchestrating into a useful program.
		</p>

		<p class="mt-4">
			In the world of Golang, we'll <code>import</code> a bunch of packages — and at the very top of
			our script, we'll declare it as our "main" package.
		</p>

		<Code
			language="go"
			code={`package main

import (
    "context"
    "fmt"
    "net"
    "os/exec"
    "strconv"
    "strings"
    "sync"
    "time"
    "golang.org/x/sync/semaphore"
)
// more code ...`}
		/>

		<p class="mt-6">
			Unlike object-orientated languages, there's no concept of a class wherein we add methods
			inside of. Instead, we can just attach functions to any type, ultimately giving us a method.
		</p>

		<p class="mt-4">
			So, let's make a type called <code>PortScanner</code> which will be struct type containing two
			fields: <code>ip</code> and <code>lock</code>.
		</p>

		<Code
			language="go"
			code={`type PortScanner struct {
    ip   string
    lock *semaphore.Weighted
}`}
		/>

		<p class="mt-6">
			The <code>ip</code> will be the IP address of the host on the network we're interested in
			scanning. The <code>lock</code> will act as a threshold that will limit the number of go routines
			that will be running at any given time.
		</p>

		<p class="mt-4">
			To set our <code>lock</code> based on the limits of the operating system, we may opt to use
			the value of the <code>ulimit</code> command. This can be captured to be parsed using the
			<code>os/exec</code> package.
		</p>

		<Panel
			icon="fa-info-circle"
			color="bg-gray-50"
			iconColor="text-gray-600"
			ring="ring-1"
			ringColor="ring-gray-300"
		>
			<strong>Note:</strong> <code>ulimit</code> is a builtin shell command used to manage various
			resource restrictions. The <code>-n</code> flag will reveal the maximum number of open files allowed;
			we can capture the output of this command and convert it to the right type.
		</Panel>

		<p class="mt-6">
			To abstract that whole process away of getting the value from the command-line, I decided to
			put it in a function called <code>Ulimit</code>.
		</p>

		<Code
			language="go"
			code={`func Ulimit() int64 {
    out, err := exec.Command("ulimit", "-n").Output()
    if err != nil {
        panic(err)
    }
    s := strings.TrimSpace(string(out))
    i, err := strconv.ParseInt(s, 10, 64)
    
    if err != nil {
        panic(err)
    }
    return i
}`}
		/>

		<p class="mt-6">
			Since we're building a port scanner, we're going to need another function that can actually,
			ya' know, scan the port. The <code>net</code> package includes a convenient method to make a connection
			with an allotted timeout value.
		</p>

		<Code
			language="go"
			code={`func ScanPort(ip string, port int, timeout time.Duration) {
    target := fmt.Sprintf("%s:%d", ip, port)
    conn, err := net.DialTimeout("tcp", target, timeout)
    
    if err != nil {
        if strings.Contains(err.Error(), "too many open files") {
            time.Sleep(timeout)
            ScanPort(ip, port, timeout)
        } else {
            fmt.Println(port, "closed")
        }
        return
    }
    
    conn.Close()
    fmt.Println(port, "open")
}`}
		/>

		<p class="mt-6">
			As you probably noticed, most of the <code>ScanPort</code> function deals with the
			<code>err</code>
			from <code>net.DialTimeout</code>. This is because, as with any port scanner, we have some
			errors to juggle:
		</p>

		<h3 class="text-xl font-semibold mt-8 mb-4">🤹🏻‍♂️ Three Essential Errors to Juggle:</h3>

		<div class="space-y-4">
			<div class="flex items-start space-x-3">
				<span class="text-red-500 text-lg">🛑</span>
				<div>
					<p>
						<strong><code>connect: connection refused</code></strong> is an error that will occur
						when a port is not open to connect to. This is a pretty typical response for most ports,
						and this response that is enforced with most <code>REJECT</code> firewall rules.
					</p>
				</div>
			</div>

			<div class="flex items-start space-x-3">
				<span class="text-yellow-500 text-lg">⏱</span>
				<div>
					<p>
						<strong><code>dial: i/o timeout</code></strong> is an error produced by
						<code>net.DialTimeout</code>
						when an operation didn't complete within the allotted timeout value. This may happen for
						various reasons including a <code>DROP</code> firewall rule where the target doesn't explicitly
						tell you a port isn't open from the scanner's perspective. We really don't want to wait around
						forever to get nothing.
					</p>
				</div>
			</div>

			<div class="flex items-start space-x-3">
				<span class="text-blue-500 text-lg">📑</span>
				<div>
					<p>
						<strong><code>socket: too many open files</code></strong> is an error that will occur when
						we try to connect to a port, but we have way too many connections (files, really) already
						open and need to schedule the execution to happen again, but just a little later, continuously
						delaying its execution until it's able to be processed.
					</p>
				</div>
			</div>
		</div>

		<p class="mt-6">
			Based on the result of the error for the connection attempt, if the attempt failed as a result
			of too many files being open on the system, we'll delay the execution of that port scan. Once
			the delay returns, we can again retry it until the connections fails because of a timeout or,
			better yet, a successful connection.
		</p>

		<p class="mt-4">
			To use the <code>ScanPort</code> method for a range of ports, we'll implement a method on the
			<code>PortScanner</code>
			struct that will scan a given range of ports (from the first <code>f</code> to the last one
			<code>l</code>) along with a <code>Duration</code> to use as a timeout. We'll call this
			function <code>Start</code>, as it will kick-off the actual connection attempts later on.
		</p>

		<Code
			language="go"
			code={`func (ps *PortScanner) Start(f, l int, timeout time.Duration) {
    wg := sync.WaitGroup{}
    defer wg.Wait()
    
    for port := f; port <= l; port++ {       
        wg.Add(1)
        ps.lock.Acquire(context.TODO(), 1)
        go func(port int) {
            defer ps.lock.Release(1)
            defer wg.Done()
            ScanPort(ps.ip, port, timeout)
        }(port)
    }
}`}
		/>

		<h3 class="text-xl font-semibold mt-8 mb-4">Limiting Go Routines for Performance</h3>

		<p class="mt-4">
			While it is be easy to just spawn off a new go routine for every connection attempt, this
			isn't the most efficient way of utilizing our computer's resources. Instead, it's much better
			to bound our connections attempts to a set size based on our shell's limits. The <code
				>lock</code
			> in our port scanner "locks down" the concurrent connection attempts, and thus wastes significantly
			less time by not trying to exceed its threshold.
		</p>

		<h2 class="text-2xl font-bold mt-8 mb-4">The Main Function</h2>

		<p class="mt-4">
			All that's left is to write our program's <code>main</code> function to use the code we just implemented
			to scan all of the ports on our local host.
		</p>

		<Code
			language="go"
			code={`func main() {
    ps := &PortScanner{
        ip:   "127.0.0.1",
        lock: semaphore.NewWeighted(Ulimit()),
    }
    ps.Start(1, 65535, 500*time.Millisecond)
}`}
		/>

		<h2 class="text-2xl font-bold mt-8 mb-4">🔨 Compiling the Program</h2>

		<p class="mt-4">Compiling our port scanner is as trivial as running the following command:</p>

		<Code language="bash" code={`$ go build port_scanner.go`} />

		<p class="mt-4">
			Which provides us with a binary which we can execute to perform our port scan now:
		</p>

		<Code language="bash" code={`$ ./port_scanner`} />

		<p class="mt-4">
			But, how fast does it go? Let's use the <code>time</code> command on unix-like systems to give
			us a quick benchmark for an idea:
		</p>

		<Code
			language="bash"
			code={`$ time ./port_scanner
...
real    0m31.384s
user    0m4.766s
sys     0m7.653s`}
		/>

		<p class="mt-4">
			Let's do the math on that: <strong>65535 ports / 31 seconds</strong> is about
			<strong>2000</strong>
			ports a second. That's incredibly fast, and 2x faster than <Link
				url="/blog/2018/6/8/ruby-port-scanner"
				>the single-threaded Ruby version I've made before</Link
			>! 🚀
		</p>

		<h2 class="text-2xl font-bold mt-8 mb-4">📃 Source Code</h2>

		<p class="mt-4">
			Below is the full source code for the scanner (copy+paste friendly for testing):
		</p>

		<Code
			title="Complete port scanner source code"
			language="go"
			code={`package main

import (
    "context"
    "fmt"
    "net"
    "os/exec"
    "strconv"
    "strings"
    "sync"
    "time"
    "golang.org/x/sync/semaphore"
)

type PortScanner struct {
    ip   string
    lock *semaphore.Weighted
}

func Ulimit() int64 {
    out, err := exec.Command("ulimit", "-n").Output()
    if err != nil {
        panic(err)
    }
    s := strings.TrimSpace(string(out))
    i, err := strconv.ParseInt(s, 10, 64)
    
    if err != nil {
        panic(err)
    }
    return i
}

func ScanPort(ip string, port int, timeout time.Duration) {
    target := fmt.Sprintf("%s:%d", ip, port)
    conn, err := net.DialTimeout("tcp", target, timeout)
    
    if err != nil {
        if strings.Contains(err.Error(), "too many open files") {
            time.Sleep(timeout)
            ScanPort(ip, port, timeout)
        } else {
            fmt.Println(port, "closed")
        }
        return
    }
    
    conn.Close()
    fmt.Println(port, "open")
}

func (ps *PortScanner) Start(f, l int, timeout time.Duration) {
    wg := sync.WaitGroup{}
    defer wg.Wait()
    
    for port := f; port <= l; port++ {       
        wg.Add(1)
        ps.lock.Acquire(context.TODO(), 1)
        go func(port int) {
            defer ps.lock.Release(1)
            defer wg.Done()
            ScanPort(ps.ip, port, timeout)
        }(port)
    }
}

func main() {
    ps := &PortScanner{
        ip:   "127.0.0.1",
        lock: semaphore.NewWeighted(Ulimit()),
    }
    ps.Start(1, 65535, 500*time.Millisecond)
}`}
		/>

		<h2 class="text-2xl font-bold mt-8 mb-4">👋 Conclusion</h2>

		<p class="mt-4">
			The multi-threaded runtime in Golang coupled with an asynchronous design allows for some
			incredible performance for a simple port scanner. Feel free to hack on it some more or let me
			know where it could be improved.
		</p>

		<p class="mt-4">Until next time, that's all folks!</p>
	</div>
</BlogPost>
