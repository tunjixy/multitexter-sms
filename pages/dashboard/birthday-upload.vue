<template>
  <div class="py-6">
    <div class="container">
      <GoBack @back="$router.go(-1)" />
      <div class="max-w-xl mx-auto">
        <h1 class="text-2xl font-bold text-center">Upload Birthday Template</h1>
        <p
          class="mt-1 text-sm text-center text-light-text dark:text-dark-light-text"
        >
          Select a <b class="text-primary">CSV</b> file, Each line should
          contain ( <b class="text-primary">NAME</b>,
          <b class="text-primary">PHONE NUMBER</b>,
          <b class="text-primary">BIRTHDAY</b> )
        </p>
        <div class="flex justify-center mt-5">
          <a
            class="flex items-center py-3 border-4 border-dotted btn-outline"
            href="/birthday_upload_format.csv"
            target="_blank"
            download
          >
            Download Format
            <DownloadIcon class="ml-2 size-4" />
          </a>
        </div>
        <form class="mt-10" @submit.prevent="onSubmit">
          <UiFileSelect v-model="template">
            <p class="text-sm text-center">
              Upload your birthday <b class="text-primary">CSV</b> file here
            </p>
          </UiFileSelect>
          <div class="mt-5">
            <UiLabel for="senderName">Sender name</UiLabel>
            <input
              id="senderName"
              v-model="senderName"
              type="text"
              name="senderName"
              class="form-input-field"
              :class="{
                'focus-visible:ring-red-500': errors.senderName,
              }"
              maxlength="11"
            />
            <FormError
              v-show="errors.senderName"
              :message="errors.senderName"
            />
          </div>
          <div class="mt-5">
            <UiLabel for="time">What time should the SMS be sent?</UiLabel>
            <DatePicker
              v-model:value="time"
              input-class="cursor-pointer form-input-field text-dark-text dark:text-white"
              value-type="format"
              type="time"
              :show-second="false"
            />
            <FormError v-show="errors.time" :message="errors.time" />
          </div>
          <UiButton
            type="submit"
            :disabled="disabled"
            class="flex mt-8 ml-auto shadow-btn"
          >
            <SpinLoader v-show="loading" class="mr-2" />
            {{ loading ? 'Please wait' : 'Submit' }}
          </UiButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Yup from 'yup'
import { useField, useForm } from 'vee-validate'
import DownloadIcon from '@/assets/icons/download.svg?component'

// Reusable composable not related to this page
const appStore = useAppStore()
const { $toast } = useNuxtApp()
const { api } = useApi()

const schema = Yup.object().shape({
  senderName: Yup.string().required().label('Sender name').trim(),
  time: Yup.string().required().label('Time'),
})
const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    senderName: '',
    time: '',
  },
})
const { value: senderName } = useField<string>('senderName')
const { value: time } = useField<string>('time')
const template = ref<File | null>(null)
const loading = ref(false)

const disabled = computed(() => {
  if (loading.value) {
    return true
  } else {
    return !!(
      senderName.value === '' ||
      time.value === '' ||
      template.value === null ||
      errors.value.senderName ||
      errors.value.time
    )
  }
})

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  try {
    loading.value = true
    const formData = new FormData()
    formData.append('birthday', template.value as any)
    formData.append('displayname', values.senderName)
    formData.append('send_time', values.time)

    const response = await api.birthday.uploadBirthday(formData)
    if (response.status === 1) {
      $toast.fire({
        icon: 'success',
        title: response.msg,
      })
      resetForm({
        values: {
          senderName: '',
          time: '',
        },
      })
      template.value = null
    } else {
      $toast.fire({
        icon: 'error',
        title: response.msg || 'Error uploading birthday template',
      })
    }
    loading.value = false
  } catch (err: any) {
    loading.value = false
    $toast.fire({
      icon: 'error',
      title: formatErrorResponse(err),
    })
  }
})

appStore.setPageTitle('Birthday')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Birthday',
})
</script>
