<script lang="ts">
  import { Button } from '@lib/components/ui/button';
  import { X } from '@lucide/svelte';
  async function goBack() {
    await history.back();
  }
</script>

<Button
  variant="ghost"
  class="absolute top-4 right-4 rounded-full"
  onclick={goBack}
>
  <X class="m-0 p-0" />
</Button>
 