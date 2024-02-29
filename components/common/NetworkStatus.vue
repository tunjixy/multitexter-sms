<template>
  <TransitionScale>
    <div
      v-show="!isShowing"
      :class="[
        isOnline
          ? 'bg-green-500/10 text-green-500'
          : 'bg-red-500/10 text-red-500',
      ]"
      class="sticky top-0 flex items-center justify-center w-full py-4 text-sm font-bold text-center backdrop-blur-sm"
    >
      {{
        isOnline
          ? "You're back online"
          : "You're offline, check your internet connection"
      }}
    </div>
  </TransitionScale>
</template>

<script setup lang="ts">
const { isOnline } = useNetwork()
const isShowing = ref(true)

watch(
  isOnline,
  (val) => {
    if (val) {
      setTimeout(() => {
        isShowing.value = true
      }, 1000)
    } else {
      isShowing.value = false
    }
  },
  { immediate: true },
)
</script>
