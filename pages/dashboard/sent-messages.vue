<template>
  <div class="py-6">
    <div class="container">
      <UiAlert variant="success">
        <AlertDescription class="text-sm">
          Sent SMS ( Please Note that messages are deleted after 90 days)
        </AlertDescription>
      </UiAlert>

      <template v-if="loading">
        <div class="mt-10">
          <LazyUiSkeleton
            v-for="n in 4"
            :key="n"
            class="w-full mt-3 rounded h-14"
          />
        </div>
      </template>

      <LazyErrorState
        v-else-if="!loading && error"
        @try-again="fetchSentMessages"
      />

      <LazySentMessageListing v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
// Reusable composable not related to this page
const appStore = useAppStore()

// Reusable composable related to this page
const { sentMessages } = storeToRefs(useMessageStore())
const { loading, error, fetchSentMessages } = useMessage()

onMounted(() => {
  if (!sentMessages.value) {
    fetchSentMessages()
  }
})

appStore.setPageTitle('Sent Messages')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Sent Messages',
})
</script>
