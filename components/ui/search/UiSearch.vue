<template>
  <div class="relative">
    <label class="sr-only" for="search">Search</label>
    <input
      v-model.trim="search"
      class="pl-12 pr-4 form-input-field"
      type="text"
      :placeholder="placeholder"
      name="search"
      autocomplete="off"
    />
    <SearchIcon class="absolute top-[15px] left-5 size-4" />
  </div>
</template>

<script setup lang="ts">
import SearchIcon from '@/assets/icons/search.svg?component'

withDefaults(
  defineProps<{
    placeholder?: string
  }>(),
  {
    placeholder: 'Search',
  },
)

const modelValue = defineModel<string>()

const search = ref('')

watchDebounced(
  search,
  () => {
    modelValue.value = search.value.toLowerCase()
  },
  { debounce: 1000, maxWait: 3000 },
)
</script>
