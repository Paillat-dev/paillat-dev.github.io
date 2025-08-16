import { atom, computed } from 'nanostores';
import type { CollectionEntry } from 'astro:content';

export const selectedTags = atom<string[]>([]);
export const showArchived = atom<boolean>(false);
export const allProjects = atom<CollectionEntry<'projects'>[]>([]);

export const filteredProjects = computed(
  [selectedTags, showArchived, allProjects],
  (tags, archived, projects) => {
    return projects.filter(project => {
      if (!archived && project.data.archived) return false;

      if (
        tags.length > 0 &&
        !project.data.tags.some(tag => tags.includes(tag))
      ) {
        return false;
      }

      return true;
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

export function setShowArchived(show: boolean) {
  showArchived.set(show);
}

export function initializeProjects(projects: CollectionEntry<'projects'>[]) {
  allProjects.set(projects);
}
