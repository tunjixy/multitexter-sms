<template>
  <div class="py-6">
    <div class="container">
      <UiAlert>
        <InfoIcon class="size-4" />
        <AlertTitle>For Instant Recharges</AlertTitle>
        <AlertDescription>
          We advise you buy SMS units online with your debit cards for instant
          recharge, especially on Weekends (Sat-Sun) instead of transfer which
          will require confirmation . For any assistance, kindly reach us on
          <a
            class="font-bold text-primary"
            href="mailto:support@multitexter.com"
          >
            support@multitexter.com
          </a>
        </AlertDescription>
      </UiAlert>

      <h1 class="mt-10 text-lg font-bold">Online Payment</h1>
      <p class="mt-1 text-sm text-light-text dark:text-dark-light-text">
        Recharge your account
      </p>
      <div class="max-w-lg mt-5">
        <UiLabel for="paymentMode">Payment mode</UiLabel>
        <UiSelect v-model="selectedPaymentMode" name="paymentMode">
          <SelectTrigger>
            <SelectValue placeholder="Choose payment mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel class="text-light-text dark:text-dark-light-text">
                Payment mode
              </SelectLabel>
              <SelectItem
                v-for="mode in paymentMode"
                :key="mode.id"
                :value="mode.id"
              >
                {{ mode.name }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </UiSelect>
      </div>

      <TransitionSlide :duration="500" mode="out-in">
        <ModePayment v-if="selectedPaymentMode === 'pay'" />
        <LazyModeBundle v-else-if="selectedPaymentMode === 'bundle'" />
      </TransitionSlide>
    </div>
  </div>
</template>

<script setup lang="ts">
import InfoIcon from '@/assets/icons/info.svg?component'

// Reusable composable not related to this page
const appStore = useAppStore()

const paymentMode = [
  { id: 'pay', name: 'Pay As You Use' },
  { id: 'bundle', name: 'Subscription Plan' },
  { id: 'transfer', name: 'Transfer' },
]
const selectedPaymentMode = ref('pay')

watch(selectedPaymentMode, async (val) => {
  if (val === 'transfer') {
    await sleep(500)
    navigateTo('/dashboard/bank-deposit')
  }
})

appStore.setPageTitle('Purchase Unit')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Purchase Unit',
})
</script>
