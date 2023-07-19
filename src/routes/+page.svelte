<script lang="ts">
  import type { PageData } from './$types';
  import { PUBLIC_SITE_NAME } from '$env/static/public';
  import HeaderComponent from '../components/header/Header.svelte';
  import PostList from '../components/post-list/PostList.svelte';

  let title = PUBLIC_SITE_NAME;

  export let data: PageData;
</script>

<HeaderComponent {title} />

<div class="container relative px-4 md:px-0 max-w-6xl mx-auto -mt-32">
  <PostList posts={data.posts} />
</div>
