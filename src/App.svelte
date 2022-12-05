<script>
	import Hero from './Hero.svelte'
	import AboutMe from './AboutMe.svelte'
	import OpenSourceProjects from './OpenSourceProjects.svelte'
	import BlogPosts from './BlogPosts.svelte'
	import Footer from './Footer.svelte'
	import Notification from './Notification.svelte'
	import { onMount } from 'svelte'

	let showblog = false;
	let blogPost;
	let blogId;

	let blogPosts = {
		howitsmade: {
			title: "How it's made",
			date: "2022-12-04",
			import: () => import('./blog/howitsmade.svelte')	
		},
		gossa: {
			title: "Go SSA",
			date: "2022-12-05",
			import: () => import('./blog/gossa.svelte')	
		},
	}

	async function hashchange() {
		const path = window.location.hash.slice(1);

		if (path.includes('blog')) {
			showblog = true;

			blogId = path.replace('blog/', '');

			if (blogPosts[blogId]) {
				blogPost = (await blogPosts[blogId].import()).default;
				// show warning if blog post is not found
			} else {
				blogPost = (await import('./blog/404.svelte')).default;
			}

			window.scrollTo(0, 0);
		} else {
			window.location.hash = '/';
			showblog = false;
		}
	}

	onMount(() => {
		window.addEventListener('hashchange', hashchange);
		hashchange();
	});

	onMount(hashchange);
</script>

<main>
	{#if showblog}
		<svelte:component this={blogPost}/>
	{:else}
		<Notification content='<i class="fas fa-book fa-1x is-grey has-text-white" style="margin-right: 0.5rem;"></i> Check out my first <a href="/#blog/howitsmade"><strong>blog post</strong></a> on GitHub!'/>
		<Hero />
		<AboutMe />
		<BlogPosts posts={blogPosts}/>
		<OpenSourceProjects />
		<Footer />
	{/if}
</main>