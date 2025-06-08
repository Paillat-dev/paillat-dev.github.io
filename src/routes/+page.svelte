<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import PostCard from '$lib/components/PostCard.svelte';
	import WorkCard from '$lib/components/WorkCard.svelte';
	import * as Separator from '$lib/components/ui/separator';
	import * as Select from '$lib/components/ui/select';
	import { onMount } from 'svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	const works = [
		{
			title: 'AI Assistant Framework',
			description: 'A framework for building conversational AI assistants',
			techs: ['TypeScript', 'Node.js', 'React'],
			type: 'Web App'
		},
		{
			title: 'Portfolio Website',
			description: 'Personal portfolio built with SvelteKit',
			techs: ['Svelte', 'TailwindCSS', 'TypeScript'],
			type: 'Web App'
		},
		{
			title: 'E-commerce Platform',
			description: 'Full-stack e-commerce solution with payment integration',
			techs: ['React', 'Node.js', 'MongoDB'],
			type: 'E-commerce'
		},
		{
			title: 'Content Management System',
			description: 'Custom CMS for digital publishers',
			techs: ['Angular', 'Express', 'PostgreSQL'],
			type: 'Web App'
		},
		{
			title: 'E-learning Platform',
			description: 'Interactive learning experience',
			techs: ['Svelte', 'Node.js', 'MongoDB'],
			type: 'Web App'
		},
		{
			title: 'AI-powered Dashboard',
			description: 'Data visualization with AI insights',
			techs: ['Vue', 'Python', 'TensorFlow'],
			type: 'Dashboard'
		}
	];

	const posts = [
		{
			title: 'Building with SvelteKit',
			description: 'How to build modern websites with SvelteKit',
			date: '2025-04-15'
		},
		{
			title: 'The Power of Svelte 5 Runes',
			description: 'Exploring the new reactivity model in Svelte',
			date: '2025-03-22'
		},
		{
			title: 'UI Design Principles',
			description: 'Essential design principles for modern interfaces',
			date: '2025-02-10'
		}
	];

	const techOptions = [...new Set(works.flatMap((work) => work.techs))].sort();
	const typeOptions = [...new Set(works.map((work) => work.type))].sort();

	let selectedTech = $state<string[]>([]);
	let selectedType = $state<string>('');

	let filteredWorks = $derived(
		works.filter((work) => {
			const techMatch =
				selectedTech.length === 0 || work.techs.some((tech) => selectedTech.includes(tech));
			const typeMatch = selectedType.length === 0 || work.type === selectedType;
			return techMatch && typeMatch;
		})
	);

	function clearFilters() {
		selectedTech = [];
		selectedType = '';
	}

	let typingIndex = $state(0);
	let titles = ['Developer', 'Tech Enthusiast', 'Student'];
	let currentTitle = $derived(titles[typingIndex % titles.length]);
	let isLoading = $state(true);

	onMount(() => {
		setTimeout(() => {
			isLoading = false;
		}, 500);

		setTimeout(() => {
			setInterval(() => {
				typingIndex = (typingIndex + 1) % titles.length;
			}, 3000);
		}, 1500);
	});
</script>

<svelte:head>
	<title>Paillat Dev | Portfolio</title>
	<meta name="description" content="Personal portfolio website showcasing my projects and skills" />
</svelte:head>

<div class="container mx-auto max-w-4xl px-4">
	<section class="mb-12 py-10">
		<h1 class="mb-3 text-5xl font-bold tracking-tight">Hey, I'm Jérémie</h1>
		<p class="text-muted-foreground flex h-8 items-center gap-1 text-xl">
			I'm a
			<span class="relative px-2">
				{#if isLoading}
					<span class="bg-muted/50 inline-block h-6 w-24 animate-pulse rounded"></span>
				{:else}
					<span class="text-primary relative font-medium underline">
						{currentTitle}
					</span>
				{/if}
			</span>
			based in Switzerland, passionate about creating modern web experiences.
		</p>
		<div class="mt-6 flex gap-3">
			<Button>Get in touch</Button>
			<Button
				variant="outline"
				onclick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
				>View my work</Button
			>
		</div>
	</section>
	<section class="mb-16" id="projects">
		<div class="mb-6 flex items-center justify-between">
			<h2 class="text-2xl font-bold tracking-tight">Latest Projects</h2>
			<Button
				variant="outline"
				class="text-sm"
				onclick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
				>View all</Button
			>
		</div>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
			{#each works.slice(0, 3) as project}
				<ProjectCard title={project.title} description={project.description} />
			{/each}
		</div>
	</section>
	<section class="mb-16" id="blog">
		<div class="mb-6 flex items-center justify-between">
			<h2 class="text-2xl font-bold tracking-tight">Latest Posts</h2>
			<Button
				variant="outline"
				class="text-sm"
				onclick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
				>View all</Button
			>
		</div>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
			{#each posts as post}
				<PostCard title={post.title} description={post.description} date={post.date} />
			{/each}
		</div>
	</section>
	<Separator.Root class="my-12" />
	<section id="works">
		<h2 class="mb-8 text-3xl font-bold tracking-tight">My Works</h2>

		<div class="mb-8 flex flex-wrap items-center gap-4">
			<div class="flex flex-wrap items-center gap-2">
				<Select.Root bind:value={selectedTech} type="multiple">
					<Select.Trigger class="w-[180px]">
						<span class="overflow-hidden text-ellipsis whitespace-nowrap"
							>{selectedTech.length ? selectedTech.join(', ') : 'All Technologies'}</span
						>
					</Select.Trigger>
					<Select.Content>
						{#each techOptions as tech}
							<Select.Item value={tech}>{tech}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>

				<Select.Root bind:value={selectedType} type="single">
					<Select.Trigger class="w-[180px]">
						<span>{selectedType || 'All Types'}</span>
					</Select.Trigger>
					<Select.Content>
						{#each typeOptions as type}
							<Select.Item value={type}>{type}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>

				{#if selectedTech.length || selectedType}
					<Button
						variant="ghost"
						size="sm"
						onclick={clearFilters}
						class="text-muted-foreground hover:text-foreground"
					>
						Clear
					</Button>
				{/if}
			</div>
		</div>
		<div class="w-full">
			<Carousel items={filteredWorks} Element={WorkCard} />
		</div>
	</section>

	<Footer />
</div>
