<template>
  <UiModal ref="modal" @close="closeModal()">
    <h2 class="text-lg font-bold">Add Contact</h2>
    <form class="mt-5" @submit.prevent="onSubmit">
      <div>
        <UiLabel for="phoneNumber">Phone number</UiLabel>
        <input
          id="phoneNumber"
          v-model="phoneNumber"
          type="text"
          name="phoneNumber"
          class="form-input-field"
          :class="{
            'focus-visible:ring-red-500': errors.phoneNumber,
          }"
          inputmode="tel"
          @keypress="isNumber"
        />
        <FormError v-show="errors.phoneNumber" :message="errors.phoneNumber" />
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
import type { EditContactList } from '@/types/phonebook'
import UiModal from '@/components/ui/modal/UiModal.vue'

const props = defineProps<{
  contactList: EditContactList | null
}>()

const emit = defineEmits(['onContactAdded'])

const { $toast } = useNuxtApp()

// Reuseable function not specific to this component
const { api } = useApi()

const schema = Yup.object().shape({
  phoneNumber: Yup.string().required().label('Phone number').trim(),
})
const { errors, handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    phoneNumber: '',
  },
})
const { value: phoneNumber } = useField<string>('phoneNumber')
const loading = ref(false)

const disabled = computed(() => {
  if (loading.value) {
    return true
  } else {
    return !!(phoneNumber.value === '' || errors.value.phoneNumber)
  }
})

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true
    const response = await api.phoneBook.createContact({
      phoneNumber: values.phoneNumber,
      contactListId: props.contactList?.listId,
    })
    if (response.status === 1) {
      emit('onContactAdded')
      $toast.fire({
        icon: 'success',
        title: response.msg,
      })
      closeModal()
    } else {
      $toast.fire({
        icon: 'error',
        title: response.msg || 'Error adding contact',
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
  resetForm({
    values: {
      phoneNumber: '',
    },
  })
}

defineExpose({
  open,
  closeModal,
})
</script>
