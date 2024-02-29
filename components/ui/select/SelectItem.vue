<script setup lang="ts">
import {
  SelectItem,
  SelectItemIndicator,
  type SelectItemProps,
  SelectItemText,
} from 'radix-vue'
import { Check } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<SelectItemProps & { class?: string }>()
</script>

<template>
  <SelectItem
    v-bind="props"
    :class="
      cn(
        'relative flex w-full select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-grey focus:text-dark-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-grey/10 dark:focus:text-white cursor-pointer',
        props.class,
      )
    "
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectItemIndicator>
        <Check class="w-4 h-4" />
      </SelectItemIndicator>
    </span>

    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItem>
</template>
