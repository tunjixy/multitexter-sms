<template>
  <div
    class="sticky top-0 z-10 flex flex-col items-center justify-center py-4 bg-lightBg dark:bg-darkBg"
  >
    <button
      v-if="show"
      class="flex items-center justify-center ml-auto border rounded-full size-8 border-grey dark:border-grey/10 sm"
      @click="$emit('close')"
    >
      <TimesIcon class="size-4" />
    </button>
    <AppLogo />
    <template v-if="user && userDetail">
      <h6 class="mt-5 text-lg font-bold text-center">
        Hi <span class="text-primary">{{ user.firstname }}</span>
      </h6>
      <p class="flex items-center gap-2 mt-2">
        <CoinIcon class="size-4" />
        <span class="text-sm font-bold">
          {{ formatNumberWithComma(userDetail.balance) }}
        </span>
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import CoinIcon from '@/assets/icons/coin.svg?component'
import TimesIcon from '@/assets/icons/times.svg'

defineProps<{
  show?: boolean
}>()

defineEmits(['close'])

// Reusable composable not related to this page
const { user, userDetail } = storeToRefs(useUserStore())
</script>
