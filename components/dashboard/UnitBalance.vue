<template>
  <div v-if="userDetail" class="flex flex-wrap items-center gap-10">
    <div>
      <h1 class="text-sm text-light-text dark:text-dark-light-text">
        Unit Balance
      </h1>
      <p class="flex items-center mt-1 text-3xl font-bold">
        <CoinIcon class="mr-2 size-4" />
        {{ formatNumberWithComma(userDetail.balance) }}
      </p>
      <UiButton class="mt-5" @click="navigateTo('/dashboard/buy-sms-online')">
        Top Up
        <ArrowRight class="ml-2 size-4" />
      </UiButton>
    </div>

    <div v-if="userDetail.bundle.isbundle !== 0">
      <h1 class="text-sm text-light-text dark:text-dark-light-text">
        Bundle Balance
      </h1>
      <p class="flex items-center mt-1 text-3xl font-bold">
        <CoinIcon class="mr-2 size-4" />
        {{ formatNumberWithComma(userDetail.bundle.bundlebalance) }}
      </p>
      <UiButton
        variant="outline"
        class="mt-5"
        @click="navigateTo('/dashboard/bundle')"
      >
        View Bundle
        <ArrowRight class="ml-2 size-4" />
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowRight from '@/assets/icons/chevron-right.svg?component'
import CoinIcon from '@/assets/icons/coin.svg?component'

const { userDetail } = storeToRefs(useUserStore())
</script>
