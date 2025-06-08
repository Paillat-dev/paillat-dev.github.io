<script lang="ts">
	import * as Button from '$lib/components/ui/button';
</script>

<footer class="mt-16 flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
	<div class="text-muted-foreground text-sm">(c) Paillat-dev 2025</div>

	<div class="flex gap-6">
		<Button.Root
			variant="link"
			class="text-muted-foreground hover:text-primary p-0 transition-colors">Contact</Button.Root
		>
		<Button.Root
			variant="link"
			class="text-muted-foreground hover:text-primary p-0 transition-colors"
			>View this as CV</Button.Root
		>
	</div>
</footer>
