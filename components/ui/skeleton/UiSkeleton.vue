<script setup lang="ts">
import { cn } from '@/lib/utils'

interface SkeletonProps {
  class?: string
}

const props = defineProps<SkeletonProps>()
</script>

<template>
  <div
    :class="
      cn(
        'animate-pulse rounded-md bg-gray-200 shadow-custom dark:bg-dark-secondary',
        props.class,
      )
    "
  />
</template>
