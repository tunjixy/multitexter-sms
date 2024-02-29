<template>
  <div class="relative">
    <UiLabel v-if="label" for="search">{{ label }}</UiLabel>
    <input
      id="search"
      ref="searchRef"
      :value="modelValue"
      class="form-input-field"
      type="text"
      placeholder="Enter your sender name"
      maxlength="11"
      @input="handleInput"
    />
    <TransitionExpand>
      <ul
        v-show="filteredOptions.length && isOpen"
        :class="[filteredOptions.length >= 10 ? 'h-48' : 'h-auto']"
        class="divide-y-[1px] divide-grey/5 overflow-y-auto bg-white rounded-b-lg dark:bg-dark-secondary shadow-custom scrollbar-thin scrollbar-track-grey/5 scrollbar-thumb-grey dark:scrollbar-thumb-grey/10"
      >
        <li
          v-for="(option, i) in filteredOptions"
          :key="i"
          class="px-4 py-2 text-sm cursor-pointer hover:bg-grey/5 hover:text-primary"
          @click="setResult(option)"
        >
          {{ option }}
        </li>
      </ul>
    </TransitionExpand>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    label?: string
    options: string[]
  }>(),
  {
    label: '',
  },
)

const modelValue = defineModel<string>()

const searchTerm = ref('')
const isOpen = ref(false)
const searchRef = ref<HTMLInputElement | null>(null)

onClickOutside(searchRef, () => {
  isOpen.value = false
})

const filteredOptions = computed(() => {
  if (searchTerm.value === '') {
    return []
  }

  return props.options
    .filter((option) => {
      return option.toLowerCase().startsWith(searchTerm.value.toLowerCase())
    })
    .slice(0, 10)
})

function handleInput(event: Event) {
  searchTerm.value = (event.target as HTMLInputElement).value
  modelValue.value = (event.target as HTMLInputElement).value
  isOpen.value = true
}
function setResult(option: string) {
  searchTerm.value = option
  modelValue.value = option
  isOpen.value = false
}
</script>
