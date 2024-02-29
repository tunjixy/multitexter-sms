<template>
  <div class="py-6">
    <div class="container">
      <template v-if="user && userDetail">
        <UnitBalance />
        <DashboardStats />
        <DashboardActions />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
// Reusable composable not related to this page
const appStore = useAppStore()
const { $toast } = useNuxtApp()
const { user, userDetail } = storeToRefs(useUserStore())

const { activated } = useRoute().query

onMounted(() => {
  if (Number(activated) === 1) {
    $toast.fire({
      icon: 'success',
      title: 'Your account has been verified',
    })
  } else if (Number(activated) === 3) {
    $toast.fire({
      icon: 'success',
      title: 'Your account has already been verified',
    })
  }
})

appStore.setPageTitle('Account Overview')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Account Overview',
})
</script>
