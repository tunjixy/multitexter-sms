<template>
  <div class="py-6">
    <div class="container">
      <div class="max-w-xl mx-auto">
        <form
          class="px-8 py-6 mt-3 bg-white border rounded-lg dark:bg-dark-secondary border-grey dark:border-transparent shadow-custom"
        >
          <div>
            <UiLabel for="startDate">Date From</UiLabel>
            <DatePicker
              v-model:value="startDate"
              input-class="cursor-pointer form-input-field text-dark-text dark:text-white"
              value-type="format"
              format="YYYY-MM-DD"
              type="date"
            />
            <FormError v-show="errors.startDate" :message="errors.startDate" />
          </div>
          <div class="mt-5">
            <UiLabel for="endDate">Date To</UiLabel>
            <DatePicker
              v-model:value="endDate"
              input-class="cursor-pointer form-input-field text-dark-text dark:text-white"
              value-type="format"
              format="YYYY-MM-DD"
              type="date"
              :disabled-date="notBeforeToday"
            />
            <FormError v-show="errors.endDate" :message="errors.endDate" />
          </div>
          <div class="mt-5">
            <UiLabel for="senderName">Sender Name</UiLabel>
            <input
              id="senderName"
              v-model="senderName"
              type="text"
              name="senderName"
              class="form-input-field"
            />
          </div>
          <div class="mt-5">
            <UiLabel for="status">Status</UiLabel>
            <UiSelect v-model="status" name="status">
              <SelectTrigger>
                <SelectValue placeholder="Choose delivery status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel
                    class="text-light-text dark:text-dark-light-text"
                  >
                    Download status
                  </SelectLabel>
                  <SelectItem
                    v-for="item in downloadStatus"
                    :key="item.value"
                    :value="item.value.toString()"
                  >
                    {{ item.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </UiSelect>
            <FormError v-show="errors.status" :message="errors.status" />
          </div>
          <DownloadExcel
            class="flex items-center justify-center py-3 mt-8 cursor-pointer btn-primary"
            :class="{
              'cursor-not-allowed pointer-events-none opacity-30': disabled,
            }"
            :fetch="fetchReports"
            :data="jsonData"
            :fields="jsonFields"
            type="xlsx"
            name="report.xlsx"
            :before-generate="startDownload"
            :before-finish="finishDownload"
          >
            <SpinLoader v-show="loading" class="mr-2" />
            {{ loading ? 'Please wait' : 'Download Report' }}
          </DownloadExcel>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Yup from 'yup'
import { useField, useForm } from 'vee-validate'
import type { DownloadReport } from '@/types/report'

// Reusable composable not related to this page
const { api } = useApi()
const appStore = useAppStore()
const { $toast } = useNuxtApp()

const schema = Yup.object().shape({
  startDate: Yup.string().required().label('Start date').trim(),
  endDate: Yup.string().required().label('End date').trim(),
  senderName: Yup.string().label('Sender name').trim(),
  status: Yup.string().label('Status').trim(),
})
const { errors, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    startDate: '',
    endDate: '',
    senderName: '',
    status: '',
  },
})
const { value: startDate } = useField<string>('startDate')
const { value: endDate } = useField<string>('endDate')
const { value: senderName } = useField<string>('senderName')
const { value: status } = useField<string>('status')
const downloadStatus = [
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
const jsonFields = {
  Id: 'remotemsgid',
  Recipient: 'recipient',
  Message: 'content',
  Type: 'type',
  Length: 'length',
  'Sender Name': 'sender_name',
  Country: 'country',
  Status: 'status',
  'Date Sent': 'dispatchtime',
}
const jsonData = ref<DownloadReport | null>(null)
const loading = ref(false)

const disabled = computed(() => {
  if (loading.value) {
    return true
  } else {
    return !!(
      startDate.value === '' ||
      endDate.value === '' ||
      errors.value.startDate ||
      errors.value.endDate
    )
  }
})

function notBeforeToday(date: Date) {
  return date > new Date(new Date().setHours(0, 0, 0, 0))
}
function startDownload() {
  loading.value = true
}
function finishDownload() {
  loading.value = false
  resetForm({
    values: {
      startDate: '',
      endDate: '',
      senderName: '',
      status: '',
    },
  })
}
async function fetchReports() {
  if (startDate.value === '' && endDate.value === '') {
    $toast.fire({
      icon: 'error',
      title: 'Please select a start and end date',
    })
  } else {
    try {
      const response = await api.report.downloadReport({
        startDate: startDate.value,
        endDate: endDate.value,
        senderName: senderName.value,
        status: status.value,
      })
      if (response.status === 0) {
        $toast.fire({
          icon: 'success',
          title: response.msg,
        })
      } else if (response.status === 1) {
        return response.data
      } else if (response.status === 2) {
        $toast.fire({
          icon: 'success',
          title: response.msg,
        })
      } else {
        $toast.fire({
          icon: 'error',
          title: response.msg,
        })
      }
    } catch (err: any) {
      $toast.fire({
        icon: 'error',
        title: formatErrorResponse(err),
      })
    }
  }
}

appStore.setPageTitle('Download Report')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Download Report',
})
</script>
