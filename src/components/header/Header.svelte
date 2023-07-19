<script lang="ts">
  export let title: string;
</script>

<header class="w-full m-0 p-0 bg-cover bg-bottom relative overflow-hidden h-[80vh] max-h-[300px] md:max-h-[600px]">
  <img
    class="absolute w-full h-auto object-cover z-0"
    src="/nature-landscape-water.jpg"
    alt=""
    width="1920"
    height="1080"
  />
  <div class="container relative max-w-4xl mx-auto pt-16 md:pt-32 text-center break-normal">
    <h1 class="text-black text-7xl md:text-9xl" style="font-family: cursive">{title}</h1>
  </div>
</header>
