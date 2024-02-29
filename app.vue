<template>
  <NuxtLayout>
    <main class="wrapper">
      <NuxtLoadingIndicator
        v-if="!isDashboardRoute"
        :height="2"
        color="#40c2f3"
      />
      <NuxtPage />
    </main>
  </NuxtLayout>
</template>

<script setup lang="ts">
// Reusable composable not related to this component
const { fetchUserDetails } = useAuth()
const { isLoggedIn } = storeToRefs(useUserStore())

const route = useRoute()

const isDashboardRoute = computed(() => {
  return route.path.includes('/dashboard')
})

onMounted(() => {
  if (isLoggedIn.value) {
    fetchUserDetails()
  }
})
</script>
