<template>
  <div class="grid grid-cols-1 gap-10 mt-10 lg:grid-cols-2">
    <div>
      <h1 class="max-w-md text-4xl font-bold">Reset your password</h1>
    </div>
    <div
      class="w-full px-8 py-6 bg-white border rounded-lg md:max-w-lg border-grey shadow-custom dark:border-transparent dark:bg-dark-secondary"
    >
      <form v-if="isResetCodeValid" @submit="onSubmit">
        <div>
          <UiLabel for="email">Email Address</UiLabel>
          <input
            id="email"
            v-model="email"
            type="email"
            name="email"
            class="form-input-field"
            :class="{
              'focus-visible:ring-red-500': errors.email,
            }"
          />
          <FormError v-show="errors.email" :message="errors.email" />
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
            <button
              v-show="!passwordVisibility"
              @click.prevent="togglePasswordVisibility"
            >
              <EyeIcon class="password-toggle-indicator" />
            </button>
            <button
              v-show="passwordVisibility"
              @click.prevent="togglePasswordVisibility"
            >
              <EyeSlashIcon class="password-toggle-indicator" />
            </button>
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
            <button
              v-show="!confirmPasswordVisibility"
              @click.prevent="toggleConfirmPasswordVisibility"
            >
              <EyeIcon class="password-toggle-indicator" />
            </button>
            <button
              v-show="confirmPasswordVisibility"
              @click.prevent="toggleConfirmPasswordVisibility"
            >
              <EyeSlashIcon class="password-toggle-indicator" />
            </button>
          </div>
          <FormError
            v-show="errors.confirmPassword"
            :message="errors.confirmPassword"
          />
        </div>
        <UiButton
          type="submit"
          :disabled="disabled"
          class="flex w-full mt-5 ml-auto sm:w-auto"
        >
          <SpinLoader v-show="loading" class="mr-2" />
          {{ loading ? 'Please wait' : 'Submit' }}
        </UiButton>
      </form>

      <div v-else class="flex flex-col items-center justify-center">
        <h2 class="text-lg font-bold text-center">{{ errorMessage }}</h2>
        <p
          class="mt-2 leading-loose text-center text-light-text dark:text-dark-light-text"
        >
          Your password reset token has expired, please request for a new reset
          token to reset your password
        </p>
        <nuxt-link to="/forgot-password" class="mt-5 btn-primary">
          Request Password Reset
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Yup from 'yup'
import { useField, useForm } from 'vee-validate'
import type { ResetCodeCheckRes } from '@/types/auth'

// Assets
import EyeIcon from '@/assets/icons/eye.svg?component'
import EyeSlashIcon from '@/assets/icons/eye-slash.svg?component'

const { $toast } = useNuxtApp()

// Reusable composable not related to this page
const { api } = useApi()

// config
const { BASE_URL } = useRuntimeConfig().public

const { reset } = useRoute().query

const schema = Yup.object().shape({
  email: Yup.string().required().email().label('Email address').trim(),
  password: Yup.string().required().min(6).label('Password').trim(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .label('Confirm password')
    .trim(),
})
const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    email: '',
    password: '',
    confirmPassword: '',
  },
})
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const { value: confirmPassword } = useField<string>('confirmPassword')
const resetCode = ref('')
const isResetCodeValid = ref(false)
const loading = ref(false)
const errorMessage = ref('')

// Password
const {
  passwordRef,
  passwordVisibility,
  confirmPasswordVisibility,
  confirmPasswordRef,
  togglePasswordVisibility,
  toggleConfirmPasswordVisibility,
} = usePassword()

// Check if reset code is still valid
const { data, error } = await useFetch<ResetCodeCheckRes>(
  `password/find/${reset}`,
  {
    baseURL: BASE_URL,
  },
)

if (data.value?.status === 1) {
  email.value = data.value.email
  resetCode.value = data.value?.resetcode
  isResetCodeValid.value = true
} else if (data.value?.status === -2) {
  errorMessage.value = data.value.msg
}

if (error.value) {
  throw createError({
    statusCode: 400,
    statusMessage: 'Error checking reset code',
  })
}

const disabled = computed(() => {
  if (loading.value) {
    return true
  } else {
    return !!(
      email.value === '' ||
      password.value === '' ||
      confirmPassword.value === '' ||
      errors.value.email ||
      errors.value.password ||
      errors.value.confirmPassword
    )
  }
})

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true
    const response = await api.auth.resetPassword({
      email: values.email,
      password: values.password,
      password_confirmation: values.confirmPassword,
      token: resetCode.value,
    })
    if (response) {
      $toast.fire({
        icon: 'success',
        title: 'Your password has been successfully reset',
      })
      navigateTo('/login')
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

definePageMeta({
  layout: 'auth',
  middleware: 'guest',
})

useHead({
  title: 'Multitexter BulkSMS - Reset Password',
})
</script>
