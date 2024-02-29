<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div
      class="container flex flex-col items-center justify-center mx-auto md:w-3/4"
    >
      <ExclamationIcon class="text-red-500 size-24" />
      <h1
        class="mt-8 text-3xl font-bold text-center md:text-5xl font-Unbounded"
      >
        OOPS! An Error Occurred
      </h1>
      <p
        class="max-w-xl mt-5 text-center md:text-lg text-light-text dark:text-dark-light-text"
      >
        An error has occurred and we're working to fix the problem! We'll be up
        and running shortly.
      </p>
      <p
        class="max-w-xl mt-5 text-center md:text-lg text-light-text dark:text-dark-secondary-text"
      >
        {{ error?.message }}
      </p>
      <a
        href="#"
        class="flex items-center justify-center px-6 py-3 mt-10 text-sm font-bold text-white rounded bg-primary hover:bg-primary-dark shadow-btn"
        @click="handleError"
      >
        Go Home
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import ExclamationIcon from '@/assets/icons/exclamation.svg?component'

definePageMeta({
  layout: 'secondary',
})

const error = useError()

async function handleError() {
  await clearError({
    redirect: '/',
  })
}
</script>
