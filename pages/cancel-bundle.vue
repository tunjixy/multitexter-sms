<template>
  <div class="flex items-center justify-center h-svh">
    <PageLoader />
  </div>
</template>

<script setup lang="ts">
const { $toast } = useNuxtApp()

const { api } = useApi()

const { code } = useRoute().query

onMounted(async () => {
  try {
    const response = await api.bundle.cancelBundlePlan(code as string)
    if (response.status === 1) {
      $toast.fire({
        icon: 'success',
        title: response.msg,
      })
      navigateTo('/')
    }
  } catch (err) {
    $toast.fire({
      icon: 'error',
      title: formatErrorResponse(err),
    })
    navigateTo('/')
  }
})

definePageMeta({
  layout: 'secondary',
})

useHead({
  title: 'Multitexter BulkSMS - Cancel Bundle',
})
</script>
