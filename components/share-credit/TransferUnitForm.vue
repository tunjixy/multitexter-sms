<template>
  <form
    class="max-w-lg px-8 py-6 bg-white border rounded-lg dark:bg-dark-secondary border-grey dark:border-transparent shadow-custom"
    @submit.prevent="onSubmit"
  >
    <h1 class="text-lg font-bold">Transfer Information</h1>
    <div class="mt-5">
      <UiLabel for="email">To (Email Account)</UiLabel>
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
      <UiLabel for="numberOfUnit">Number of unit to transfer</UiLabel>
      <input
        id="numberOfUnit"
        v-model="numberOfUnit"
        type="text"
        name="numberOfUnit"
        class="form-input-field"
        :class="{
          'focus-visible:ring-red-500': errors.numberOfUnit,
        }"
        @keypress="isNumber"
      />
      <FormError v-show="errors.numberOfUnit" :message="errors.numberOfUnit" />
    </div>
    <div class="mt-5">
      <UiLabel for="numberOfUnit">Balance after transfer</UiLabel>
      <p class="text-lg font-bold">
        {{ formatNumberWithComma(unitBalance) }}
      </p>
    </div>
    <UiButton type="submit" :disabled="disabled" class="flex mt-8 ml-auto">
      <SpinLoader v-show="loading" class="mr-2" />
      {{ loading ? 'Please wait' : 'Submit' }}
    </UiButton>
  </form>
</template>

<script setup lang="ts">
import * as Yup from 'yup'
import { useField, useForm } from 'vee-validate'

// Reusable composable not related to this component
const { api } = useApi()
const { $toast } = useNuxtApp()
const { userDetail } = storeToRefs(useUserStore())
const { fetchUserDetails } = useAuth()

// Reusable composable related to this component
const { fetchRecentTransfers } = useTransferUnit()

const schema = Yup.object().shape({
  email: Yup.string().required().label('Email').email().trim(),
  numberOfUnit: Yup.string().required().label('Number of unit').trim(),
})
const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    email: '',
    numberOfUnit: '',
  },
})
const { value: email } = useField<string>('email')
const { value: numberOfUnit } = useField<string>('numberOfUnit')
const loading = ref(false)

watch(numberOfUnit, (val) => {
  if (val) {
    numberOfUnit.value = parseNumber(val).toLocaleString()
  }
})

const unitBalance = computed(() => {
  if (userDetail.value) {
    return (
      parseNumber(userDetail.value.balance) -
      parseNumber(numberOfUnit.value || 0)
    )
  }
  return 0
})
const disabled = computed(() => {
  if (loading.value) {
    return true
  } else {
    return !!(
      email.value === '' ||
      numberOfUnit.value === '' ||
      errors.value.email ||
      errors.value.numberOfUnit
    )
  }
})

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  if (parseNumber(unitBalance.value) < 0) {
    $toast.fire({
      icon: 'error',
      title: "You can't transfer more than the unit you have",
    })
  } else {
    try {
      loading.value = true
      const response = await api.transfer.transferUnit({
        to: values.email,
        unit: parseNumber(values.numberOfUnit),
      })
      if (response.status === 1) {
        $toast.fire({
          icon: 'success',
          title: response.msg,
        })
        resetForm({
          values: {
            email: '',
            numberOfUnit: '',
          },
        })
        fetchRecentTransfers()
        fetchUserDetails()
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
  }
})
</script>
