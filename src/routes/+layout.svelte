<script>
  import '../app.css';
  // something wrong with eslint, when i use Footer instead of FooterComponent,
  // the component as tag is lowercased.
  import FooterComponent from '../components/footer/Footer.svelte';

  /** @type {import('./$types').LayoutData} */
  export let data;
</script>

<svelte:head>
  <title>{data.seo.title}</title>
  <meta name="description" content="{data.seo.description}" />
  <meta name="keywords" content="{data.seo.keywords}" />

  <meta property="og:type" content="{data.seo.openGraph.type}" />
  <meta property="og:locale" content="{data.seo.openGraph.locale}" />
  <meta property="og:site_name" content="{data.seo.openGraph.siteName}" />

  {#each data.seo.openGraph.images as image}
  <meta property="og:image" content="{image.url}" />
  <meta property="og:image:width" content="{`${image.width}`}" />
  <meta property="og:image:height" content="{`${image.height}`}" />
  {/each}
</svelte:head>

<main class="flex flex-col h-screen justify-between">
  <slot />
  <FooterComponent />
</main>
