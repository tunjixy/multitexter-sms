<script setup lang="ts">
import { SelectIcon, SelectTrigger, type SelectTriggerProps } from 'radix-vue'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<SelectTriggerProps & { class?: string; invalid?: boolean }>(),
  {
    class: '',
    invalid: false,
  },
)
</script>

<template>
  <SelectTrigger
    v-bind="props"
    :class="[
      cn(
        'flex w-full items-center justify-between rounded-md border border-grey bg-transparent px-3 py-3 text-sm ring-offset-transparent placeholder:text-light-text dark:placeholder:text-dark-light-text focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap [&>span]:truncate [&>span]:min-w-0 dark:border-grey/10 ',
        props.class,
      ),
      props.invalid
        ? '!ring-destructive ring-1 placeholder:!text-destructive'
        : '',
    ]"
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="w-4 h-4 opacity-50" />
    </SelectIcon>
  </SelectTrigger>
</template>
