<template>
  <div class="flex items-center justify-center h-svh">
    <PageLoader />
  </div>
</template>

<script setup lang="ts">
const { $toast } = useNuxtApp()

const { api } = useApi()

const { trxref, transid } = useRoute().query

onMounted(async () => {
  try {
    const transactionRef = trxref as string
    const transactionId = transid as string

    const response = await api.payment.verifyPayment(
      transactionId || transactionRef,
    )
    if (response.status === 1) {
      $toast.fire({
        icon: 'success',
        title: response.msg,
      })
      navigateTo('/dashboard/compose-sms')
    } else {
      $toast.fire({
        icon: 'error',
        title: response.msg,
      })
      navigateTo('/dashboard/buy-sms-online')
    }
  } catch (err) {
    $toast.fire({
      icon: 'error',
      title: formatErrorResponse(err),
    })
    navigateTo('/dashboard')
  }
})

definePageMeta({
  layout: 'secondary',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Payment Confirmation',
})
</script>
