<!-- ProjectFilter.svelte - Only handles filter UI -->
<script lang="ts">
  import { type CollectionEntry } from 'astro:content';
  import { Label } from '@lib/components/ui/label';
  import { Checkbox } from '@lib/components/ui/checkbox';
  import Badge from '@lib/components/ui/badge/badge.svelte';
  import {
    selectedTags,
    showArchived,
    toggleTag,
    toggleLanguage,
    togglePlatform,
    setShowArchived,
    initializeProjects,
    selectedPlatforms,
    selectedLanguages,
  } from '../stores/projectFilters';
  import { onMount } from 'svelte';

  interface Props {
    projects: CollectionEntry<'projects'>[];
  }

  const { projects }: Props = $props();

  let currentSelectedTags = $state(selectedTags.get());
  let currentSelectedPlatforms = $state(selectedPlatforms.get());
  let currentSelectedLanguages = $state(selectedLanguages.get());
  let currentShowArchived = $state(showArchived.get());

  onMount(() => {
    initializeProjects(projects);

    const unsubscribeSelectedTags = selectedTags.subscribe(
      (tags: readonly string[]) => {
        currentSelectedTags = [...tags];
      }
    );
    const unsubscribeSelectedPlatforms = selectedPlatforms.subscribe(
      (platforms: readonly string[]) => {
        currentSelectedPlatforms = [...platforms];
      }
    );
    const unsubscribeSelectedLanguages = selectedLanguages.subscribe(
      (languages: readonly string[]) => {
        currentSelectedLanguages = [...languages];
      }
    );
    const unsubscribeShowArchived = showArchived.subscribe(
      (archived: boolean) => {
        currentShowArchived = archived;
      }
    );

    return () => {
      unsubscribeSelectedTags();
      unsubscribeSelectedPlatforms();
      unsubscribeSelectedLanguages();
      unsubscribeShowArchived();
    };
  });

  const possibleTags = [
    ...new Set(projects.flatMap(project => project.data.tags)),
  ];

  const possibleLanguages = [
    ...new Set(projects.flatMap(project => project.data.languages)),
  ];

  const possiblePlatforms = [
    ...new Set(projects.flatMap(project => project.data.platforms)),
  ];

  const getTagsMap = () => [
    [null, possibleTags, toggleTag, () => currentSelectedTags],
    ['Languages', possibleLanguages, toggleLanguage, () => currentSelectedLanguages],
    ['Platforms', possiblePlatforms, togglePlatform, () => currentSelectedPlatforms],
  ];

  function handleArchivedChange(checked: boolean) {
    setShowArchived(checked);
  }
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-col gap-2">
    {#each getTagsMap() as [type, tags, callback, getCurrentSelected] (tags)}
      <div class="flex flex-row flex-wrap gap-2">
        {#if type}<Label class="font-semibold">{type}:</Label>{/if}
        {#each tags as tag (tag)}
          <Badge
            variant={getCurrentSelected().includes(tag) ? 'default' : 'outline'}
            onclick={() => callback(tag)}
            class="hover:cursor-pointer"
          >
            {tag}
          </Badge>
        {/each}
      </div>
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