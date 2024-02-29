<template>
  <div class="py-6">
    <div class="container">
      <p class="max-w-4xl text-lg text-light-text dark:text-dark-light-text">
        Our pricing system is simple: the more you buy, the more units you
        get... and there is no maximum limit to the number of units you can
        purchase at any time. We have two plans for you to choose from.
      </p>
      <div class="grid items-start grid-cols-1 gap-10 mt-10 2xl:grid-cols-3">
        <div class="2xl:col-span-2">
          <h2 class="text-lg font-bold">1. Pay-As-You-Use plan</h2>
          <p class="mt-2 text-light-text dark:text-dark-light-text">
            Our pay-As-You-Use plan are charged on a unit basis and are billed
            as follows
          </p>

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
            @try-again="fetchPricing"
          />

          <LazyPricingListing v-else />
        </div>
        <PriceCalculator class="max-w-lg 2xl:w-full" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PriceRes, PriceBundleRes } from '@/types'

// config
const { BASE_URL } = useRuntimeConfig().public

// Reusable composable not related to this page
const appStore = useAppStore()

// Reusable composable related to this page
const { prices, priceBundles } = usePricing()

const loading = ref(false)
const error = ref(false)

onMounted(() => {
  if (!prices.value && !priceBundles.value) {
    fetchPricing()
  }
})

async function fetchPricing() {
  try {
    loading.value = true
    error.value = false

    const [price, priceBundle] = await Promise.all([
      await $fetch<PriceRes>('prices', {
        baseURL: BASE_URL,
      }),
      await $fetch<PriceBundleRes>('price-bundles', {
        baseURL: BASE_URL,
      }),
    ])

    if (price.status === 1) {
      prices.value = price.data
    } else {
      error.value = true
    }

    if (priceBundle.status === 1) {
      priceBundles.value = priceBundle.data
    } else {
      error.value = true
    }

    loading.value = false
  } catch (err) {
    loading.value = false
    error.value = true
  }
}

appStore.setPageTitle('Pricing')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Pricing',
})
</script>
