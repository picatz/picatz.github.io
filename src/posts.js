// This file contains the list of blog posts and their metadata.

let blogPosts = {
	howitsmade: {
		title: "How it's made",
		date: "2022-12-04",
        excerpt: "How I built my blog with Svelte and Vite.",
		import: () => import('./blog/howitsmade.svelte')	
	},
	gossa: {
		title: "Go SSA",
		date: "2022-12-05",
        excerpt: "Introduction to analyzing Go programs with SSA.",
		import: () => import('./blog/gossa.svelte')	
	},
	rssvite: {
		title: "Building an RSS Feed with Vite",
		date: "2022-12-06",
        excerpt: "Using a custom RSS plugin.",
		import: () => import('./blog/rssvite.svelte')	
	},
	readmore: {
		title: "Read More",
		date: "2022-12-08",
        excerpt: "Keeping readers engaged.",
		import: () => import('./blog/readmore.svelte')
	},
	cbor: {
		title: "CBOR",
		date: "2022-12-30",
		excerpt: "Introduction to Concise Binary Object Representation.",
		import: () => import('./blog/cbor.svelte')
	},
	taint: {
		title: "Static Taint Analysis for Go",
		date: "2023-1-2",
		excerpt: "How to find vulnerabilities with taint analysis.",
		import: () => import('./blog/taint.svelte')
	},
}

export default blogPosts;