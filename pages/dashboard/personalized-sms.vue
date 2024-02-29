<template>
  <div class="py-6">
    <div class="container">
      <div class="max-w-xl mx-auto">
        <h1 class="text-2xl font-bold text-center">
          Upload Personalized Template
        </h1>
        <p
          class="mt-1 text-sm text-center text-light-text dark:text-dark-light-text"
        >
          Select a <b class="text-primary">CSV</b> file, Each line should
          contain ( <b class="text-primary">PHONE NUMBER</b>,
          <b class="text-primary">MESSAGES</b> )
        </p>
        <div class="flex justify-center mt-5">
          <a
            class="flex items-center py-3 border-4 border-dotted shadow-none btn-outline"
            href="/Personalized_format.csv"
            target="_blank"
            download
          >
            Download Template
            <DownloadIcon class="ml-2 size-4" />
          </a>
        </div>
        <PersonalizedForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DownloadIcon from '@/assets/icons/download.svg?component'

const appStore = useAppStore()

appStore.setPageTitle('Personalized SMS')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Personalized Messages',
})
</script>
