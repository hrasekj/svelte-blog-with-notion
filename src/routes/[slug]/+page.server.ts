import { getSingleBlogPost } from '$lib/server';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  return getSingleBlogPost(params.slug);
}
