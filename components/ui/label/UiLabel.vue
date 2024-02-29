<script setup lang="ts">
import { Label, type LabelProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<LabelProps & { class?: string }>()
</script>

<template>
  <Label
    v-bind="props"
    :class="
      cn(
        'block text-sm tracking-tight text-light-text dark:text-dark-light-text mb-1',
        props.class,
      )
    "
  >
    <slot />
  </Label>
</template>
