<template>
  <a
    href=""
    :class="[
      modelValue === plan.id
        ? 'border-primary bg-primary/10'
        : 'border-grey dark:border-grey/5 bg-white dark:bg-dark-secondary',
    ]"
    class="relative w-full px-8 py-6 transition-colors duration-300 ease-linear border rounded-lg cursor-pointer shadow-custom"
    @click.prevent="selectPlan"
  >
    <CheckBadgeIcon
      v-show="modelValue === plan.id"
      class="absolute right-3 top-3 size-6 text-primary"
    />
    <h3 class="text-sm capitalize">
      {{ plan.bundle_name }}
    </h3>
    <p class="mt-1 text-xl font-bold">
      ₦{{ formatNumberWithComma(plan.amount) }}
    </p>
    <hr class="my-3 border-grey dark:border-grey/10" />
    <div class="flex items-center justify-between mt-3 text-sm">
      <p class="text-light-text dark:text-dark-light-text">Unit Price</p>
      <p class="font-bold">₦{{ plan.unit_price }}</p>
    </div>
    <div class="flex items-center justify-between mt-3 text-sm">
      <p class="text-light-text dark:text-dark-light-text">Pre loaded units</p>
      <p class="font-bold">{{ formatNumberWithComma(plan.total_units) }}</p>
    </div>
  </a>
</template>

<script setup lang="ts">
import type { Bundle } from '@/types/bundle'
import CheckBadgeIcon from '@/assets/icons/check-badge.svg?component'

const props = defineProps<{
  plan: Bundle
}>()

const { $toast } = useNuxtApp()

const modelValue = defineModel<number>()

function selectPlan() {
  if (props.plan.status === 1) {
    modelValue.value = props.plan.id
  } else if (props.plan.status === 0) {
    $toast.fire({
      icon: 'error',
      title:
        'You have already purchased this plan, it will be become active after 30 days.',
    })
  }
}
</script>
