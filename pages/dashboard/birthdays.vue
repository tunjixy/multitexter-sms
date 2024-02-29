<template>
  <div class="py-6">
    <div class="container">
      <div class="flex flex-wrap justify-end gap-3">
        <UiButton @click="navigateTo('/dashboard/add-birthday')">Add</UiButton>
        <UiButton
          variant="outline"
          @click="navigateTo('/dashboard/birthday-upload')"
        >
          Upload
        </UiButton>
      </div>

      <template v-if="loading">
        <div class="mt-6">
          <LazyUiSkeleton
            v-for="n in 4"
            :key="n"
            class="w-full mt-3 rounded h-14"
          />
        </div>
      </template>

      <LazyErrorState
        v-else-if="!loading && error"
        @try-again="fetchBirthdays"
      />

      <LazyBirthdayListing v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
// Reusable composable not related to this page
const appStore = useAppStore()

// Reusable composable related to this component
const { loading, error, birthdays, fetchBirthdays } = useBirthday()

onMounted(() => {
  if (!birthdays.value) {
    fetchBirthdays()
  }
})

appStore.setPageTitle('Birthday')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Birthday',
})
</script>
