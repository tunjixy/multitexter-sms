<script setup lang="ts">
import { DropdownMenuItem, type DropdownMenuItemProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<
  DropdownMenuItemProps & { inset?: boolean; class?: string }
>()
</script>

<template>
  <DropdownMenuItem
    v-bind="props"
    :class="[
      cn(
        'relative flex select-none items-center rounded-sm px-2 py-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:grey/20 hover:bg-grey/20 cursor-pointer disabled:cursor-not-allowed',
        inset && 'pl-8',
        props.class,
      ),
    ]"
  >
    <slot />
  </DropdownMenuItem>
</template>
