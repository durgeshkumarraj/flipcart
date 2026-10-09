<script>
	import '../app.css';

	import { page } from '$app/state';
	import favicon from '#lib/assets/favicon.svg';
	import Navbar from '#lib/components/navbar/navvar.svelte';

	/** @type {{children: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if page.url.pathname !== '/login' && page.url.pathname !== '/signup'}
	<Navbar />
{/if}
<main>
	{@render children()}
</main>
