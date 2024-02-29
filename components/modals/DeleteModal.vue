<template>
  <UiModal ref="modal" :is-blocking="true" @close="closeModal()">
    <div class="flex flex-col items-center justify-center">
      <AlertIcon class="text-red-500 size-24" />
      <h2 class="mt-6 font-bold">{{ title }}</h2>
      <p
        v-if="description"
        class="mt-2 text-sm text-center text-light-text dark:text-dark-light-text"
      >
        {{ description }}
      </p>
      <div class="flex items-center gap-3 mt-6">
        <UiButton :disabled="isLoading" class="flex" @click="proceed">
          <SpinLoader v-show="isLoading" class="mr-2" />
          {{ isLoading ? 'Please wait' : 'Yes' }}
        </UiButton>
        <UiButton variant="outline" :disabled="isLoading" @click="closeModal">
          Cancel
        </UiButton>
      </div>
    </div>
  </UiModal>
</template>

<script setup lang="ts">
import UiModal from '@/components/ui/modal/UiModal.vue'
import AlertIcon from '@/assets/icons/alert.svg?component'

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    isLoading: boolean
  }>(),
  {
    title: 'Are you sure you want to delete?',
    description: '',
  },
)

const emit = defineEmits(['onDeleted'])

const loading = toRef(props, 'isLoading')

watch(loading, (val) => {
  if (!val) {
    closeModal()
  }
})

function proceed() {
  emit('onDeleted')
}

// Modal
const modal = ref<InstanceType<typeof UiModal> | null>(null)

function open() {
  modal.value?.open()
}
function closeModal() {
  modal.value?.close()
}

defineExpose({
  open,
  closeModal,
})
</script>
