<template>
  <div class="grid grid-cols-1 gap-10 mt-10 lg:grid-cols-2">
    <div>
      <h1 class="max-w-xs text-4xl font-bold">Create an account, It's free</h1>
    </div>
    <div
      class="w-full px-8 py-6 bg-white border rounded-lg md:max-w-lg border-grey shadow-custom dark:border-transparent dark:bg-dark-secondary"
    >
      <form class="grid grid-cols-1 gap-3 md:grid-cols-2" @submit="onSubmit">
        <div>
          <UiLabel for="email">Email</UiLabel>
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
        <div>
          <UiLabel for="firstname">Firstname</UiLabel>
          <input
            id="firstname"
            v-model="firstname"
            type="text"
            name="firstname"
            class="form-input-field"
            :class="{
              'focus-visible:ring-red-500': errors.firstname,
            }"
          />
          <FormError v-show="errors.firstname" :message="errors.firstname" />
        </div>
        <div>
          <UiLabel for="lastname">Lastname</UiLabel>
          <input
            id="lastname"
            v-model="lastname"
            type="text"
            name="lastname"
            class="form-input-field"
            :class="{
              'focus-visible:ring-red-500': errors.lastname,
            }"
          />
          <FormError v-show="errors.lastname" :message="errors.lastname" />
        </div>
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
          />
          <FormError
            v-show="errors.phoneNumber"
            :message="errors.phoneNumber"
          />
        </div>
        <div>
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
        <div>
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
        <FormError
          v-show="error && errorMessage"
          :message="errorMessage"
          class="mt-3"
        />
      </form>
      <div class="flex flex-wrap items-center justify-between gap-5 mt-10">
        <p class="text-sm text-light-text dark:text-dark-light-text">
          Already have an account?
          <nuxt-link to="/login" class="font-bold text-primary">
            Login
          </nuxt-link>
        </p>
        <UiButton
          type="submit"
          :disabled="disabled"
          class="flex items-center w-full sm:w-auto"
        >
          <SpinLoader v-show="loading" class="mr-2" />
          {{ loading ? 'Please wait' : 'Create Account' }}
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Yup from 'yup'
import { useField, useForm } from 'vee-validate'

// Assets
import EyeIcon from '@/assets/icons/eye.svg?component'
import EyeSlashIcon from '@/assets/icons/eye-slash.svg?component'

const { ref: code } = useRoute().query

// Reusable composable not related to this page
const { api } = useApi()

// Reusable composable related to this page
const { handleLoginResponse } = useAuth()

const schema = Yup.object().shape({
  firstname: Yup.string().required().label('firstname').trim(),
  lastname: Yup.string().required().label('lastname').trim(),
  email: Yup.string().required().label('Email').email().trim(),
  phoneNumber: Yup.string().required().label('Phone number').trim(),
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
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  },
})
const { value: firstname } = useField<string>('firstname')
const { value: lastname } = useField<string>('lastname')
const { value: email } = useField<string>('email')
const { value: phoneNumber } = useField<string>('phoneNumber')
const { value: password } = useField<string>('password')
const { value: confirmPassword } = useField<string>('confirmPassword')
const referralCode = Number(code)
const loading = ref(false)
const error = ref(false)
const errorMessage = ref<string | string[]>('')

// Password
const {
  passwordRef,
  passwordVisibility,
  confirmPasswordVisibility,
  confirmPasswordRef,
  togglePasswordVisibility,
  toggleConfirmPasswordVisibility,
} = usePassword()

const disabled = computed(() => {
  if (loading.value) {
    return true
  } else {
    return !!(
      email.value === '' ||
      firstname.value === '' ||
      lastname.value === '' ||
      phoneNumber.value === '' ||
      password.value === '' ||
      confirmPassword.value === '' ||
      errors.value.email ||
      errors.value.firstname ||
      errors.value.lastname ||
      errors.value.phoneNumber ||
      errors.value.password ||
      errors.value.confirmPassword
    )
  }
})

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true
    error.value = false
    const response = await api.auth.signup({
      email: values.email,
      firstname: values.firstname,
      lastname: values.lastname,
      password: values.password,
      mobile_number: values.phoneNumber,
      password_confirmation: values.confirmPassword,
      ref: referralCode,
    })
    if (response.status === 1) {
      // After registering user, Login user
      const response = await api.auth.login({
        email: values.email,
        password: values.password,
      })
      if (response.status === 1) {
        navigateTo(handleLoginResponse(response))
      }
    } else if (response.status === -2) {
      error.value = true
      errorMessage.value = response.data.msg.split('.')
    }
    loading.value = false
  } catch (err: any) {
    loading.value = false
    error.value = true
    errorMessage.value = formatErrorResponse(err)
  }
})

definePageMeta({
  layout: 'auth',
  middleware: 'guest',
})

useHead({
  title: 'Multitexter BulkSMS - Signup',
})
</script>
