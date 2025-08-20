import { atom, computed } from 'nanostores';
import type { CollectionEntry } from 'astro:content';

export const selectedTags = atom<string[]>([]);
export const selectedLanguages = atom<string[]>([]);
export const selectedPlatforms = atom<string[]>([]);
export const showArchived = atom<boolean>(false);
export const allProjects = atom<CollectionEntry<'projects'>[]>([]);

export const filteredProjects = computed(
  [
    selectedTags,
    selectedLanguages,
    selectedPlatforms,
    showArchived,
    allProjects,
  ],
  (
    tags: string[],
    languages: string[],
    platforms: string[],
    archived: boolean,
    projects: CollectionEntry<'projects'>[]
  ) => {
    return projects.filter(project => {
      // OR conditions to NOT show the tag:
      // 1. If the project is archived and without the 'Archived' tag
      // 2. If the project doesn't have any of the selected tags AND some tags are selected
      // 3. If the project doesn't have any of the selected languages AND some languages are selected
      // 4. If the project doesn't have any of the selected platforms AND some platforms are selected
      return !(
        (!archived && project.data.archived) ||
        (!project.data.tags.some(tag => tags.includes(tag)) &&
          tags.length > 0) ||
        (!project.data.languages.some(lang => languages.includes(lang)) &&
          languages.length > 0) ||
        (!project.data.platforms.some(platform =>
          platforms.includes(platform)
        ) &&
          platforms.length > 0)
      );
    });
  }
);

export function toggleTag(tag: string) {
  const current = selectedTags.get();
  if (current.includes(tag)) {
    selectedTags.set(current.filter(t => t !== tag));
  } else {
    selectedTags.set([...current, tag]);
  }
}

export function toggleLanguage(language: string) {
  const current = selectedLanguages.get();
  if (current.includes(language)) {
    selectedLanguages.set(current.filter(lang => lang !== language));
  } else {
    selectedLanguages.set([...current, language]);
  }
}

export function togglePlatform(platform: string) {
  const current = selectedPlatforms.get();
  if (current.includes(platform)) {
    selectedPlatforms.set(current.filter(p => p !== platform));
  } else {
    selectedPlatforms.set([...current, platform]);
  }
}

export function setShowArchived(show: boolean) {
  showArchived.set(show);
}

export function initializeProjects(projects: CollectionEntry<'projects'>[]) {
  allProjects.set(projects);
}
