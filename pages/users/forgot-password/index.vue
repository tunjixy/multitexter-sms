<template>
  <div class="flex items-center justify-center h-svh">
    <PageLoader />
  </div>
</template>

<script setup lang="ts">
navigateTo('/forgot-password')

definePageMeta({
  layout: 'secondary',
})

useHead({
  title: 'Multitexter BulkSMS - Redirecting',
})
</script>
