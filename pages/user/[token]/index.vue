<template>
  <div class="flex items-center justify-center h-svh">
    <PageLoader />
  </div>
</template>

<script setup lang="ts">
const { api } = useApi()

onMounted(async () => {
  try {
    const response = await api.auth.fetchUserDetail()
    if (response.success) {
      navigateTo('/dashboard/buy-sms-online')
    }
  } catch (err) {
    navigateTo('/')
  }
})

useHead({
  title: 'Multitexter BulkSMS',
})

definePageMeta({
  layout: 'secondary',
})
</script>
