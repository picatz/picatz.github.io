<script>
	import Hero from './Hero.svelte'
	import AboutMe from './AboutMe.svelte'
	import OpenSourceProjects from './OpenSourceProjects.svelte'
	import Footer from './Footer.svelte'
	import Notification from './Notification.svelte'
	import { onMount } from 'svelte'

	let showblog = false;
	let blogPost;
	let blogId;

	let blogPosts = {
		"example": () => import('./blog/example.svelte'),
		"howitsmade": () => import('./blog/howitsmade.svelte'),
		"gossa": () => import('./blog/gossa.svelte'),
	}

	async function hashchange() {
		const path = window.location.hash.slice(1);

		if (path.includes('blog')) {
			showblog = true;

			blogId = path.replace('blog/', '');

			if (blogPosts[blogId]) {
				blogPost = (await blogPosts[blogId]()).default;
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
		<Notification content='<i class="fas fa-book fa-1x is-grey has-text-white" style="margin-right: 0.5rem;"></i> Check out my first <a href="/#blog/howitsmade"><strong>blog post</strong></a>!'/>
		<Hero />
		<AboutMe />
		<OpenSourceProjects />
		<Footer />
	{/if}
</main>