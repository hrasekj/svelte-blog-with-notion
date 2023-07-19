<script lang="ts">
  let className = '';
  export { className as class };

  export let src: string | undefined;
  export let alt: string | undefined;
  export let width: SafeNumber;
  export let height: SafeNumber;

  /**
   * @see https://image-component.nextjs.gallery/shimmer
   */
  const shimmer = (w: SafeNumber, h: SafeNumber) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

  const toBase64 = (str: string) =>
    typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);

  type SafeNumber = number | `${number}`;
</script>

{#if !src}
  <img
    class={className}
    src="data:image/svg+xml;base64,{toBase64(shimmer(width, height))}"
    alt=""
    width={width ?? 200}
    height={height ?? 200}
  />
{:else}
  <img class={className} {src} {alt} {width} {height} />
{/if}
