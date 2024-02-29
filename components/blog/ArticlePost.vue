<template>
  <div
    class="h-full overflow-hidden bg-white border rounded-lg dark:bg-dark-secondary border-grey dark:border-transparent shadow-custom"
  >
    <img
      class="object-cover w-full"
      src="/multitexter.jpg"
      :alt="article.title"
    />
    <div class="p-5 min-h-[120px]">
      <h2 class="font-bold">{{ article.title }}</h2>
      <button
        class="mt-3 btn-outline shadow-btn"
        @click="$router.push(`/blog/${article.slug}`)"
      >
        Read more
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Article } from '@/types'

defineProps<{
  article: Article
}>()
</script>
