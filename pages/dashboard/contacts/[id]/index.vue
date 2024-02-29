<template>
  <div class="py-6">
    <div class="container">
      <GoBack @back="$router.go(-1)" />
      <ContactListing />
    </div>
  </div>
</template>

<script setup lang="ts">
// Reusable composable not related to this page
const appStore = useAppStore()

appStore.setPageTitle('Phonebook Contacts')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Phonebook Contacts',
})
</script>
