<template>
  <UiModal ref="modal" :is-blocking="true" @close="closeModal()">
    <div class="flex flex-col items-center justify-center">
      <AlertIcon class="text-yellow-500 size-24" />
      <h2 class="mt-6 font-bold">{{ title }}</h2>
      <p
        v-if="description"
        class="max-w-sm mt-2 text-sm text-center text-light-text dark:text-dark-light-text"
      >
        {{ description }}
      </p>
      <div class="flex items-center gap-3 mt-6">
        <UiButton :disabled="isLoading" class="flex" @click="proceed">
          <SpinLoader v-show="isLoading" class="mr-2" />
          {{ isLoading ? 'Please wait' : buttonText }}
        </UiButton>
        <UiButton :disabled="isLoading" variant="outline" @click="closeModal">
          No
        </UiButton>
      </div>
    </div>
  </UiModal>
</template>

<script setup lang="ts">
import UiModal from '@/components/ui/modal/UiModal.vue'
import AlertIcon from '@/assets/icons/alert.svg?component'

const props = defineProps<{
  title: string
  description?: string
  buttonText: string
  isLoading?: boolean
}>()
const emit = defineEmits(['onConfirm'])

const loading = toRef(props, 'isLoading')

watch(loading, (val) => {
  if (!val) {
    closeModal()
  }
})

async function proceed() {
  emit('onConfirm')
  await nextTick()
  if (!loading.value) {
    closeModal()
  }
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
