<script lang="ts">
  import { Button } from '@lib/components/ui/button';
  import { X } from '@lucide/svelte';
  import { navigate } from 'astro:transitions/client';
  import { onMount } from 'svelte';

  //function goBack() {
  //  navigate('/');
  //}

  onMount(() => {
    console.log('BackButton mounted');
    console.log('Current URL:', window.location.href);
    console.log('Referrer:', document.referrer);
    console.log('History state:', history.state);
    console.log('History length:', history.length);
  });
</script>

<Button
  variant="ghost"
  class="absolute top-8 right-8 rounded-full"
  href="/"
>
  <X />
</Button>
