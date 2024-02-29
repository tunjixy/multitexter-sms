<template>
  <div class="flex items-center mt-1 text-xs font-bold text-red-500">
    <div class="mr-1">
      <InfoIcon class="w-4 h-4 text-red-500" />
    </div>
    <ul v-if="Array.isArray(message)" class="space-y-3 list-disc">
      <li v-for="(item, index) in message" :key="index">
        {{ item }}
      </li>
    </ul>
    <p v-else>{{ message }}</p>
  </div>
</template>

<script lang="ts" setup>
import InfoIcon from '@/assets/icons/info.svg?component'

defineProps<{
  message?: string | string[]
}>()
</script>
