<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	let { title = 'Work Title', description = '', techs = [], type = '' } = $props();
</script>

<Card.Root
	class="group relative h-full overflow-hidden rounded-xl border transition-all hover:shadow-md"
>
	<Card.Content class="flex h-full flex-col p-6">
		<div class="mb-2">
			<span
				class="bg-primary/10 text-primary mb-2 inline-block rounded-md px-2 py-1 text-xs font-medium"
				>{type}</span
			>
			<h3 class="mb-2 text-xl font-semibold">{title}</h3>
			<p class="text-muted-foreground mb-4 text-sm">{description}</p>
		</div>

		{#if techs.length > 0}
			<div class="mt-auto">
				<div class="text-muted-foreground mb-1.5 text-xs font-medium uppercase">Technologies</div>
				<div class="flex flex-wrap gap-1.5">
					{#each techs as tech}
						<span class="bg-muted inline-flex items-center rounded-md px-2 py-1 text-xs"
							>{tech}</span
						>
					{/each}
				</div>
			</div>
		{/if}
	</Card.Content>
</Card.Root>
