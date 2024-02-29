<template>
  <UiModal ref="modal" :is-blocking="true" @close="closeModal()">
    <h2 class="text-lg font-bold">Report Summary</h2>
    <div v-if="report" class="grid grid-cols-2 gap-5 mt-5">
      <div>
        <h3 class="text-sm text-light-text dark:text-dark-light-text">
          Status
        </h3>
        <p class="mt-1 font-bold">{{ report.status }}</p>
      </div>
      <div>
        <h3 class="text-sm text-light-text dark:text-dark-light-text">
          Sender name
        </h3>
        <p class="mt-1 font-bold">{{ report.sender_name }}</p>
      </div>
      <div>
        <h3 class="text-sm text-light-text dark:text-dark-light-text">
          Date sent
        </h3>
        <p class="mt-1 font-bold">
          {{
            useDateFormat(report.disptachtime, 'ddd MMMM Do, YYYY HH:mm a')
              .value
          }}
        </p>
      </div>
      <div>
        <h3 class="text-sm text-light-text dark:text-dark-light-text">
          Recipient
        </h3>
        <p class="mt-1 font-bold">{{ report.recipient }}</p>
      </div>
      <div class="col-span-2">
        <h3 class="text-sm text-light-text dark:text-dark-light-text">
          Message
        </h3>
        <p class="mt-1 text-sm font-bold leading-loose">{{ report.content }}</p>
      </div>
    </div>
  </UiModal>
</template>

<script setup lang="ts">
import UiModal from '@/components/ui/modal/UiModal.vue'
import type { DeliveryReport } from '@/types/report'

defineProps<{
  report: DeliveryReport | null
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
