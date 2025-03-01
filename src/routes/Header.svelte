<script>
	import { page } from '$app/stores';

	let currentPage = $derived($page.url.pathname);

	let pages = [
		['/', 'Home'],
		['/blog', 'Blog posts'],
		['/portfolio', 'Hire me']
	];
</script>

<header>
	<nav>
		<ul>
			{#each pages as [path, name]}
				<li aria-current={currentPage === path ? 'page' : undefined}>
					<a href={path}>{name}</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	nav {
		display: flex;
		justify-content: center;
		position: fixed;
		left: 50%;
		transform: translate(-50%, 0);
	}

	ul {
		/* Background */
		padding: 1rem 3rem;
		border-bottom-right-radius: 1rem;
		border-bottom-left-radius: 1rem;
		margin-top: 0;
		background: var(--color-bg-highlight);

		/* Alignment */
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		list-style: none;
	}

	/* The default link color gets set globally */
	li {
		& a {
			color: var(--color-link);
			&:hover {
				color: var(--color-theme-1);
			}
		}
	}

	li[aria-current='page'] a {
		color: var(--color-theme-2);
	}

	/* Dividers */
	li:after {
		content: '';
		border-left: 2px solid var(--color-bg-base);
		margin-left: 1rem;
	}
	li:last-child:after {
		display: None;
	}
</style>
