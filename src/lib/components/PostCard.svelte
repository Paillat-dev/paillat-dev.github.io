<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { formatDate } from '$lib/utils';

	let { title = 'Post Title', description = '', date = new Date().toISOString() } = $props();
</script>

<Card.Root
	class="group relative h-full overflow-hidden rounded-xl border transition-all hover:shadow-md"
>
	<Card.Content class="flex h-full flex-col p-6">
		<div class="text-muted-foreground mb-2 text-xs">{formatDate(date)}</div>
		<h3 class="mb-2 text-lg font-semibold">{title}</h3>
		<p class="text-muted-foreground text-sm">{description}</p>

		<div class="mt-4 opacity-0 transition-opacity group-hover:opacity-100">
			<a
				href={`/blog/${title.toLowerCase().replace(/\s+/g, '-')}`}
				class="text-primary text-sm font-medium hover:underline"
			>
				Read more →
			</a>
		</div>
	</Card.Content>
</Card.Root>
