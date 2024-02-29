<template>
  <UiModal ref="modal" :is-blocking="true" @close="closeModal()">
    <h2 class="text-lg font-bold">Summary</h2>
    <div v-if="birthday" class="grid grid-cols-2 gap-5 mt-5">
      <div>
        <h3 class="mb-1 text-sm text-light-text dark:text-dark-light-text">
          Status
        </h3>
        <span
          class="pill"
          :class="[
            birthday.status.toLowerCase() === 'active'
              ? 'pill-success'
              : 'pill-danger',
          ]"
        >
          {{ birthday.status }}
        </span>
      </div>
      <div>
        <h3 class="text-sm text-light-text dark:text-dark-light-text">
          Sender name
        </h3>
        <p class="mt-1 font-bold">{{ birthday.sender }}</p>
      </div>
      <div>
        <h3 class="text-sm text-light-text dark:text-dark-light-text">
          Recipient name
        </h3>
        <p class="mt-1 font-bold">
          {{ birthday.username }}
        </p>
      </div>
      <div>
        <h3 class="text-sm text-light-text dark:text-dark-light-text">
          Recipient Phone number
        </h3>
        <p class="mt-1 font-bold">{{ birthday.destination }} unit</p>
      </div>
      <div>
        <h3 class="text-sm text-light-text dark:text-dark-light-text">
          Birth date
        </h3>
        <p class="mt-1 font-bold">
          {{ useDateFormat(birthday.birthday, 'ddd MMMM Do, YYYY').value }}
        </p>
      </div>
      <div>
        <h3 class="text-sm text-light-text dark:text-dark-light-text">
          Total sent
        </h3>
        <p class="mt-1 font-bold">
          {{ formatNumberWithComma(birthday.total_sent) }}
        </p>
      </div>
      <div>
        <h3 class="text-sm text-light-text dark:text-dark-light-text">
          Last sent
        </h3>
        <p class="mt-1 font-bold">
          {{
            birthday.last_sent
              ? useDateFormat(birthday.last_sent, 'ddd MMMM Do, YYYY HH:mm a')
                  .value
              : '----'
          }}
        </p>
      </div>
      <div>
        <h3 class="text-sm text-light-text dark:text-dark-light-text">
          Next sent
        </h3>
        <p class="mt-1 font-bold">
          {{
            useDateFormat(birthday.next_sent, 'ddd MMMM Do, YYYY HH:mm a').value
          }}
        </p>
      </div>
      <div class="col-span-2">
        <h3 class="text-sm text-light-text dark:text-dark-light-text">
          Message
        </h3>
        <p class="mt-1 text-sm font-bold leading-loose">
          {{ birthday.content }}
        </p>
      </div>
    </div>
  </UiModal>
</template>

<script setup lang="ts">
import UiModal from '@/components/ui/modal/UiModal.vue'
import type { Birthday } from '@/types/birthday'

defineProps<{
  birthday: Birthday | null
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
