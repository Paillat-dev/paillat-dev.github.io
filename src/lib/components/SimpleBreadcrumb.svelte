<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import { cn } from "$lib/utils.ts";

  type Page =
    | {
        label: string;
        href: string;
        disabled?: boolean;
      }
    | {
        label: string;
        disabled: true;
      };

  interface Props {
    pages: Page[];
    class?: string;
  }

  const { pages, class: className = "" }: Props = $props();
</script>

<Breadcrumb.Root class={cn("mb-4", className)}>
  <Breadcrumb.List>
    {#each pages.entries() as [i, page] (page.label)}
      <Breadcrumb.Item>
        {#if page.disabled}
          <Breadcrumb.Page>{page.label}</Breadcrumb.Page>
        {:else}
          <Breadcrumb.Link href={page.href}>{page.label}</Breadcrumb.Link>
        {/if}
      </Breadcrumb.Item>
      {#if i < pages.length - 1}
        <Breadcrumb.Separator />
      {/if}
    {/each}
  </Breadcrumb.List>
</Breadcrumb.Root>
