<script lang="ts">
  import { formatDate } from '$lib';
  import type { PageData } from './$types';
  import SvelteMarkdown from 'svelte-markdown';

  export let data: PageData;
  const { post, markdown } = data;
</script>

<div class="flex w-full items-center justify-center">
  <a
    class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-125 filter invert mt-8"
    href="/"
  >
    <img class="w-32 h-32 rounded-full" src="/maze2.svg" alt="maze" width="80" height="80" />
  </a>
</div>

<article>
  <header class="text-center pt-16 md:pt-32">
    <h1 class="text-white font-bold break-normal text-3xl md:text-5xl">{post.title}</h1>
    <p class="text-sm md:text-base text-green-500 font-bold pt-4">
      <time datetime="{post.date.toISOString()}">{formatDate(post.date)}</time>
    </p>
  </header>

  <div
    class="container w-full max-w-6xl mx-auto bg-white bg-cover mt-8 rounded h-[75vh]"
    style="background-image: url({post.cover})"
  />

  <div class="container max-w-5xl mx-auto -mt-32">
    <section class="bg-gray-900 w-full p-8 md:p-24 text-xl md:text-2xl text-gray-300 leading-normal">
      <div class="prose max-w-none lg:prose-xl">
        <SvelteMarkdown source="{markdown}" />
      </div>
    </section>
  </div>
</article>
