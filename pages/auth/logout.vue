<template>
  <div class="flex items-center justify-center h-svh">
    <PageLoader />
  </div>
</template>

<script setup lang="ts">
const token = useCookie<null | undefined | string>('mt_token')

token.value = null

onMounted(async () => {
  await sleep(500)
  localStorage.removeItem('user')
  navigateTo('/login')
  // window.location.href = '/login'
})

definePageMeta({
  layout: 'secondary',
})

useHead({
  title: 'Multitexter BulkSMS - Logout',
})
</script>
