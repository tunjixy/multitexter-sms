<template>
  <div>
    <section class="pt-24">
      <div class="container">
        <h1
          class="text-3xl font-bold text-center md:text-4xl lg:text-5xl text-pretty"
        >
          Our Blog
        </h1>
      </div>
    </section>

    <section class="pt-24 pb-16">
      <div class="container">
        <template v-if="articles">
          <EmptyState v-if="articles.length === 0">
            No coverages available
          </EmptyState>
          <div
            v-else
            class="grid grid-cols-1 gap-5 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <nuxt-link
              v-for="article in articles"
              :key="article.id"
              :to="`/blog/${article.slug}`"
            >
              <ArticlePost :article="article" />
            </nuxt-link>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Article, ArticlesRes } from '@/types'

// config
const { BASE_URL } = useRuntimeConfig().public

const articles = useState<Article[] | null>('articles', () => null)

if (!articles.value) {
  const { data, error } = await useFetch<ArticlesRes>('blog?page=1', {
    baseURL: BASE_URL,
  })

  if (data.value?.status === 1) {
    articles.value = data.value?.data
  }

  if (error.value) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Error fetching articles',
    })
  }
}

/* function removeSlash(item: string) {
  return item.replaceAll(/\s+/g, '')
} */

useHead({
  title: 'Multitexter BulkSMS - Blog',
})
</script>
