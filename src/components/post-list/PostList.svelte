<script lang="ts">
  import type { BlogPost } from '$types/schema';
  import SimplePost from '../simple-post/SimplePost.svelte';
  import LeadingPost from '../leading-post/LeadingPost.svelte';

  export let posts: BlogPost[];
  let leadPost: BlogPost | undefined;

  $: leadPost = posts.shift();
  // $: {
  //   leadPost = posts.shift();
  //   posts = posts;
  // }
</script>

{#if leadPost !== undefined}
  <LeadingPost post={leadPost} />
{/if}

<div class="flex flex-wrap justify-between mt-6 -mx-3">
  {#each posts as post}
    <SimplePost {post} />
  {/each}
</div>
