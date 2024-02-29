<template>
  <UiModal ref="modal" :is-blocking="true" @close="closeModal()">
    <h2 class="text-lg font-bold">Request New ID</h2>
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
          placeholder="E.g. Multitexter (Ensure your ID is not more than 11 characters)"
          maxlength="11"
        />
        <FormError v-show="errors.senderName" :message="errors.senderName" />
      </div>
      <div class="mt-5">
        <UiLabel for="companyName">Company name</UiLabel>
        <input
          id="companyName"
          v-model="companyName"
          type="text"
          name="companyName"
          class="form-input-field"
          :class="{
            'focus-visible:ring-red-500': errors.companyName,
          }"
        />
        <FormError v-show="errors.companyName" :message="errors.companyName" />
      </div>
      <div class="mt-5">
        <UiLabel for="cacNumber">CAC Number (Optional)</UiLabel>
        <input
          id="cacNumber"
          v-model="cacNumber"
          type="text"
          name="cacNumber"
          class="form-input-field"
        />
      </div>
      <div class="mt-5">
        <UiLabel for="businessNature">Business nature</UiLabel>
        <input
          id="businessNature"
          v-model="businessNature"
          type="text"
          name="businessNature"
          class="form-input-field"
          :class="{
            'focus-visible:ring-red-500': errors.businessNature,
          }"
        />
        <FormError
          v-show="errors.businessNature"
          :message="errors.businessNature"
        />
      </div>
      <div class="mt-5">
        <UiLabel for="description">Description of service</UiLabel>
        <textarea
          id="description"
          v-model="description"
          type="text"
          name="description"
          class="form-input-field"
          :rows="3"
          :class="{
            'focus-visible:ring-red-500': errors.description,
          }"
        />
        <FormError v-show="errors.description" :message="errors.description" />
      </div>
      <div class="mt-5">
        <UiLabel for="sampleMessage">Sample message</UiLabel>
        <textarea
          id="sampleMessage"
          v-model="sampleMessage"
          type="text"
          name="sampleMessage"
          class="form-input-field"
          :rows="3"
          :class="{
            'focus-visible:ring-red-500': errors.sampleMessage,
          }"
        />
        <FormError
          v-show="errors.sampleMessage"
          :message="errors.sampleMessage"
        />
      </div>
      <p
        class="mt-3 text-xs leading-relaxed text-light-text dark:text-dark-light-text"
      >
        <b>NB</b>: Sender IDs are approved only on weekdays. If you need to try
        out the sms feature during weekends without an approved ID, please make
        use of any of our default ID
      </p>
      <UiButton type="submit" :disabled="disabled" class="w-full mt-8">
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

const emit = defineEmits(['onSenderIdCreated'])

const { $toast } = useNuxtApp()

// Reusable composable not related to this page
const { api } = useApi()

const schema = Yup.object().shape({
  senderName: Yup.string().required().label('Sender name').trim().max(11),
  companyName: Yup.string().required().label('Company name').trim(),
  cacNumber: Yup.string().label('CAC').trim(),
  businessNature: Yup.string().required().label('Business nature').trim(),
  description: Yup.string().required().label('Description').trim(),
  sampleMessage: Yup.string().required().label('Sample message').trim(),
})
const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    senderName: '',
    companyName: '',
    cacNumber: '',
    businessNature: '',
    description: '',
    sampleMessage: '',
  },
})
const { value: senderName } = useField<string>('senderName')
const { value: companyName } = useField<string>('companyName')
const { value: cacNumber } = useField<string>('cacNumber')
const { value: businessNature } = useField<string>('businessNature')
const { value: description } = useField<string>('description')
const { value: sampleMessage } = useField<string>('sampleMessage')
const loading = ref(false)

const disabled = computed(() => {
  if (loading.value) {
    return true
  } else {
    return !!(
      senderName.value === '' ||
      companyName.value === '' ||
      businessNature.value === '' ||
      description.value === '' ||
      sampleMessage.value === '' ||
      errors.value.senderName ||
      errors.value.companyName ||
      errors.value.businessNature ||
      errors.value.description ||
      errors.value.sampleMessage
    )
  }
})

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  try {
    loading.value = true
    const response = await api.misc.createSenderId({
      senderName: values.senderName,
      companyName: values.companyName,
      cacNumber: values.cacNumber,
      businessNature: values.businessNature,
      serviceDescription: values.description,
      sampleMessage: values.sampleMessage,
    })
    if (response.status === 1) {
      $toast.fire({
        icon: 'success',
        title: response.msg,
      })
      resetForm({
        values: {
          senderName: '',
          companyName: '',
          cacNumber: '',
          businessNature: '',
          description: '',
          sampleMessage: '',
        },
      })
      emit('onSenderIdCreated')
      closeModal()
    } else {
      $toast.fire({
        icon: 'error',
        title: response.msg,
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
