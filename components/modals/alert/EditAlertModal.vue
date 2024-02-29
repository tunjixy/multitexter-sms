<template>
  <UiModal ref="modal" :is-blocking="true" @close="closeModal()">
    <h2 class="text-lg font-bold">Edit Alert</h2>
    <form class="mt-5" @submit.prevent="onSubmit">
      <div>
        <UiLabel for="smsFrequency">SMS Frequency (Interval in Days)</UiLabel>
        <input
          id="smsFrequency"
          v-model="smsFrequency"
          type="text"
          name="smsFrequency"
          class="form-input-field"
          :class="{
            'focus-visible:ring-red-500': errors.smsFrequency,
          }"
          @keypress="isNumber"
        />
        <FormError
          v-show="errors.smsFrequency"
          :message="errors.smsFrequency"
        />
      </div>
      <div class="mt-3">
        <UiLabel for="smsRecipients">SMS Recipients</UiLabel>
        <input
          id="smsRecipients"
          v-model="smsRecipients"
          type="text"
          name="smsRecipients"
          class="form-input-field"
          :class="{
            'focus-visible:ring-red-500': errors.smsRecipients,
          }"
        />
        <FormError
          v-show="errors.smsRecipients"
          :message="errors.smsRecipients"
        />
      </div>
      <div class="mt-3">
        <UiLabel for="emailFrequency">Email frequency</UiLabel>
        <input
          id="emailFrequency"
          v-model="emailFrequency"
          type="text"
          name="emailFrequency"
          class="form-input-field"
          :class="{
            'focus-visible:ring-red-500': errors.emailFrequency,
          }"
          @keypress="isNumber"
        />
        <FormError
          v-show="errors.emailFrequency"
          :message="errors.emailFrequency"
        />
      </div>
      <div class="mt-3">
        <UiLabel for="emailRecipient">Email recipient</UiLabel>
        <input
          id="emailRecipient"
          v-model="emailRecipient"
          type="text"
          name="emailRecipient"
          class="form-input-field"
          :class="{
            'focus-visible:ring-red-500': errors.emailRecipient,
          }"
        />
        <FormError
          v-show="errors.emailRecipient"
          :message="errors.emailRecipient"
        />
      </div>
      <div class="mt-3">
        <UiLabel for="balanceThreshold">Balance threshold</UiLabel>
        <input
          id="balanceThreshold"
          v-model="balanceThreshold"
          type="text"
          name="balanceThreshold"
          class="form-input-field"
          :class="{
            'focus-visible:ring-red-500': errors.balanceThreshold,
          }"
          @keypress="isNumber"
        />
        <FormError
          v-show="errors.balanceThreshold"
          :message="errors.balanceThreshold"
        />
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
import type { Alert } from '@/types/alert'
import UiModal from '@/components/ui/modal/UiModal.vue'

const props = defineProps<{
  alert: Alert
}>()

const emit = defineEmits(['onAlertUpdated'])

const { $toast } = useNuxtApp()

// Reuseable function not specific to this component
const { api } = useApi()

const schema = Yup.object().shape({
  smsFrequency: Yup.number().required().label('SMS frequency'),
  smsRecipients: Yup.string().required().label('SMS Recipients').trim(),
  emailFrequency: Yup.number().required().label('Email frequency'),
  emailRecipient: Yup.string().required().label('Email recipient').trim(),
  balanceThreshold: Yup.number().required().label('Balance threshold'),
})
const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    smsFrequency: 0,
    smsRecipients: '',
    emailFrequency: 0,
    emailRecipient: '',
    balanceThreshold: 0,
  },
})
const { value: smsFrequency } = useField<number>('smsFrequency')
const { value: smsRecipients } = useField<string>('smsRecipients')
const { value: emailFrequency } = useField<number>('emailFrequency')
const { value: emailRecipient } = useField<string>('emailRecipient')
const { value: balanceThreshold } = useField<number>('balanceThreshold')
const loading = ref(false)

watchEffect(() => {
  smsFrequency.value = props.alert.sms_frequency
  smsRecipients.value = props.alert.sms_to
  emailFrequency.value = props.alert.email_frequency
  emailRecipient.value = props.alert.email_to
  balanceThreshold.value = props.alert.low_balance_threshold
})

watch(smsFrequency, (val) => {
  replaceZero(val, smsFrequency)
})
watch(emailFrequency, (val) => {
  replaceZero(val, emailFrequency)
})
watch(balanceThreshold, (val) => {
  replaceZero(val, balanceThreshold)
})

function replaceZero(value: number, field: Ref) {
  if (!value) {
    field.value = 0
  } else if (field.value.toString().startsWith('0')) {
    const num = value.toString().replace('0', '')
    field.value = Number(num)
  }
}
const disabled = computed(() => {
  if (loading.value) {
    return true
  } else {
    return !!(
      smsFrequency.value === 0 ||
      smsRecipients.value === '' ||
      emailFrequency.value === 0 ||
      emailRecipient.value === '' ||
      balanceThreshold.value === 0 ||
      errors.value.smsFrequency ||
      errors.value.smsRecipients ||
      errors.value.emailFrequency ||
      errors.value.emailRecipient ||
      errors.value.balanceThreshold
    )
  }
})

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true
    const response = await api.alert.editAlert({
      sms_frequency: values.smsFrequency,
      sms_recipients: values.smsRecipients,
      email_frequency: values.emailFrequency,
      email_recipients: values.emailRecipient,
      balance_threshold: values.balanceThreshold,
    })
    if (response.status === 1) {
      emit('onAlertUpdated')
      $toast.fire({
        icon: 'success',
        title: response.msg,
      })
      closeModal()
    } else {
      $toast.fire({
        icon: 'error',
        title: response.msg || 'Error updating alert',
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
})

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
