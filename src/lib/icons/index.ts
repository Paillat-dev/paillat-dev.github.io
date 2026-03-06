import { Book, Pen } from "@lucide/svelte";

export const icons = { book: Book, pen: Pen };
export type IconName = keyof typeof icons;
