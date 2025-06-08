<script lang="ts">
	import { ArrowLeft, ArrowRight } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { untrack, type Component } from 'svelte';
	interface Props {
		items: Array<any>;
		Element: Component;
	}

	const { items, Element }: Props = $props();

	let idx = $state(0);

	$effect(() => {
		if (items[untrack(() => idx)] === undefined) {
			idx = 0;
		}
	});

	const prevIdx = $derived(items.length ? (idx - 1 + items.length) % items.length : 0);
	const nextIdx = $derived(items.length ? (idx + 1) % items.length : 0);

	function prev() {
		if (!items.length) return;
		idx = (idx - 1 + items.length) % items.length;
	}

	function next() {
		if (!items.length) return;
		idx = (idx + 1) % items.length;
	}
</script>

<div class="relative flex w-full items-center justify-between">
    <Button size="icon" onclick={prev}>
		<ArrowLeft />
	</Button>

	{#if items.length}
		<div class="relative flex flex-row w-full gap-4 z-0">
			<div
				class="pointer-events-none w-1/2 scale-75 opacity-40 blur-[2px] transition-transform duration-300 -z-10"
			>
				{#if prevIdx !== idx}
					<Element {...items[prevIdx]} />
				{/if}
			</div>

			<div class="absolute left-1/2 w-1/2 -translate-x-1/2 z-0">
				<Element {...items[idx]} />
			</div>

			<div
				class="pointer-events-none w-1/2 scale-75 opacity-40 blur-[2px] transition-transform duration-300 -z-10"
			>
				{#if nextIdx !== idx}
					<Element {...items[nextIdx]} />
				{/if}
			</div>
		</div>
	{:else}
		<div class="flex h-32 w-full items-center justify-center">
			<p class="text-muted-foreground">No items available</p>
		</div>
	{/if}

	<Button size="icon" onclick={prev} class="hover:pointer-events-auto">
		<ArrowRight />
	</Button>
</div>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'ArrowLeft') prev();
		if (e.key === 'ArrowRight') next();
	}}
/>
