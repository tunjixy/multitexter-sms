<template>
  <div class="mt-10">
    <h2 class="text-lg font-bold">Filter Reports</h2>
    <div class="flex flex-wrap gap-5 mt-3">
      <div class="w-full sm:w-auto">
        <UiLabel for="senderName">Sender name</UiLabel>
        <input
          id="senderName"
          v-model="senderName"
          type="text"
          name="senderName"
          class="form-input-field"
        />
      </div>
      <div class="w-full sm:w-auto">
        <UiLabel for="recipient">Recipient</UiLabel>
        <input
          id="recipient"
          v-model="recipient"
          type="text"
          name="recipient"
          class="form-input-field"
        />
      </div>
      <div class="w-full sm:w-auto">
        <UiLabel for="startDate">Start date</UiLabel>
        <DatePicker
          v-model:value="startDate"
          input-class="cursor-pointer form-input-field text-dark-text dark:text-white"
          value-type="format"
          format="YYYY-MM-DD"
          type="date"
        />
      </div>
      <div class="w-full sm:w-auto">
        <UiLabel for="startDate">End date</UiLabel>
        <DatePicker
          v-model:value="endDate"
          input-class="cursor-pointer form-input-field text-dark-text dark:text-white"
          value-type="format"
          format="YYYY-MM-DD"
          type="date"
        />
      </div>
      <div class="w-full sm:w-auto">
        <UiLabel for="status">Status</UiLabel>
        <UiSelect v-model="status" name="status">
          <SelectTrigger>
            <SelectValue placeholder="Choose delivery status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel class="text-light-text dark:text-dark-light-text">
                Delivery status
              </SelectLabel>
              <SelectItem
                v-for="item in deliveryStatus"
                :key="item.value"
                :value="item.value.toString()"
              >
                {{ item.name }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </UiSelect>
      </div>
    </div>
    <UiButton
      v-if="hasFilterParams"
      :disabled="loading"
      class="flex mt-5 ml-auto"
      @click="filterReport"
    >
      <SpinLoader v-show="loading" class="mr-2" />
      {{ loading ? 'Please wait' : 'Filter' }}
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import type { FilterDeliveryReportReq } from '@/types/report'

const emit = defineEmits<{
  onFilterReport: [payload: FilterDeliveryReportReq]
  onFilterParam: [value: boolean]
}>()

// Reusable composable related to this component
const { loading } = useReport()

const senderName = ref('')
const recipient = ref('')
const startDate = ref('')
const endDate = ref('')
const deliveryStatus = [
  {
    name: 'Delivered',
    value: 1,
  },
  {
    name: 'Sent',
    value: 2,
  },
  {
    name: 'DeliveredPP',
    value: 18,
  },
]
const status = ref('')

const hasFilterParams = computed(() => {
  if (
    senderName.value ||
    recipient.value ||
    startDate.value ||
    endDate.value ||
    status.value
  ) {
    return true
  }
  return false
})

watchEffect(() => {
  emit('onFilterParam', hasFilterParams.value)
})

function filterReport() {
  emit('onFilterReport', {
    endDate: endDate.value,
    startDate: startDate.value,
    recipient: recipient.value,
    sender: senderName.value,
    status: Number(status.value),
  })
}
</script>
