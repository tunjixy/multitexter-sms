<template>
  <ul class="flex flex-wrap items-center justify-center gap-3 mt-5">
    <li class="inline-block">
      <button
        class="flex items-center justify-center btn-paginate"
        type="button"
        :disabled="isInFirstPage"
        @click="onClickPreviousPage"
      >
        <ChevronLeftIcon class="size-5" />
      </button>
    </li>
    <!-- Range of pages -->
    <li v-for="page in pages" :key="page.number" class="inline-block">
      <button
        type="button"
        class="btn-paginate"
        :class="{ 'bg-primary text-white': isPageActive(page.number) }"
        :disabled="page.isDisabled"
        @click="onClickPage(page.number)"
      >
        {{ page.number }}
      </button>
    </li>
    <li class="inline-block">
      <button
        class="flex items-center justify-center btn-paginate"
        type="button"
        :disabled="isInLastPage"
        @click="onClickNextPage"
      >
        <ChevronRightIcon class="size-5" />
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg?component'
import ChevronRightIcon from '@/assets/icons/chevron-right.svg?component'

const props = withDefaults(
  defineProps<{
    maxVisibleButtons: number
    total: number
    perPage: number
    currentPage: number
  }>(),
  {
    maxVisibleButtons: 5,
  },
)
const emit = defineEmits<{
  onPageChanged: [page: number]
}>()

const startPage = computed(() => {
  // When on the first page
  if (props.currentPage === 1) {
    return 1
  }
  // When on the last page
  if (props.currentPage === props.total) {
    return props.total
  }
  // When in between
  return props.currentPage - 1
})

const pages = computed(() => {
  const range = []
  for (
    let i = startPage.value;
    i <= Math.min(startPage.value + props.maxVisibleButtons - 1, props.total);
    i += 1
  ) {
    range.push({
      number: i,
      isDisabled: i === props.currentPage,
    })
  }
  return range
})
const isInFirstPage = computed(() => {
  return props.currentPage === 1
})
const isInLastPage = computed(() => {
  return props.currentPage === props.total
})

function onClickPreviousPage() {
  emit('onPageChanged', props.currentPage - 1)
}
function onClickPage(page: number) {
  emit('onPageChanged', page)
}
function onClickNextPage() {
  emit('onPageChanged', props.currentPage + 1)
}
function isPageActive(page: number) {
  return props.currentPage === page
}
</script>
