<script setup lang="ts">
import {
  ProgressIndicator,
  ProgressRoot,
  type ProgressRootProps,
} from 'radix-vue'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<ProgressRootProps & { class?: string }>(),
  {
    class: '',
    modelValue: 0,
  },
)
</script>

<template>
  <ProgressRoot
    :class="
      cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-grey dark:bg-grey/10',
        props.class,
      )
    "
    v-bind="props"
  >
    <ProgressIndicator
      :class="cn('h-full w-full flex-1 duration-300 bg-green-500', props.class)"
      :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
    />
  </ProgressRoot>
</template>
