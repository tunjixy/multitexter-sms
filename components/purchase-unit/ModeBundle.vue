<template>
  <div>
    <div
      v-if="isFetching"
      class="grid grid-cols-1 gap-5 mt-10 sm:grid-cols-2 md:grid-cols-3"
    >
      <UiSkeleton v-for="n in 3" :key="n" class="w-full rounded-lg h-28" />
    </div>
    <ErrorState v-else-if="!isFetching && error" @try-again="fetchBundles" />
    <div
      v-else
      class="grid grid-cols-1 gap-5 mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
    >
      <BundlePlan
        v-for="plan in bundlePlans"
        :key="plan.id"
        v-model="selectedBundlePlan"
        :plan="plan"
      />
    </div>
    <h6 class="mt-10 font-bold">Please note:</h6>
    <ul class="mt-5 ml-4 space-y-4 list-disc">
      <li v-for="(note, index) in notes" :key="index" class="max-w-4xl text-sm">
        {{ note }}
      </li>
    </ul>
    <UiButton
      :disabled="loading"
      class="flex mt-8 ml-auto"
      @click="proceedToBuyBundle"
    >
      <SpinLoader v-show="loading" class="mr-2" />
      {{ loading ? 'Please wait' : 'Proceed' }}
    </UiButton>
  </div>
</template>

<script setup lang="ts">
const { $toast } = useNuxtApp()

// Reusable composable not related to this component
const { api } = useApi()

// Reusable composable related to this component
const {
  fetchBundles,
  notes,
  selectedBundlePlan,
  loading: isFetching,
  error,
} = useBundle()
const { bundlePlans } = storeToRefs(useBundleStore())

const loading = ref(false)

onMounted(() => {
  if (!bundlePlans.value) {
    fetchBundles()
  }
})

async function proceedToBuyBundle() {
  try {
    loading.value = true
    const response = await api.bundle.buyBundlePlan(selectedBundlePlan.value)
    if (response.status === 1) {
      window.location.href = response.url
    } else {
      $toast.fire({
        icon: 'error',
        title: response.msg,
      })
    }
    loading.value = false
  } catch (err) {
    loading.value = false
    $toast.fire({
      icon: 'error',
      title: formatErrorResponse(err),
    })
  }
}
</script>
