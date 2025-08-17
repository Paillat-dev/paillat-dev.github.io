<!-- ProjectFilter.svelte - Only handles filter UI -->
<script lang="ts">
  import { type CollectionEntry } from 'astro:content';
  import { Select } from '@lib/components/ui/select';
  import { Label } from '@lib/components/ui/label';
  import { Checkbox } from '@lib/components/ui/checkbox';
  import Badge from '@lib/components/ui/badge/badge.svelte';
  import {
    selectedTags,
    showArchived,
    toggleTag,
    setShowArchived,
    initializeProjects,
  } from '../stores/projectFilters';

  interface Props {
    projects: CollectionEntry<'projects'>[];
  }

  const { projects }: Props = $props();

  $effect(() => {
    initializeProjects(projects);
  });

  let currentSelectedTags = $state(selectedTags.get());
  let currentShowArchived = $state(showArchived.get());

  $effect(() => {
    const unsubscribe1 = selectedTags.subscribe((tags: readonly string[]) => {
      currentSelectedTags = [...tags];
    });
    const unsubscribe2 = showArchived.subscribe((archived: boolean) => {
      currentShowArchived = archived;
    });

    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  });

  const possibleTags = [
    ...new Set(projects.flatMap(project => project.data.tags)),
  ];

  function handleTagClick(tag: string) {
    console.log('Tag clicked:', tag);
    toggleTag(tag);
  }

  function handleArchivedChange(checked: boolean) {
    setShowArchived(checked);
  }
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-row flex-wrap gap-2">
    {#each possibleTags as tag}
      <Badge
        variant={currentSelectedTags.includes(tag) ? 'default' : 'outline'}
        onclick={() => handleTagClick(tag)}
        class="hover:cursor-pointer"
      >
        {tag}
      </Badge>
    {/each}
  </div>

  <Label class="flex w-fit items-center gap-2">
    <Checkbox
      checked={currentShowArchived}
      onCheckedChange={handleArchivedChange}
      class="hover:cursor-pointer"
    />
    Show Archived
  </Label>
</div>
