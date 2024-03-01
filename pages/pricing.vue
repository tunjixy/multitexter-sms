<template>
  <div>
    <section class="pt-24">
      <div class="container">
        <h1
          class="text-3xl font-bold text-center md:text-4xl lg:text-5xl text-pretty"
        >
          Our Pricing
        </h1>
        <p
          class="max-w-2xl mx-auto mt-2 text-lg leading-loose text-center text-light-text dark:text-dark-light-text"
        >
          Our pricing system is simple: the more you buy, the more units you
          get... and there is no maximum limit to the number of units you can
          purchase at any time. We have two plans for you to choose from.
        </p>
      </div>
    </section>

    <section class="pt-24 pb-16">
      <div class="container">
        <div class="grid items-start grid-cols-1 gap-10 xl:grid-cols-3">
          <div class="xl:col-span-2">
            <h2 class="text-lg font-bold">1. Pay-As-You-Use plan</h2>
            <p class="mt-2 text-light-text dark:text-dark-light-text">
              Our pay-As-You-Use plan are charged on a unit basis and are billed
              as follows
            </p>
            <PricingListing />
            <AccountDetails class="mt-10" />
          </div>
          <PriceCalculator />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { PriceRes, PriceBundleRes } from '@/types'

// config
const { BASE_URL } = useRuntimeConfig().public

// Reusable composable not related to this page
const nuxt = useNuxtApp()

// Reusable composable related to this page
const { prices, priceBundles } = usePricing()

const [price, priceBundle] = await Promise.all([
  await useFetch<PriceRes>('prices', {
    baseURL: BASE_URL,
    key: 'prices',
    getCachedData: (key) => {
      // Check if the data is already cached else refetch data
      return nuxt.payload.data[key] || nuxt.static.data[key]
    },
  }),
  await useFetch<PriceBundleRes>('price-bundles', {
    baseURL: BASE_URL,
    key: 'prices-bundles',
    getCachedData: (key) => {
      // Check if the data is already cached else refetch data
      return nuxt.payload.data[key] || nuxt.static.data[key]
    },
  }),
])

if (price.data.value?.status === 1) {
  prices.value = price.data.value.data
}

if (priceBundle.data.value?.status === 1) {
  priceBundles.value = priceBundle.data.value.data
}

if (price.error.value || priceBundle.error.value) {
  throw createError({
    statusCode: 400,
    statusMessage: 'Error fetching prices',
  })
}

useHead({
  title: 'Multitexter BulkSMS - Pricing',
})
</script>
