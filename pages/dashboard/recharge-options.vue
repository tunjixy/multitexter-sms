<template>
  <div class="py-6">
    <div class="container">
      <AccountDetails />
      <nuxt-link
        to="/dashboard/bank-deposit"
        class="inline-block mt-5 text-sm font-bold text-primary"
      >
        Click here if you paid or made a transfer to our bank account
      </nuxt-link>
      <h5 class="mt-10 text-lg font-bold">
        For online payment with your debit / credit card
      </h5>
      <ul class="mt-4 ml-6 space-y-4 list-disc">
        <li
          v-for="(list, index) in lists"
          :key="index"
          class="text-light-text dark:text-dark-light-text"
        >
          {{ list }}
        </li>
      </ul>
      <nuxt-link
        to="/dashboard/buy-sms-online"
        class="inline-block mt-5 btn-primary"
      >
        Pay online with credit / debit card
      </nuxt-link>
      <p class="mt-5 text-sm">
        <strong>Note:</strong> All payments for SMS units are final, refunds are
        not possible for allocated units.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Reusable composable not related to this page
const appStore = useAppStore()

const lists = [
  'Ensure your account is BVN linked',
  'Ensure you have up to the amount you want to pay in your account',
  'Make sure you have a hardware token or your registered phone number (the one that receives alerts) with you',
  'Use only the on-screen keypad to enter your correct PIN number',
  'Your CCV / CVV2 code is usually the last 3 numbers typed at the back of your CARD',
]

appStore.setPageTitle('Recharge Options')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Recharge Options',
})
</script>
