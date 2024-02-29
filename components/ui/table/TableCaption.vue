<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <caption
    :class="
      cn('mt-4 text-sm text-light-text dark:text-dark-light-text', props.class)
    "
  >
    <slot />
  </caption>
</template>
