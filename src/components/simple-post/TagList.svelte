<script lang="ts">
  import type { Tag } from '$types/schema';
  import { cn } from '$lib';

  export let tags: Tag[];
</script>

<div class="w-full flex flex-wrap gap-2 items-center justify-center pt-6">
  {#each tags as { name, color }}
    <span
      data-color={color}
      class={cn('w-24 text-black text-xs md:text-sm text-center rounded-full mt-2', 'bg-gradient-to-r', {
        'from-gray-600 to-gray-200': color === 'default',
        'from-gray-800 to-gray-200': color === 'gray',
        'from-amber-800 to-amber-200': color === 'brown',
        'from-orange-800 to-orange-200': color === 'orange',
        'from-yellow-800 to-yellow-200': color === 'yellow',
        'from-green-800 to-green-200': color === 'green',
        'from-blue-800 to-blue-200': color === 'blue',
        'from-purple-800 to-purple-200': color === 'purple',
        'from-pink-800 to-pink-200': color === 'pink',
        'from-red-800 to-red-200': color === 'red'
      })}
    >
      {name}
    </span>
  {/each}
</div>
