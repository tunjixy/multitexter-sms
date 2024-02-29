<template>
  <div class="grid grid-cols-1 gap-10 mt-10 lg:grid-cols-2">
    <div>
      <h1 class="text-4xl font-bold">Welcome back,</h1>
      <p class="mt-2 text-2xl text-light-text dark:text-dark-light-text">
        Sign in to continue
      </p>
    </div>
    <div
      class="w-full px-8 py-6 bg-white border rounded-lg md:max-w-lg border-grey shadow-custom dark:border-transparent dark:bg-dark-secondary"
    >
      <form @submit="onSubmit">
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
              type="button"
              @click.prevent="togglePasswordVisibility"
            >
              <EyeIcon class="password-toggle-indicator" />
            </button>
            <button
              v-show="passwordVisibility"
              type="button"
              @click.prevent="togglePasswordVisibility"
            >
              <EyeSlashIcon class="password-toggle-indicator" />
            </button>
          </div>
          <FormError v-show="errors.password" :message="errors.password" />
        </div>
        <FormError
          v-show="error && errorMessage"
          :message="errorMessage"
          class="mt-3"
        />
        <div class="mt-2">
          <nuxt-link
            to="/forgot-password"
            class="text-sm font-bold text-primary"
          >
            Forgot password?
          </nuxt-link>
        </div>
        <div class="flex flex-wrap items-center justify-between gap-5 mt-10">
          <p class="text-sm text-light-text dark:text-dark-light-text">
            New user?
            <nuxt-link to="/signup" class="font-bold text-primary">
              Create account
            </nuxt-link>
          </p>
          <UiButton
            type="submit"
            :disabled="disabled"
            class="flex items-center w-full sm:w-auto"
          >
            <SpinLoader v-show="loading" class="mr-2" />
            {{ loading ? 'Please wait' : 'Submit' }}
          </UiButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Yup from 'yup'
import { useField, useForm } from 'vee-validate'

// Assets
import EyeIcon from '@/assets/icons/eye.svg?component'
import EyeSlashIcon from '@/assets/icons/eye-slash.svg?component'

const { $toast } = useNuxtApp()

// Reusable composable not related to this page
const { api } = useApi()

// Reusable composable related to this page
const { handleLoginResponse } = useAuth()

const schema = Yup.object().shape({
  email: Yup.string().required().label('Email').email().trim(),
  password: Yup.string().required().label('Password').trim(),
})
const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    email: '',
    password: '',
  },
})
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const loading = ref(false)
const error = ref(false)
const errorMessage = ref('')

// Password
const { passwordRef, passwordVisibility, togglePasswordVisibility } =
  usePassword()

const disabled = computed(() => {
  if (loading.value) {
    return true
  } else {
    return !!(
      email.value === '' ||
      password.value === '' ||
      errors.value.email ||
      errors.value.password
    )
  }
})

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true
    error.value = false
    const response = await api.auth.login({
      email: values.email,
      password: values.password,
    })
    if (response.status === 1) {
      navigateTo(handleLoginResponse(response))
    } else if (response.status === -2 || response.status === -3) {
      error.value = true
      errorMessage.value = response.msg
    }
    loading.value = false
  } catch (err: any) {
    loading.value = false
    error.value = true
    errorMessage.value = formatErrorResponse(err)
  }
})

const { activated } = useRoute().query

onMounted(() => {
  if (Number(activated) === 1) {
    $toast.fire({
      icon: 'success',
      title: 'Your account has been verified',
    })
  }
})

definePageMeta({
  layout: 'auth',
  middleware: 'guest',
})

useHead({
  title: 'Multitexter BulkSMS - Login',
})
</script>
