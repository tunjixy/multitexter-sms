<template>
  <div class="py-6">
    <div class="container">
      <template v-if="loading">
        <LazyUiSkeleton
          v-for="n in 4"
          :key="n"
          class="w-full mt-3 rounded h-14"
        />
      </template>

      <LazyErrorState
        v-else-if="!loading && error"
        @try-again="fetchQueuedMessages"
      />

      <LazyQueuedMessageListing v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
const appStore = useAppStore()

// Reusable composable related to this page
const { queuedMessages } = storeToRefs(useMessageStore())
const { loading, error, fetchQueuedMessages } = useMessage()

onMounted(() => {
  if (!queuedMessages.value) {
    fetchQueuedMessages()
  }
})

appStore.setPageTitle('Queued Messages')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Queued Messages',
})
</script>
