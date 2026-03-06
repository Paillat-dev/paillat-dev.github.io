<script lang="ts">
  import { Moon, Sun } from "@lucide/svelte";
  import { Button } from "$lib/components/ui/button";

  function toggleTheme() {
    const el = document.documentElement;
    const isDark =
      el.classList.contains("dark") ||
      (!el.classList.contains("light") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    const next = isDark ? "light" : "dark";
    el.classList.remove("dark", "light");
    el.classList.add(next);
    localStorage.setItem("theme", next);
  }
</script>

<Button onclick={toggleTheme} variant="outline" size="icon" class="dark-mode-button">
  <Sun />
</Button>
<Button onclick={toggleTheme} variant="outline" size="icon" class="light-mode-button">
  <Moon />
</Button>

<style>
  :global(.dark-mode-button) {
    display: none;
  }

  :global(html.dark .light-mode-button) {
    display: none;
  }

  :global(html.dark .dark-mode-button) {
    display: inline-flex;
  }
</style>
