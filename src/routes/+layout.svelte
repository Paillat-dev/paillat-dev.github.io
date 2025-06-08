<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let { children } = $props();
	let theme = $state('light');

	$effect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}

		if (browser && typeof window !== 'undefined') {
			localStorage.setItem('theme', theme);
		}
	});

	onMount(() => {
		if (browser && typeof window !== 'undefined') {
			const storedTheme = localStorage.getItem('theme');
			if (storedTheme) {
				theme = storedTheme;
			} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				theme = 'dark';
			}
		}
	});

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
	}
</script>

<div class="bg-background text-foreground flex min-h-screen flex-col">
	<div class="absolute top-4 right-4">
		<button
			class="bg-muted/30 hover:bg-muted rounded-full p-2 transition-colors"
			onclick={toggleTheme}
			aria-label="Toggle theme"
		>
			{#if theme === 'light'}
				<!-- Moon icon -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg
				>
			{:else}
				<!-- Sun icon -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-sun"
					><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path
						d="m4.93 4.93 1.41 1.41"
					/><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path
						d="m6.34 17.66-1.41 1.41"
					/><path d="m19.07 4.93-1.41 1.41" /></svg
				>
			{/if}
		</button>
	</div>
	{@render children()}
</div>
