<template>
  <UiModal ref="modal" :is-blocking="true" @close="closeModal()">
    <h2 class="text-lg font-bold">Change Password</h2>
    <form class="mt-5" @submit.prevent="onSubmit">
      <div>
        <UiLabel for="currentPassword">Current password</UiLabel>
        <div class="relative">
          <input
            id="currentPassword"
            ref="currentPasswordRef"
            v-model="currentPassword"
            type="password"
            name="currentPassword"
            class="pr-10 form-input-field"
            :class="{
              'focus-visible:ring-red-500': errors.currentPassword,
            }"
          />
          <div
            v-show="!currentPasswordVisibility"
            @click.prevent="toggleCurrentPasswordVisibility"
          >
            <EyeIcon class="password-toggle-indicator" />
          </div>
          <div
            v-show="currentPasswordVisibility"
            @click.prevent="toggleCurrentPasswordVisibility"
          >
            <EyeSlashIcon class="password-toggle-indicator" />
          </div>
        </div>
        <FormError
          v-show="errors.currentPassword"
          :message="errors.currentPassword"
        />
      </div>
      <div class="mt-5">
        <UiLabel for="password">Password</UiLabel>
        <div class="relative">
          <input
            id="password"
            ref="passwordRef"
            v-model="password"
            type="password"
            name="password"
            class="pr-10 form-input-field"
            :class="{
              'focus-visible:ring-red-500': errors.password,
            }"
          />
          <div
            v-show="!passwordVisibility"
            @click.prevent="togglePasswordVisibility"
          >
            <EyeIcon class="password-toggle-indicator" />
          </div>
          <div
            v-show="passwordVisibility"
            @click.prevent="togglePasswordVisibility"
          >
            <EyeSlashIcon class="password-toggle-indicator" />
          </div>
        </div>
        <FormError v-show="errors.password" :message="errors.password" />
      </div>
      <div class="mt-5">
        <UiLabel for="confirmPassword">Confirm password</UiLabel>
        <div class="relative">
          <input
            id="confirmPassword"
            ref="confirmPasswordRef"
            v-model="confirmPassword"
            type="password"
            name="confirmPassword"
            class="pr-10 form-input-field"
            :class="{
              'focus-visible:ring-red-500': errors.confirmPassword,
            }"
          />
          <div
            v-show="!confirmPasswordVisibility"
            @click.prevent="toggleConfirmPasswordVisibility"
          >
            <EyeIcon class="password-toggle-indicator" />
          </div>
          <div
            v-show="confirmPasswordVisibility"
            @click.prevent="toggleConfirmPasswordVisibility"
          >
            <EyeSlashIcon class="password-toggle-indicator" />
          </div>
        </div>
        <FormError
          v-show="errors.confirmPassword"
          :message="errors.confirmPassword"
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
import UiModal from '@/components/ui/modal/UiModal.vue'

// Assets
import EyeIcon from '@/assets/icons/eye.svg?component'
import EyeSlashIcon from '@/assets/icons/eye-slash.svg?component'

const emit = defineEmits(['onPasswordUpdated'])

const { $toast } = useNuxtApp()

// Reuseable function not specific to this component
const { api } = useApi()

const schema = Yup.object().shape({
  currentPassword: Yup.string().required().label('Current password').trim(),
  password: Yup.string().required().min(6).label('Password').trim(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .label('Confirm password')
    .trim(),
})
const { errors, handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    currentPassword: '',
    password: '',
    confirmPassword: '',
  },
})
const { value: currentPassword } = useField<string>('currentPassword')
const { value: password } = useField<string>('password')
const { value: confirmPassword } = useField<string>('confirmPassword')
const loading = ref(false)

const {
  currentPasswordRef,
  passwordRef,
  currentPasswordVisibility,
  passwordVisibility,
  confirmPasswordVisibility,
  confirmPasswordRef,
  toggleCurrentPasswordVisibility,
  togglePasswordVisibility,
  toggleConfirmPasswordVisibility,
} = usePassword()

const disabled = computed(() => {
  if (loading.value) {
    return true
  } else {
    return !!(
      currentPassword.value === '' ||
      password.value === '' ||
      confirmPassword.value === '' ||
      errors.value.currentPassword ||
      errors.value.password ||
      errors.value.confirmPassword
    )
  }
})

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true
    const response = await api.profile.changePassword({
      current_password: values.currentPassword,
      password: values.password,
      password_confirmation: values.confirmPassword,
    })
    if (response.status === 1) {
      emit('onPasswordUpdated')
      $toast.fire({
        icon: 'success',
        title: response.msg,
      })
      closeModal()
    } else {
      $toast.fire({
        icon: 'error',
        title: response.msg,
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
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
  })
}

defineExpose({
  open,
  closeModal,
})
</script>
