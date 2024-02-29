<template>
  <div class="flex flex-col items-center justify-center py-12">
    <slot name="illustration">
      <Empty class="mb-5 h-28 w-28" />
    </slot>
    <slot />
  </div>
</template>

<script setup lang="ts">
import Empty from '@/assets/icons/no-data.svg?component'
</script>
