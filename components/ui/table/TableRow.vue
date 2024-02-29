<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <tr
    :class="
      cn(
        'border-b border-grey dark:border-grey/10 transition-colors hover:bg-grey/30 data-[state=selected]:bg-grey dark:hover:bg-grey/5 dark:data-[state=selected]:bg-grey/10 whitespace-nowrap',
        props.class,
      )
    "
  >
    <slot />
  </tr>
</template>
