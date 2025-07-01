<script>
	import metadata from './metadata.json';
	import BlogHeader from '$lib/BlogHeader.svelte';
	import BlogPost from '$lib/BlogPost.svelte';
	import Code from '$lib/Code.svelte';
	import Link from '$lib/Link.svelte';
	import Panel from '$lib/Panel.svelte';
</script>

<BlogPost>
	<BlogHeader title={metadata.title} date="06-08-2018">
		Asynchronous, high performance, and Ruby — you might not think that makes a lot of sense.
		However, the <Link url="https://github.com/socketry/async">async</Link> Ruby future is here; and
		it's fast.
	</BlogHeader>

	<div class="mt-6">
		<p class="mt-4">
			To see just how fast, let's try building an asynchronous <Link
				url="https://en.wikipedia.org/wiki/Port_scanner">port scanner</Link
			>; meaning a port scanner that can look for many open ports at a time. To qualify as "fast",
			at least for the sake of this blog post, means it should be able to scan hundreds of ports a
			second.
		</p>

		<p class="mt-4">Just how do we do that?</p>

		<h2 class="text-2xl font-bold mt-8 mb-4">🔧 Single-Threaded Design</h2>

		<p class="mt-4">
			The first option you might jump to in order to increase performance in languages like Ruby or
			Python is usually multi-threading. This isn't the absolute worst choice but quickly becomes a
			bottle-neck in and of itself due to a <Link
				url="https://en.wikipedia.org/wiki/Global_interpreter_lock">global lock</Link
			> these languages enforce on their runtime ensuring only one thread runs at a time, even if you
			have many.
		</p>

		<p class="mt-4">
			Effectively, this means your "multi-threaded" programs are really more like a confusing
			single-threaded program — sometimes actually performing worse than their truly single-threaded
			variants. If this is the first time you've heard this, it can be kind'of tricky to really
			understand.
		</p>

		<p class="mt-4">
			The main advantage of using multi-threading is providing a means to deal with real world
			situations like network or disk I/O (input/output) operational latency. So, programmers have
			come up with abstractions to deal with this. With multi-threading APIs in Ruby or Python, we
			have an abstraction as a programmer to splice up our work into time segments. On I/O blocking
			operations, the language will decide that another thread can run, usually providing a speed
			boost for things like varying network connection speeds. This doesn't come cheap though.
		</p>

		<p class="mt-4">
			Threads will often end up "fighting" each-other for control of the runtime causing CPU
			context-switching which eats up your performance. This can be a really annoying thing to wrap
			your head around and provide a rather erratic runtime behavior that is a pain to debug or code
			complex interactions.
		</p>

		<p class="mt-4">
			To avoid the headache of orchestrating multiple threads, we will be building a single-threaded
			port scanner. But, like in a multi-threaded program, we still want to be able to weave
			together tasks asynchronously.
		</p>

		<div class="bg-gray-50 border-l-4 border-gray-400 p-4 my-6">
			<p class="text-sm text-gray-700 italic">
				If a program can be broken up into a series of tasks that can be executed independently, it
				can be considered asynchronous. It is a property of how a program can be executed, not what
				it does. —<Link url="https://www.codeotaku.com/journal/2018-06/asynchronous-ruby/index"
					>Samuel Williams</Link
				>
			</p>
		</div>

		<h2 class="text-2xl font-bold mt-8 mb-4">⚡️ Modern Async Support for Ruby</h2>

		<p class="mt-4">
			For sometime now, <Link url="https://github.com/ioquatix">Samuel Williams</Link> and <Link
				url="https://gitter.im/socketry/async">friends</Link
			> have been working away on bringing modern, asynchronous and timeout-capable <Link
				url="https://en.wikipedia.org/wiki/Input/output">I/O</Link
			> for Ruby to the masses under the <Link url="https://github.com/socketry">Socketry</Link> project.
		</p>

		<div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
			<p class="text-sm text-blue-700">
				<strong>Side Note:</strong> You can read more about it <Link
					url="https://www.codeotaku.com/journal/2018-06/asynchronous-ruby/index">here</Link
				>.
			</p>
		</div>

		<p class="mt-4">
			Using <code><Link url="https://github.com/socketry/async-await">async-await</Link></code> will
			provide us with a clean API to describe asynchronous tasks. To ensure our network connections
			are asynchronous, we will use
			<code><Link url="https://github.com/socketry/async-io">async-io</Link></code>. Using
			<code>async</code>
			Gems within the Socketry project provides a plethora of options to build <Link
				url="https://en.wikipedia.org/wiki/Non-blocking">non-blocking I/O</Link
			> programs with great performance. The underlying design of <code>async</code> is based on a <Link
				url="https://en.wikipedia.org/wiki/Reactor_pattern">Reactor Pattern</Link
			> for concurrency backed by <Link url="https://ruby-doc.org/core-2.5.0/Fiber.html"
				>Fibers</Link
			>.
		</p>

		<div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
			<p class="text-sm text-blue-700">
				<strong>Side Note:</strong> Another project you might want to check out is <Link
					url="https://github.com/socketry/falcon">Falcon</Link
				>, a <Link url="https://www.codeotaku.com/journal/2018-06/improving-ruby-concurrency/index"
					>high performance</Link
				> asynchronous multi-process web-server built on <code>async</code> libraries.
			</p>
		</div>

		<h2 class="text-2xl font-bold mt-8 mb-4">👩🏽‍💻 Implementing the Port Scanner with Async</h2>

		<p class="mt-4">
			To get started, let's write the first part of the script to <code>require</code> the
			<code>async</code> libraries we want to use.
		</p>

		<Code language="ruby">
			{`require "async/await"
require "async/io"
require "async/semaphore"

# more code ...`}
		</Code>

		<p class="mt-6">
			Now, let's create a <code>PortScanner</code> class, including the libraries within it to
			provide clean <code>async</code> semantics and create our
			<code
				><Link url="http://ruby-for-beginners.rubymonstas.org/writing_classes/initializers.html"
					>#initialize</Link
				></code
			> method:
		</p>

		<Code language="ruby">
			{`# previous code ...

class PortScanner
  include Async::Await
  include Async::IO
  
  def initialize(host: "127.0.0.1", ports: (1..1024))
    @host      = host
    @ports     = ports
    @semaphore = Async::Semaphore.new(\`ulimit -n\`.to_i)
  end
  
  # more code...
end`}
		</Code>

		<p class="mt-6">
			By default, if no <code>host:</code> argument is given when creating a new instance of our
			scanner, our localhost will be the target to scan. If not given any <Link
				url="https://ruby-doc.org/core-2.5.0/Range.html">Range</Link
			>/<Link url="https://ruby-doc.org/core-2.5.0/Array.html">Array</Link>/<Link
				url="https://ruby-doc.org/core-2.5.1/Enumerable.html">Enumerable</Link
			> for <code>ports:</code>, then ports
			<code
				><Link url="https://www.w3.org/Daemon/User/Installation/PrivilegedPorts.html">1...1024</Link
				></code
			>
			will be used, very similar to <code><Link url="https://nmap.org/">nmap</Link></code>.
		</p>

		<p class="mt-4">
			The <code
				><Link url="https://en.wikipedia.org/wiki/Semaphore_(programming)">@semaphore</Link></code
			>
			will be used to lock down the number of scans going on at a time to whatever the max number of
			available file descriptors are on the system. For every open connection, there's an open file on
			the system, and we want to limit this to what
			<code><Link url="http://wiki.linuxquestions.org/wiki/Ulimit">ulimit</Link></code> tells us that
			is, at least specifically on unix-like operating systems including macOS or Linux.
		</p>

		<div class="bg-gray-50 border-l-4 border-gray-400 p-4 my-6">
			<p class="text-sm text-gray-700">
				<strong>Note:</strong>
				<code><Link url="http://wiki.linuxquestions.org/wiki/Ulimit">ulimit</Link></code>
				is a <Link url="http://wiki.linuxquestions.org/wiki/Builtin">builtin</Link> shell command used
				to manage various resource restrictions. The <code>-n</code> flag will reveal the maximum
				number of open files allowed; <code>#to_i</code> on the output from that command in the code
				will turn it into a <Link url="https://ruby-doc.org/core-2.5.0/Integer.html">Integer</Link>.
				We cache this result and use it to set the maximum number of open connections we'll try at a
				time, since there's no reason to push past that threshold.
			</p>
		</div>

		<p class="mt-4">
			Now, let's implement a method which can scan a single port in our <code>PortScanner</code> class:
		</p>

		<div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
			<p class="text-sm text-yellow-700">
				⚠️ This is the code to scan a single port. Moreover, this is will be the most complicated
				part of the code because of all the things we need to juggle, which I'll explain in a bit
				more detail in just a moment.
			</p>
		</div>

		<Code language="ruby">
			{`# inside of PortScanner, under initialize ...

def scan_port(port, timeout: 0.5)
  timeout(timeout) do
    Async::IO::Endpoint.tcp(@host, port).connect do |peer|
      peer.close
      puts "#{port} open"
    end
  end
rescue Errno::ECONNREFUSED, Async::TimeoutError
  puts "#{port} closed"
rescue Errno::EMFILE
  sleep timeout
  retry
end

# more code...`}
		</Code>

		<h3 class="text-xl font-semibold mt-8 mb-4">🤹🏻‍ Three Essential Errors to Juggle:</h3>

		<div class="space-y-4">
			<div class="flex items-start space-x-3">
				<span class="text-xl">🛑</span>
				<div>
					<p>
						<code>Errno::ECONNREFUSED</code> is an error that will occur when a port is not open to
						connect to. This is a pretty typical response for most ports, and this response that is
						enforced with most
						<code
							><Link
								url="https://serverfault.com/questions/157375/reject-vs-drop-when-using-iptables"
								>REJECT</Link
							></code
						> firewall rules.
					</p>
				</div>
			</div>

			<div class="flex items-start space-x-3">
				<span class="text-xl">⏱</span>
				<div>
					<p>
						<code>Async::TimeoutError</code> is an error produced by <code>timeout(timeout)</code>
						when an operation didn't complete within the allotted <code>timeout:</code> value
						(default of <code>0.5</code>). This may happen for various reasons including a
						<code
							><Link
								url="https://serverfault.com/questions/157375/reject-vs-drop-when-using-iptables"
								>DROP</Link
							></code
						> firewall rule where the target doesn't explicitly tell you a port isn't open from the scanner'
						perspective. We really don't want to wait around forever to get nothing.
					</p>
				</div>
			</div>

			<div class="flex items-start space-x-3">
				<span class="text-xl">📑</span>
				<div>
					<p>
						<code>Errno::EMFILE</code> is an error that will occur when we try to connect to a port,
						but we have way too many connections (files, really) already open and need to schedule the
						execution to happen again, but just a little later, continuously delaying its execution until
						it's able to be processed.
					</p>
				</div>
			</div>
		</div>

		<p class="mt-6">
			To break down what's happening, the method <code>#scan_port</code> will attempt to connect to
			the target on the given <code>port</code> — I know, that's the obvious part.
		</p>

		<p class="mt-4">
			If any error occurs — and that's going to happen— we can <code
				><Link url="http://rubylearning.com/satishtalim/ruby_exceptions.html">rescue</Link></code
			> that method and do something based on the cause of the error, right inside of the method itself.
		</p>

		<p class="mt-4">
			🤔 <strong>Why do we do this again?</strong>
		</p>

		<p class="mt-4">
			During a port scan, especially for very large ranges, say thousands, or tens of thousands, our
			scanner may try to open up a connection, but — due the the limitations of our operating system
			— we may not be able to. We could be browsing <Link url="https://twitter.com/KentGruber"
				>Twitter</Link
			> or <Link url="https://github.com/picatz">GitHub</Link> while our scanner runs super large batches
			after-all. Remember <code>ulimit</code> and the <code>@semaphore</code> from earlier inside of
			<code>#initialize</code>?
		</p>

		<p class="mt-4">
			Keeping track of the appropriate errors helps prevent missing open ports on larger scan ranges
			and allows us to handle things according to the error. In certain situations, multi-threaded
			port scanners can end up missing open ports simply because the scanner is counting any and all
			errors as a "closed port" when it probably should be retrying the ports that error'd out
			because of the operating system's limitations. This goes for basically every port scanning
			implementation I've created and/or used.
		</p>

		<p class="mt-4">
			In order to scan all the ports the <code>PortScanner</code> class is initialized with, let's
			implement a <code>#start</code> method which will iterate over each port and calls the
			<code>#scan_port</code>
			method we just created. But, this time we'll use the <code>async</code> keyword in-front of the
			method definition.
		</p>

		<Code language="ruby">
			{`# inside of PortScanner, under scan_port ...

async def start(timeout: 0.5)
  @ports.map do |port|
    @semaphore.async do
      scan_port(port, timeout: timeout)
    end
  end.collect(&:result)
end`}
		</Code>

		<p class="mt-6">
			Within the <code>#start</code> method, each port in the range that the
			<code>PortScanner</code>
			is initialized with will be scanned, running asynchronously — and resource bound to the operating
			system's limitations with the <code>@semaphore</code>. The
			<code>#collect(&:result)</code> near the very end of the method will allow us to collect the result
			of each port scan attempt.
		</p>

		<h2 class="text-2xl font-bold mt-8 mb-4">⚙️ Using the Scanner</h2>

		<p class="mt-4">
			To use the port scanning API we just created could look something just like the following:
		</p>

		<Code language="ruby">
			{`# previous code ...

PortScanner.new(host: "127.0.0.1", ports: (1..1024)).start`}
		</Code>

		<p class="mt-6">
			There aren't any open ports to test with? Using <code
				><Link url="https://en.wikipedia.org/wiki/Netcat">nc</Link></code
			>, it's pretty easy to create some open ports. The following will setup a <Link
				url="https://en.wikipedia.org/wiki/Transmission_Control_Protocol">TCP</Link
			> listener on your localhost on port <code>1024</code>:
		</p>

		<Code language="bash">
			{`$ nc -v -l -p 1024`}
		</Code>

		<p class="mt-4">
			Now, let's run our port scanner, using <code
				><Link url="https://en.wikipedia.org/wiki/Grep">grep</Link></code
			> to filter for the open ports:
		</p>

		<Code language="bash">
			{`$ ruby async_port_scanner.rb | grep "open"
1024 open`}
		</Code>

		<p class="mt-4">
			💥Bam! Just like that, we have a port scanner! How fast does it go? Using <code
				><Link url="https://en.wikipedia.org/wiki/Time_(Unix)">time</Link></code
			> on Unix-like operating systems can help us get an idea:
		</p>

		<Code language="bash">
			{`$ time ruby async_port_scanner.rb | grep "open"
1024 open

real    0m2.345s
user    0m0.531s
sys     0m0.130s`}
		</Code>

		<p class="mt-4">
			That's roughly 2–3 seconds to scan all those ports (<code>1024</code> of them) on a single
			thread! What if we wanted to scan all the ports (<code>1…65535</code>), how long would that
			take?
		</p>

		<Code language="bash">
			{`real    1m12.693s
user    1m5.933s
sys     0m5.157s`}
		</Code>

		<p class="mt-4">
			So, if I can do the calculation right: <code>65535 ports/(1min + 12secs = 72secs)</code> would
			be roughly <code>~910</code> ports a second. That's pretty fast! 🚀
		</p>

		<h2 class="text-2xl font-bold mt-8 mb-4">📃 Source Code</h2>

		<p class="mt-4">
			Below is the full source code for the scanner (copy+paste friendly for testing):
		</p>

		<div class="bg-green-50 border-l-4 border-green-400 p-4 my-6">
			<p class="text-sm text-green-700">
				🤘<strong>40 lines of asynchronous port scanning awesomeness!</strong>
			</p>
		</div>

		<Code language="ruby">
			{`require "async/await"
require "async/io"
require "async/semaphore"

class PortScanner
  include Async::Await
  include Async::IO
  
  def initialize(host: "127.0.0.1", ports: (1..1024))
    @host      = host
    @ports     = ports
    @semaphore = Async::Semaphore.new(\`ulimit -n\`.to_i)
  end
  
  def scan_port(port, timeout: 0.5)
    timeout(timeout) do
      Async::IO::Endpoint.tcp(@host, port).connect do |peer|
        peer.close
        puts "#{port} open"
      end
    end
  rescue Errno::ECONNREFUSED, Async::TimeoutError
    puts "#{port} closed"
  rescue Errno::EMFILE
    sleep timeout
    retry
  end
  
  async def start(timeout: 0.5)
    @ports.map do |port|
      @semaphore.async do
        scan_port(port, timeout: timeout)
      end
    end.collect(&:result)
  end
end

PortScanner.new(host: "127.0.0.1", ports: (1..1024)).start`}
		</Code>

		<h2 class="text-2xl font-bold mt-8 mb-4">👋 Conclusion</h2>

		<p class="mt-4">
			Building a high performance, asynchronous port scanner with Ruby is actually pretty awesome,
			and very possible! By embracing single threaded performance backed by <Link
				url="https://ruby-doc.org/core-2.5.0/Fiber.html">Fibers</Link
			> provides really interesting opportunities, and great performance for I/O-bound operations (like
			a port scanner) that should only get better over time.
		</p>

		<p class="mt-4">
			If you like what you see, be sure to give the <Link url="https://github.com/socketry"
				>Async/Socketry gem(s)</Link
			> a star 🌟on <Link url="https://github.com/socketry">GitHub</Link> — or, make a pull request to
			make them better! If you see where I did something wrong, want to improve the implementation, or
			have any questions, feel to chat on <Link url="https://gitter.im/socketry/async">Gitter</Link
			>!
		</p>

		<p class="mt-4">Until next time, that's all folks!</p>
	</div>
</BlogPost>
