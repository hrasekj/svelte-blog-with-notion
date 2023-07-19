<script lang="ts">
  import type { BlogPost } from '$types/schema';
  import ImageWithShimmer from '../image/ImageWithShimmer.svelte';
  import SimplePostFooter from '../simple-post/SimplePostFooter.svelte';
  import TagList from '../simple-post/TagList.svelte';

  export let post: BlogPost;
</script>

<div class="flex rounded overflow-hidden shadow-lg">
  <a class="flex flex-wrap no-underline hover:no-underline" href="{post.slug}">
    <div class="w-full md:w-2/3 rounded-t">
      <ImageWithShimmer
        class="h-full w-full object-cover shadow"
        src="{post.cover}"
        alt="{post.title}"
        width="{800}"
        height="{600}"
      />
    </div>

    <div class="w-full md:w-1/3 flex flex-col flex-grow flex-shrink bg-gray-900 text-white">
      <TagList tags="{post.tags}" />

      <div class="flex flex-wrap no-underline hover:no-underline">
        <h3 class="w-full font-bold text-xl mt-6 px-6">{post.title}</h3>
        <p class="font-serif text-base px-6 mb-5">{post.description}</p>
      </div>

      <div class="bg-gray-900 flex-none mt-auto rounded-b overflow-hidden shadow-lg p-6">
        <div class="flex items-center justify-between">
          <SimplePostFooter />
          <p class="text-xs md:text-sm">1 MIN READ</p>
        </div>
      </div>
    </div>
  </a>
</div>
