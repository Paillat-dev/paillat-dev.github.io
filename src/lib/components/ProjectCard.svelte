<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	let { title = 'Project Title', description = '' } = $props();
</script>

<Card.Root
	class="group relative h-full overflow-hidden rounded-xl border transition-all hover:shadow-md"
>
	<Card.Content class="flex h-full flex-col p-6">
		<h3 class="mb-2 text-lg font-semibold">{title}</h3>
		<p class="text-muted-foreground text-sm">{description}</p>

		<div class="mt-4 opacity-0 transition-opacity group-hover:opacity-100">
			<a
				href={`/projects/${title.toLowerCase().replace(/\s+/g, '-')}`}
				class="text-primary text-sm font-medium hover:underline"
			>
				View details →
			</a>
		</div>
	</Card.Content>
</Card.Root>
