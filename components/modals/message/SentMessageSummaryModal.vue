<template>
  <UiModal ref="modal" :is-blocking="true" @close="closeModal()">
    <h2 class="text-lg font-bold">Summary</h2>
    <div v-if="message" class="grid grid-cols-2 gap-5 mt-5">
      <div>
        <h3 class="text-sm text-light-text dark:text-dark-light-text">
          Status
        </h3>
        <p class="mt-1 font-bold">{{ message.status }}</p>
      </div>
      <div>
        <h3 class="text-sm text-light-text dark:text-dark-light-text">
          Sender name
        </h3>
        <p class="mt-1 font-bold">{{ message.sender_name }}</p>
      </div>
      <div>
        <h3 class="text-sm text-light-text dark:text-dark-light-text">
          Date sent
        </h3>
        <p class="mt-1 font-bold">
          {{
            useDateFormat(message.disptachtime, 'ddd MMMM Do, YYYY HH:mm a')
              .value
          }}
        </p>
      </div>
      <div>
        <h3 class="text-sm text-light-text dark:text-dark-light-text">
          Unit charge
        </h3>
        <p class="mt-1 font-bold">
          {{ formatNumberWithComma(message.unit_charge) }} unit
        </p>
      </div>
      <div>
        <h3 class="text-sm text-light-text dark:text-dark-light-text">
          Volume
        </h3>
        <p class="mt-1 font-bold">
          {{ formatNumberWithComma(message.volume) }}
        </p>
      </div>
      <div>
        <h3 class="text-sm text-light-text dark:text-dark-light-text">
          Priority
        </h3>
        <p class="mt-1 font-bold">
          {{ message.priority === 1 ? 'Yes' : 'No' }}
        </p>
      </div>
      <div class="col-span-2">
        <h3 class="text-sm text-light-text dark:text-dark-light-text">
          Recipient
        </h3>
        <p class="mt-1 font-bold">{{ message.recipient }}</p>
      </div>
      <div class="col-span-2">
        <h3 class="text-sm text-light-text dark:text-dark-light-text">
          Message
        </h3>
        <p class="mt-1 text-sm font-bold leading-loose">
          {{ message.content }}
        </p>
      </div>
    </div>
  </UiModal>
</template>

<script setup lang="ts">
import UiModal from '@/components/ui/modal/UiModal.vue'
import type { Sent } from '@/types/message'

defineProps<{
  message: Sent | null
}>()

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
