<script setup lang="ts">
import { DropdownMenuTrigger, type DropdownMenuTriggerProps } from 'radix-vue'

const props = defineProps<DropdownMenuTriggerProps>()
</script>

<template>
  <DropdownMenuTrigger
    class="focus-visible:outline-none focus-visible:outline-primary"
    v-bind="props"
  >
    <slot />
  </DropdownMenuTrigger>
</template>
