<template>
  <div class="flex items-center justify-center h-svh">
    <PageLoader />
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/types/user'

const { api } = useApi()

const { verify } = useRoute().query

const user = JSON.parse(localStorage.getItem('user') || '{}') as User

onMounted(async () => {
  try {
    const response = await api.auth.checkActivationStatus(verify as string)
    if (response.status === 1) {
      if (user.id) {
        navigateTo('/dashboard?activated=1')
      } else {
        navigateTo('/login?activated=1')
      }
    } else if (response.status === -2) {
      navigateTo('/resend-activation')
    } else if (response.status === -3) {
      if (user.id) {
        navigateTo('/dashboard?activated=3')
      } else {
        navigateTo('/login')
      }
    } else {
      navigateTo('/')
    }
  } catch (err) {
    navigateTo('/')
  }
})

useHead({
  title: 'Multitexter BulkSMS - Checking Activation Status',
})

definePageMeta({
  layout: 'secondary',
})
</script>
