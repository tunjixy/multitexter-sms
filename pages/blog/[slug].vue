<template>
  <div>
    <section class="pt-24 pb-16">
      <div class="container">
        <template v-if="article">
          <h1
            class="max-w-2xl mx-auto text-3xl font-bold text-center text-pretty"
          >
            {{ article.title }}
          </h1>
          <div class="mt-8 overflow-hidden rounded-lg">
            <NuxtImg
              class="object-cover w-full h-full lg:h-[500px]"
              src="/multitexter.jpg"
              :alt="article.title"
              placeholder
            />
          </div>
          <article
            class="w-full max-w-3xl mx-auto mt-10 prose prose-a:text-primary"
            v-html="article?.content"
          />
        </template>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Article, ArticleRes } from '@/types'

const { slug } = useRoute<'slug'>().params

// config
const { BASE_URL } = useRuntimeConfig().public

const article = useState<Article | null>('article', () => null)

const { data, error } = await useFetch<ArticleRes>(`blog/${slug}`, {
  baseURL: BASE_URL,
})

if (data.value?.status === 1) {
  article.value = data.value?.data
}

if (error.value) {
  throw createError({
    statusCode: 400,
    statusMessage: 'Error fetching article',
  })
}
</script>

<style>
.prose h1,
h2,
h3,
h4,
h5,
h6,
p,
strong,
span {
  @apply text-dark-text dark:text-white font-Hanken;
}
.prose p span,
ol li span {
  @apply bg-transparent text-dark-text dark:text-white !important;
}
.prose u strong span a span {
  @apply text-primary !important;
}
</style>
