import { getPublishedBlogPosts } from '$lib/server';

/** @type {import('./$types').PageLoad} */
export async function load() {
  return {
    posts: await getPublishedBlogPosts()
  };
}
