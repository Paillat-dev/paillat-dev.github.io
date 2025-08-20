const badgesMap: Record<string, Record<string, string>> = {
  Archived: { class: 'border-yellow-300', variant: 'outline' },
  Python: { class: 'border-green-500', variant: 'outline' },
  default: { variant: 'outline' },
  Scala: { class: 'border-red-500', variant: 'outline' },
  TypeScript: { class: 'border-blue-500', variant: 'outline' },
  JavaScript: { class: 'border-yellow-500', variant: 'outline' },
  Svelte: { class: 'border-orange-500', variant: 'outline' },
  Discord: { class: 'border-[#5865F2]', variant: 'outline' },
};

export { badgesMap };
