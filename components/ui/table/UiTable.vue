<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div
    class="w-full overflow-auto scrollbar-thin scrollbar-thumb-grey dark:scrollbar-thumb-grey/10 scrollbar-thumb-rounded-md"
  >
    <table :class="cn('w-full caption-bottom text-sm', props.class)">
      <slot />
    </table>
  </div>
</template>
