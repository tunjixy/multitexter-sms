<template>
  <div>
    <h2 class="text-lg font-bold">Bundle plan</h2>
    <p class="mt-1 text-sm text-light-text dark:text-dark-light-text">
      Your current bundle plan
    </p>
    <div class="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 md:grid-cols-3">
      <div>
        <h6 class="text-sm text-light-text dark:text-dark-light-text">Name</h6>
        <p class="font-bold capitalize">{{ plan.bundle_name }}</p>
      </div>
      <div>
        <h6 class="text-sm text-light-text dark:text-dark-light-text">
          Last subscribed
        </h6>
        <p class="font-bold">
          {{
            useDateFormat(plan.last_subscription, 'ddd MMMM Do, YYYY HH:mm a')
              .value
          }}
        </p>
      </div>
      <div>
        <h6 class="text-sm text-light-text dark:text-dark-light-text">
          Next renew date
        </h6>
        <p class="font-bold">{{ plan.next_subscription }}</p>
      </div>
    </div>
    <UiButton
      v-if="plan.expire"
      size="sm"
      :disabled="isRenewing"
      class="mt-5"
      @click="$emit('onRenew')"
    >
      <SpinLoader v-show="isRenewing" class="mr-2" />
      {{ isRenewing ? 'Please wait' : 'Renew your subscription' }}
    </UiButton>
    <h6 class="mt-10 font-bold">End subscription</h6>
    <p class="mt-1 text-sm text-light-text dark:text-dark-light-text">
      Upon cancellation, your accumulated bundle units will be lost
    </p>
    <UiButton
      variant="destructive"
      size="sm"
      :disabled="isCancelling"
      class="mt-5"
      @click="$emit('onCancel')"
    >
      <SpinLoader v-show="isCancelling" class="mr-2" />
      {{ isCancelling ? 'Please wait' : 'Cancel your subscription' }}
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import type { SubscribedBundle } from '@/types/bundle'

defineProps<{
  plan: SubscribedBundle
  isRenewing: boolean
  isCancelling: boolean
}>()

defineEmits(['onRenew', 'onCancel'])
</script>
