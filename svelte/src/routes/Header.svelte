<script>
	import { page } from '$app/stores';
</script>

<header>
	<nav>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
		</ul>
	</nav>
</header>

<style>
	nav {
		display: flex;
		justify-content: center;
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
			color: var(--color-text);
			&:hover {
				color: var(--color-theme-2);
			}
		}
	}

	li[aria-current='page'] a {
		color: var(--color-theme-1);
	}
</style>
