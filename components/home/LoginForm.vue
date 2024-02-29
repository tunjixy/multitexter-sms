<template>
  <form class="max-w-lg mx-auto mt-5" @submit="onSubmit">
    <fieldset :disabled="loading" :class="{ 'cursor-not-allowed': loading }">
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
    </fieldset>
    <UiButton
      type="submit"
      :disabled="disabled"
      class="flex mt-8 ml-auto shadow-btn"
    >
      <SpinLoader v-show="loading" class="mr-2" />
      {{ loading ? 'Please wait' : 'Submit' }}
    </UiButton>
  </form>
</template>

<script setup lang="ts">
import * as Yup from 'yup'
import { useField, useForm } from 'vee-validate'

// Assets
import EyeIcon from '@/assets/icons/eye.svg?component'
import EyeSlashIcon from '@/assets/icons/eye-slash.svg?component'

const schema = Yup.object().shape({
  email: Yup.string().label('Email').required().email().trim(),
  password: Yup.string().label('Password').required().trim(),
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

// Reusable composable related to this component
const { passwordRef, passwordVisibility, togglePasswordVisibility } =
  usePassword()
const { loading, loginUser } = useHomeFlow()

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

const onSubmit = handleSubmit((values) => {
  loginUser({
    email: values.email,
    password: values.password,
  })
})
</script>
