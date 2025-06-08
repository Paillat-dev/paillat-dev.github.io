<script lang="ts">
	import { ArrowLeft, ArrowRight } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { untrack, type Component } from 'svelte';
	import { gsap } from 'gsap';

	interface Props {
		items: Array<any>;
		Element: Component;
	}

	const { items, Element }: Props = $props();

	let idx = $state(0);
	let itemsKey = $state(0); // This will help force re-initialization

	let cardContainerRef: HTMLDivElement | undefined = $state(undefined);
	// Initialize cardRefs based on initial items.length
	let cardRefs: Array<HTMLDivElement | undefined> = $state(new Array(items.length).fill(undefined));

	// Effect to keep cardRefs array in sync with items array length
	$effect(() => {
		// If items.length changes, resize cardRefs and force re-initialization
		if (items.length !== untrack(() => cardRefs.length)) {
			cardRefs = new Array(items.length).fill(undefined);
			itemsKey += 1; // Force re-initialization
			// Reset idx to 0 for simplicity when items change
			idx = 0;
		}
	});

	// Main animation and idx management effect
	$effect(() => {
		// Clamp idx when items array changes to ensure it's valid
		if (items.length === 0) {
			if (idx !== 0) idx = 0;
		} else if (idx >= items.length) {
			idx = 0; // Reset to first item when filtering reduces the array
		} else if (idx < 0 && items.length > 0) {
			idx = 0;
		}

		// Early exit if container ref is not yet available
		if (!cardContainerRef) return;

		// Clean up existing GSAP tweens
		const childrenToKill = Array.from(cardContainerRef.children);
		if (childrenToKill.length > 0) {
			gsap.killTweensOf(childrenToKill);
		}

		// Handle empty items case
		if (items.length === 0) {
			childrenToKill.forEach(child => gsap.set(child, { opacity: 0 }));
			return;
		}

		// Get current card DOM elements from cardRefs
		const currentCards = cardRefs.filter(Boolean) as HTMLDivElement[];

		// Wait until cardRefs are fully populated
		if (currentCards.length !== items.length) {
			return;
		}

		// Apply animations to the current set of cards
		currentCards.forEach((card, i) => {
			const isCurrent = i === idx;
			const xPercentTarget = (i - idx) * 100;
			const scaleTarget = isCurrent ? 1 : 0.8;
			const opacityTarget = isCurrent ? 1 : 0.6;
			const zIndexTarget = isCurrent ? items.length : items.length - Math.abs(i - idx) - 1;

			gsap.to(card, {
				xPercent: xPercentTarget,
				scale: scaleTarget,
				opacity: opacityTarget,
				zIndex: zIndexTarget,
				duration: 0.6,
				ease: 'power2.out',
				overwrite: 'auto'
			});
		});
	});

	function prev() {
		if (!items.length) return;
		idx = (idx - 1 + items.length) % items.length;
	}

	function next() {
		if (!items.length) return;
		idx = (idx + 1) % items.length;
	}

</script>

<div class="relative flex w-full items-center justify-center overflow-hidden py-4">
	<Button size="icon" onclick={prev} class="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30">
		<ArrowLeft />
	</Button>

	{#if items.length}
		<div bind:this={cardContainerRef} class="relative flex h-[400px] w-[70%] md:w-[60%] items-center justify-center perspective">
			{#each items as item, i (`${itemsKey}-${item.id || item.title || i}`)} 
				<div
					bind:this={cardRefs[i]} 
					class="absolute w-full h-full card-item"
					style="will-change: transform, opacity;"
				>
					<Element {...item} />
				</div>
			{/each}
		</div>
	{:else}
		<div class="flex h-32 w-full items-center justify-center">
			<p class="text-muted-foreground">No items available</p>
		</div>
	{/if}

	<Button size="icon" onclick={next} class="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30">
		<ArrowRight />
	</Button>
</div>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'ArrowLeft') prev();
		if (e.key === 'ArrowRight') next();
	}}
/>

<style>
	.perspective {
		perspective: 1000px; /* Adds a bit of 3D perspective if you use rotations */
	}
	.card-item {
		display: flex;
		align-items: center;
		justify-content: center;
		/* transform-style: preserve-3d; */ /* Uncomment if children have 3D transforms */
		backface-visibility: hidden; /* Can help with flickering during 3D transforms */
	}
</style>
