<template>
  <UiButton
    variant="ghost"
    class="flex items-center px-0 mb-8 text-sm"
    @click="$emit('back')"
  >
    <BackIcon class="mr-2 size-4" />
    Go Back
  </UiButton>
</template>

<script setup lang="ts">
import BackIcon from '@/assets/icons/chevron-left.svg?component'

defineEmits(['back'])
</script>
