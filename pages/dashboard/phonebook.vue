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
        @try-again="fetchContactLists(currentPage)"
      />

      <LazyContactListListing v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
// Reusable composable not related to this page
const appStore = useAppStore()

// Reusable composable related to this page
const { loading, error, currentPage, contactLists, fetchContactLists } =
  useContactList()

onMounted(() => {
  if (!contactLists.value) {
    fetchContactLists(currentPage.value)
  }
})

appStore.setPageTitle('Phonebook')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Phonebook',
})
</script>
