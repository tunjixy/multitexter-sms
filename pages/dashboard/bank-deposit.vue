<template>
  <div class="py-6">
    <div class="container">
      <div class="grid items-start grid-cols-1 gap-10 xl:grid-cols-2 xl:gap-10">
        <div class="md:max-w-lg md:mx-auto">
          <h6 class="font-bold uppercase text-primary">Step 1</h6>
          <p
            class="mt-1 text-sm leading-relaxed text-light-text dark:text-dark-light-text"
          >
            For bank deposits and online transfers, pay into any of the accounts
            given in the right panel or transfer via internet banking, Mobile
            money or ATM Transfer.
          </p>
          <h6 class="mt-5 font-bold text-yellow-500 uppercase">Important</h6>
          <p
            class="mt-1 text-sm leading-relaxed text-light-text dark:text-dark-light-text"
          >
            Enter your <strong>"Email Address"</strong> as the
            <strong>"Depositor's Name"</strong> when making payment at the bank.
          </p>
          <h6 class="mt-5 font-bold uppercase text-primary">Step 2</h6>
          <DepositForm />
        </div>
        <AccountDetails class="sticky md:max-w-lg md:mx-auto top-16" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Reusable composable not related to this page
const appStore = useAppStore()

appStore.setPageTitle('Deposit / Transfer')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Deposit / Transfer',
})
</script>
