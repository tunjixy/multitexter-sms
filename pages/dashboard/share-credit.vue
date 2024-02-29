<template>
  <div class="py-6">
    <div class="container">
      <TransferUnitForm />
      <TransferListing />
    </div>
  </div>
</template>

<script setup lang="ts">
// Reusable composable not related to this page
const appStore = useAppStore()

appStore.setPageTitle('Transfer Unit')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Transfer Unit',
})
</script>
