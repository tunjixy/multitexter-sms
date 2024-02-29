<template>
  <div class="flex items-center justify-center h-svh">
    <PageLoader />
  </div>
</template>

<script setup lang="ts">
const { $toast } = useNuxtApp()
const { api } = useApi()

// eslint-disable-next-line camelcase
const { tx_ref, transaction_id } = useRoute().query

onMounted(async () => {
  try {
    // eslint-disable-next-line camelcase
    const transactionRef = tx_ref as string
    // eslint-disable-next-line camelcase
    const transactionId = transaction_id as string

    const response = await api.payment.verifyFlutterwavePayment(
      transactionRef,
      transactionId,
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
