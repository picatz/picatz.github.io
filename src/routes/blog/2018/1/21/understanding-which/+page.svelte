<script lang="ts">
	import metadata from './metadata.json';
	import BlogHeader from '$lib/BlogHeader.svelte';
	import BlogPost from '$lib/BlogPost.svelte';
	import Code from '$lib/Code.svelte';
	import Link from '$lib/Link.svelte';
	import Panel from '$lib/Panel.svelte';
</script>

<BlogPost>
	<BlogHeader title={metadata.title} date="1-21-2018">
		To lookup the full path of a shell command, you'll probably use <code>which</code>. But, how
		does it actually work?
	</BlogHeader>

	<div class="mt-6">
		<p class="mt-4">
			To find that out I decided to build my own, analyze, and just look at the history of this
			interesting little command-line application that I've used for years, but never really
			understood what it did.
		</p>

		<p class="mt-4">
			Consulting the <code>man</code> pages is probably a good first step for anyone looking to get
			a little bit more information about a particular command. So, that's what I did; and I
			stumbled across this interesting bit of trivia — at least hidden within the macOS version of
			<code>which</code>:
		</p>

		<Panel
			icon="fa-info-circle"
			color="bg-gray-50"
			iconColor="text-gray-600"
			ring="ring-1"
			ringColor="ring-gray-300"
		>
			<strong>HISTORY</strong><br />
			The which command first appeared in FreeBSD 2.1.<br /><br />
			<strong>AUTHORS</strong><br />
			The which utility was originally written in Perl and was contributed by Wolfram Schneider &lt;wosch@FreeBSD.org&gt;.
			The current version of which was rewritten in C by Daniel Papasian &lt;dpapasia@andrew.cmu.edu&gt;.
		</Panel>

		<p class="mt-6">
			The version of <code>which</code> on macOS also only supports two command-line flags:
			<code>-a</code> (for all found paths, not just the first) and <code>-s</code> (for no output).
		</p>

		<p class="mt-4">
			If we were to look, for example, a CentOS 7 box, we'd see something quite different: flags
			like
			<code>--skip-dot</code>, <code>--show-dot</code>, <code>--read-alias</code> and plenty more
			that would be tedious to go over I assure you, but are very cool nonetheless! If you're on
			Ubuntu you'll see that <code>which</code> only supports <code>-a</code> out of the box.
		</p>

		<p class="mt-4">
			From what I've been able to tell, <code>-a</code> is the only flag supported by most unix like
			operating systems for <code>which</code> that you can even rely on.
		</p>

		<p class="mt-4">
			I had no idea <code>which</code> supported so many different command-line flags depending on the
			operating system you're working on. There's even a windows port or two out there that exist.
		</p>

		<p class="mt-4">
			But, I still haven't answered: how does it work? Well, the macOS <code>man</code> page actually
			spells it out pretty clearly:
		</p>

		<Panel
			icon="fa-terminal"
			color="bg-blue-50"
			iconColor="text-blue-600"
			ring="ring-1"
			ringColor="ring-blue-200"
		>
			<code>which -- locate a program file in the user's path</code>
		</Panel>

		<p class="mt-6">
			To clarify further: What they mean by the "user's path" is the <code>$PATH</code> environment variable
			of the shell.
		</p>

		<h2 class="text-2xl font-bold mt-8 mb-4">🐱 Searching for cats in your $PATH</h2>

		<p class="mt-4">You see, when working in the context of a shell and you type in:</p>

		<Code language="bash" code={`$ cat cool.txt`} />

		<p class="mt-4">
			If felt so inclined, we could call the <code>cat</code> program directly using its full path, wherever
			it is on your system:
		</p>

		<Code language="bash" code={`$ /bin/cat cool.txt`} />

		<p class="mt-4">
			Our system can find the full path to <code>cat</code> to call without us having to know the
			full path to the <code>cat</code> file. This is a feature that is widely used and easily overlooked,
			at least in terms of its implementation details.
		</p>

		<p class="mt-4">
			Unix-like shells have a <code>$PATH</code> environment variable (amongst many other
			environment variables, which can even be manipulated by the user): and when we try to run
			something, our shell can go looking for it in all of the directories available in
			<code>$PATH</code> — that can be any number of directories depending on your system and what you've
			installed.
		</p>

		<p class="mt-4">
			On a Ubuntu vagrant box that I spun up, the default <code>$PATH</code> variable was this:
		</p>

		<Code
			language="bash"
			code={`/home/ubuntu/bin:/home/ubuntu/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin`}
		/>

		<p class="mt-4">
			To make that a bit cleaner, we could split up the available directories by the ":" character
			in whatever programming of choice you'd like, I'll use <code>awk</code>:
		</p>

		<Code
			language="bash"
			code={`$ echo $PATH | awk 'BEGIN{RS=":"}{$1=$1}1'
/home/ubuntu/bin
/home/ubuntu/.local/bin
/usr/local/sbin
/usr/local/bin
/usr/sbin
/usr/bin
/sbin
/bin
/usr/games
/usr/local/games
/snap/bin`}
		/>

		<p class="mt-4">
			All of those paths could have files stored in them that the shell could use. Moreover, order
			matters in many cases (even with the <code>which</code> command)! So, fun-fact: this can be a really
			nasty thing to mess with.
		</p>

		<h2 class="text-2xl font-bold mt-8 mb-4">🍺 Brewing up our own which(1)</h2>

		<p class="mt-4">
			With all the inconsistencies of <code>which</code> that I discovered, I figured I could make my
			own! If all these other people made their own, with their weird flavor added to it — I could do
			the exact same thing and make it weirder!
		</p>

		<p class="mt-4">
			I'll make one that, basically, always runs the <code>-a</code> flag to show all available paths.
		</p>

		<p class="mt-4">
			We could arbitrarily pick any language for this task really. Ruby, Python, Crystal, JavaScript
			— but I ended up implementing this in <Link url="https://golang.org/">Go</Link>!
		</p>

		<p class="mt-4">
			With Go, I can easily build many cross-platform tools that can compile to a neat little binary
			for whatever system you'd like: mac, linux, windows — easy!
		</p>

		<p class="mt-4">
			The first thing we can do is write a simple function that'll give us a slice of strings much
			like we did earlier with <code>echo</code> and a bit of <code>awk</code>:
		</p>

		<Code
			language="go"
			code={`func GetPathSlice() []string {
    return strings.Split(os.Getenv("PATH"), ":")
}`}
		/>

		<Panel
			icon="fa-info-circle"
			color="bg-blue-50"
			iconColor="text-blue-500"
			ring="ring-1"
			ringColor="ring-blue-200"
		>
			You would need to import the <code>os</code> and <code>strings</code> packages.
		</Panel>

		<p class="mt-6">
			We'll also need to be able to check if the program we're looking for exists in the path at
			some point:
		</p>

		<Code
			language="go"
			code={`func IsFile(path string) bool {
    if stat, err := os.Stat(path); err == nil && !stat.IsDir() {
        return true
    }
    return false
}`}
		/>

		<Panel
			icon="fa-info-circle"
			color="bg-blue-50"
			iconColor="text-blue-500"
			ring="ring-1"
			ringColor="ring-blue-200"
		>
			I've chosen to use the <code>Stat</code> function within the <code>os</code> package to check if
			the given path is a file.
		</Panel>

		<p class="mt-6">
			Then we're going to want loop over the possibilities and then we'll go ahead and consume the
			results through a channel (which I'll call "messages"):
		</p>

		<Code
			language="go"
			code={`func FindInPath(args []string) {
    messages := make(chan string)
    
    for _, arg := range args {
        go func(program string) {
            for _, path := range GetPathSlice() {
                fullPath := filepath.Join(path, program)
                if IsFile(fullPath) {
                    messages <- fullPath
                }
            }
            messages <- ""
        }(arg)
    }
    
    for range args {
        for {
            message := <-messages
            if message == "" {
                break
            }
            fmt.Println(message)
        }
    }
}`}
		/>

		<Panel
			icon="fa-info-circle"
			color="bg-blue-50"
			iconColor="text-blue-500"
			ring="ring-1"
			ringColor="ring-blue-200"
		>
			The <code>messages</code> channel is sort of like a stream or mailbox for messages to go into and
			be taken out of.
		</Panel>

		<p class="mt-6">
			Now, within our <code>main()</code> function, we just need to grab the content from the
			command-line, check it; and then pass the arguments as a slice to our
			<code>FindInPath()</code> function.
		</p>

		<Code
			language="go"
			code={`func main() {
    if len(os.Args) < 2 {
        fmt.Println("Usage: which <program> [program2] [program3] ...")
        os.Exit(1)
    }
    
    FindInPath(os.Args[1:])
}`}
		/>

		<p class="mt-6">All together, we have our full program!</p>

		<Code
			title="Complete which(1) implementation in Go"
			language="go"
			code={`package main

import (
    "fmt"
    "os"
    "path/filepath"
    "strings"
)

func GetPathSlice() []string {
    return strings.Split(os.Getenv("PATH"), ":")
}

func IsFile(path string) bool {
    if stat, err := os.Stat(path); err == nil && !stat.IsDir() {
        return true
    }
    return false
}

func FindInPath(args []string) {
    messages := make(chan string)
    
    for _, arg := range args {
        go func(program string) {
            for _, path := range GetPathSlice() {
                fullPath := filepath.Join(path, program)
                if IsFile(fullPath) {
                    messages <- fullPath
                }
            }
            messages <- ""
        }(arg)
    }
    
    for range args {
        for {
            message := <-messages
            if message == "" {
                break
            }
            fmt.Println(message)
        }
    }
}

func main() {
    if len(os.Args) < 2 {
        fmt.Println("Usage: which <program> [program2] [program3] ...")
        os.Exit(1)
    }
    
    FindInPath(os.Args[1:])
}`}
		/>

		<p class="mt-6">Not too shabby!</p>

		<p class="mt-4">
			In just over 50 lines of code, we've implemented a working example of the <code>which</code>
			command-line utility (that always runs the <code>-a</code> option)!
		</p>

		<div class="bg-green-50 border-l-4 border-green-400 p-4 my-6">
			<p class="text-sm text-green-700">
				💡 <strong
					>Just imagine, with a bit more code — we could even implement the other flags!</strong
				>
			</p>
		</div>

		<p class="mt-4">
			Moving forward when I find the time, I think I'd like to implement the rest of the flags and
			make it fully compatible with the actual <code>which</code> command-line utility; and hopefully
			support windows? That'd be really neat.
		</p>

		<h2 class="text-2xl font-bold mt-8 mb-4">👋 Conclusion</h2>

		<p class="mt-4">
			So, I think that's where I'm going to end this post — hope you learned something!
		</p>

		<p class="mt-4">
			Understanding how fundamental command-line utilities work under the hood can be both
			educational and fun. The <code>which</code> command is a perfect example of how a simple
			concept (searching through directories in <code>$PATH</code>) can be implemented in various
			ways across different systems.
		</p>

		<p class="mt-4">
			Building your own version not only helps you understand the internals better, but also gives
			you the freedom to add your own features and improvements. Plus, Go makes it incredibly easy
			to create cross-platform binaries that work everywhere!
		</p>
	</div>
</BlogPost>
