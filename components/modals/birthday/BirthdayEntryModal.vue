<template>
  <UiModal ref="modal" :is-blocking="true" @close="closeModal()">
    <h2 class="text-lg font-bold">
      {{ isEditing ? 'Edit Birthday' : 'Add Entry' }}
    </h2>
    <form class="mt-5" @submit.prevent="onSubmit">
      <div>
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
        <FormError v-show="errors.senderName" :message="errors.senderName" />
      </div>
      <div class="mt-5">
        <UiLabel for="recipientName">Recipient name</UiLabel>
        <input
          id="recipientName"
          v-model="recipientName"
          type="text"
          name="recipientName"
          class="form-input-field"
          :class="{
            'focus-visible:ring-red-500': errors.recipientName,
          }"
        />
        <FormError
          v-show="errors.recipientName"
          :message="errors.recipientName"
        />
      </div>
      <div class="mt-5">
        <UiLabel for="recipientPhoneNumber">Recipient phone number</UiLabel>
        <input
          id="recipientPhoneNumber"
          v-model="recipientPhoneNumber"
          type="text"
          name="recipientPhoneNumber"
          class="form-input-field"
          :class="{
            'focus-visible:ring-red-500': errors.recipientPhoneNumber,
          }"
        />
        <FormError
          v-show="errors.recipientPhoneNumber"
          :message="errors.recipientPhoneNumber"
        />
      </div>
      <div class="mt-5">
        <UiLabel for="recipientBirthDate">Recipient birth date</UiLabel>
        <DatePicker
          v-model:value="recipientBirthDate"
          input-class="cursor-pointer form-input-field text-dark-text dark:text-white"
          value-type="format"
          format="YYYY-MM-DD"
          type="date"
          :disabled-date="notBeforeToday"
        />
        <FormError
          v-show="errors.recipientBirthDate"
          :message="errors.recipientBirthDate"
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
      <div class="mt-5">
        <UiLabel for="message">Message</UiLabel>
        <textarea
          id="message"
          v-model="message"
          type="text"
          name="message"
          class="form-input-field"
          :class="{
            'focus-visible:ring-red-500': errors.message,
          }"
          rows="6"
        />
        <FormError v-show="errors.message" :message="errors.message" />
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
  </UiModal>
</template>

<script setup lang="ts">
import * as Yup from 'yup'
import { useField, useForm } from 'vee-validate'
import UiModal from '@/components/ui/modal/UiModal.vue'
import type { Birthday, BirthdayEntryReq } from '@/types/birthday'

const props = defineProps<{
  birthday?: Birthday | null
  entry?: BirthdayEntryReq | null
  isEditing: boolean
}>()

const emit = defineEmits<{
  onBirthdayUpdated: [void]
  onBirthdayEntry: [entry: BirthdayEntryReq]
  onBirthdayEntryEdited: [entry: BirthdayEntryReq]
}>()

const { $toast } = useNuxtApp()

// Reuseable function not specific to this component
const { api } = useApi()

const schema = Yup.object().shape({
  senderName: Yup.string().required().label('Sender name').trim(),
  recipientName: Yup.string().required().label('Recipient name').trim(),
  recipientPhoneNumber: Yup.string().required().label('Phone number'),
  recipientBirthDate: Yup.string().required().label('Birth date').trim(),
  time: Yup.string().required().label('Time'),
  message: Yup.string().required().label('Message'),
})
const { errors, handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    senderName: '',
    recipientName: '',
    recipientPhoneNumber: '',
    recipientBirthDate: '',
    time: '',
    message: '',
  },
})
const { value: senderName } = useField<string>('senderName')
const { value: recipientName } = useField<string>('recipientName')
const { value: recipientPhoneNumber } = useField<string>('recipientPhoneNumber')
const { value: recipientBirthDate } = useField<string>('recipientBirthDate')
const { value: time } = useField<string>('time')
const { value: message } = useField<string>('message')
const loading = ref(false)

watchEffect(() => {
  if (props.isEditing) {
    if (props.birthday) {
      senderName.value = props.birthday.sender
      recipientName.value = props.birthday.username
      recipientPhoneNumber.value = props.birthday.destination
      recipientBirthDate.value = props.birthday.birthday
      time.value = props.birthday.send_time
      message.value = props.birthday.content
    } else if (props.entry) {
      senderName.value = props.entry.displayName
      recipientName.value = props.entry.contactName
      recipientPhoneNumber.value = props.entry.phoneNumber
      recipientBirthDate.value = props.entry.birthday
      time.value = props.entry.sendTime
      message.value = props.entry.message
    }
  }
})

const disabled = computed(() => {
  if (loading.value) {
    return true
  } else {
    return !!(
      senderName.value === '' ||
      recipientName.value === '' ||
      recipientPhoneNumber.value === '' ||
      recipientBirthDate.value === '' ||
      time.value === '' ||
      message.value === '' ||
      errors.value.senderName ||
      errors.value.recipientName ||
      errors.value.recipientPhoneNumber ||
      errors.value.recipientBirthDate ||
      errors.value.time ||
      errors.value.message
    )
  }
})

function notBeforeToday(date: Date) {
  return date > new Date(new Date().setHours(0, 0, 0, 0))
}
const onSubmit = handleSubmit(async (values) => {
  if (!props.isEditing) {
    emit('onBirthdayEntry', {
      id: Math.random() * Math.random() * 1000,
      displayName: values.senderName,
      message: values.message,
      birthday: values.recipientBirthDate,
      sendTime: values.time,
      phoneNumber: values.recipientPhoneNumber,
      contactName: values.recipientName,
    })
    closeModal()
  } else if (props.isEditing && props.entry) {
    emit('onBirthdayEntryEdited', {
      id: props.entry.id,
      displayName: values.senderName,
      message: values.message,
      birthday: values.recipientBirthDate,
      sendTime: values.time,
      phoneNumber: values.recipientPhoneNumber,
      contactName: values.recipientName,
    })
    closeModal()
  } else {
    try {
      loading.value = true
      const response = await api.birthday.updateBirthday({
        id: props.birthday?.id as number,
        displayName: values.senderName,
        contactName: values.recipientName,
        phoneNumber: values.recipientPhoneNumber,
        birthday: values.recipientBirthDate,
        sendTime: values.time,
        message: values.message,
      })
      if (response.status === 1) {
        emit('onBirthdayUpdated')
        $toast.fire({
          icon: 'success',
          title: response.status,
        })
        closeModal()
      } else {
        $toast.fire({
          icon: 'error',
          title: response.msg || 'Error updating birthday',
        })
      }
      loading.value = false
    } catch (err: any) {
      $toast.fire({
        icon: 'error',
        title: formatErrorResponse(err),
      })
      loading.value = false
    }
  }
})

// Modal
const modal = ref<InstanceType<typeof UiModal> | null>(null)

function open() {
  modal.value?.open()
}
function closeModal() {
  resetForm({
    values: {
      senderName: '',
      recipientName: '',
      recipientPhoneNumber: '',
      recipientBirthDate: '',
      time: '',
      message: '',
    },
  })
  modal.value?.close()
}

defineExpose({
  open,
  closeModal,
})
</script>
