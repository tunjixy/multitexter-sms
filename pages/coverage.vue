<template>
  <div>
    <section class="pt-24">
      <div class="container">
        <h1
          class="text-3xl font-bold text-center md:text-4xl lg:text-5xl text-pretty"
        >
          Our Coverage
        </h1>
        <p
          class="max-w-2xl mx-auto mt-2 text-lg leading-loose text-center text-light-text dark:text-dark-light-text"
        >
          We cover where you need to reach
        </p>
      </div>
    </section>

    <section class="pt-32 pb-16">
      <div class="container">
        <template v-if="coverages">
          <EmptyState v-if="coverages.length === 0">
            No coverages available
          </EmptyState>
          <ul
            v-else
            class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-10"
          >
            <li
              v-for="(coverage, index) in coverages"
              :key="index"
              class="flex flex-col px-8 py-6 bg-white border rounded-lg dark:bg-dark-secondary shadow-custom border-grey dark:border-transparent"
            >
              <p class="text-sm text-light-text dark:text-dark-light-text">
                Country
              </p>
              <h2 class="mt-1 font-bold">{{ coverage.country }}</h2>
              <p class="mt-3 text-sm text-light-text dark:text-dark-light-text">
                Network
              </p>
              <span class="text-2xl font-bold text-primary">
                {{ coverage.networkcount }}
              </span>
            </li>
          </ul>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Coverage, CoverageRes } from '@/types'

// config
const { BASE_URL } = useRuntimeConfig().public

const coverages = useState<Coverage[] | null>('coverages', () => null)

if (!coverages.value) {
  const { data, error } = await useFetch<CoverageRes>('coverage-prices', {
    baseURL: BASE_URL,
  })

  if (data.value?.status === 1) {
    coverages.value = data.value?.data
  }

  if (error.value) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Error fetching coverages',
    })
  }
}

useHead({
  title: 'Multitexter BulkSMS - Coverage',
})
</script>
