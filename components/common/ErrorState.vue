<template>
  <div class="flex flex-col items-center justify-center mt-10">
    <div
      v-if="!isOnline"
      class="flex items-center justify-center rounded-full size-20 bg-red-100/10"
    >
      <WifiIcon class="text-red-500 size-16" />
    </div>
    <div
      v-else
      class="flex items-center justify-center rounded-full size-20 bg-red-100/10"
    >
      <ExclamationIcon class="text-red-500 size-16" />
    </div>
    <h2 class="mt-5 max-w-[200px] text-center">
      {{
        !isOnline
          ? "You're offline, check your internet connection"
          : 'Something went wrong, try again'
      }}
    </h2>
    <button
      class="min-h-[30px] mx-auto mt-5 rounded shadow-btn bg-primary dark:hover:bg-primary-dark px-8 py-2"
      @click="$emit('tryAgain')"
    >
      Retry
    </button>
  </div>
</template>

<script setup lang="ts">
import WifiIcon from '@/assets/icons/wifi.svg?component'
import ExclamationIcon from '@/assets/icons/exclamation.svg?component'

const emits = defineEmits(['tryAgain'])

const { isOnline } = useNetwork()

watch(isOnline, (val) => {
  if (val) {
    emits('tryAgain')
  }
})
</script>
