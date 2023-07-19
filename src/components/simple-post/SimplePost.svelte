<script lang="ts">
  import type { BlogPost } from '$types/schema';
  import ImageWithShimmer from '../image/ImageWithShimmer.svelte';
  import SimplePostFooter from './SimplePostFooter.svelte';
  import TagList from './TagList.svelte';

  export let post: BlogPost;
</script>

<div class="w-full md:w-1/3 p-3">
  <a class="flex h-full rounded overflow-hidden shadow-lg" href="{post.slug}">
    <div class="flex flex-wrap no-underline hover:no-underline">
      <div class="w-full rounded-t">
        <ImageWithShimmer
          class="h-full object-cover shadow"
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
    </div>
  </a>
</div>
