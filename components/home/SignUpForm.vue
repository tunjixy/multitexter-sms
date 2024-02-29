<template>
  <form class="mt-5" @submit="onSubmit">
    <fieldset
      :disabled="loading"
      :class="{ 'cursor-not-allowed': loading }"
      class="grid grid-cols-1 gap-5 sm:grid-cols-2"
    >
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
        <FormError v-show="errors.phoneNumber" :message="errors.phoneNumber" />
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
  firstname: Yup.string().label('firstname').trim().required(),
  lastname: Yup.string().label('lastname').trim().required(),
  email: Yup.string().required().label('Email').email().trim().required(),
  phoneNumber: Yup.string().label('Phone number').trim().required(),
  password: Yup.string().label('Password').trim().min(6).required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .label('Confirm password')
    .trim()
    .required(),
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

// Reusable composable related to this component
const {
  passwordRef,
  passwordVisibility,
  confirmPasswordVisibility,
  confirmPasswordRef,
  togglePasswordVisibility,
  toggleConfirmPasswordVisibility,
} = usePassword()
const { loading, registerUser } = useHomeFlow()

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

const onSubmit = handleSubmit((values) => {
  registerUser({
    firstname: values.firstname,
    lastname: values.lastname,
    email: values.email,
    password: values.password,
    password_confirmation: values.confirmPassword,
    mobile_number: values.phoneNumber,
  })
})
</script>
