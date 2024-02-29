<template>
  <form
    class="px-8 py-6 mt-3 bg-white border rounded-lg dark:bg-dark-secondary border-grey dark:border-transparent shadow-custom"
    @submit.prevent="onSubmit"
  >
    <div>
      <UiLabel for="bank">Bank paid into</UiLabel>
      <UiSelect v-model="bank" name="bank">
        <SelectTrigger>
          <SelectValue placeholder="Choose bank" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel class="text-light-text dark:text-dark-light-text">
              Banks
            </SelectLabel>
            <SelectItem
              v-for="account in bankAccounts"
              :key="account.id"
              :value="account.id.toString()"
            >
              {{ account.name }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </UiSelect>
      <FormError v-show="errors.bank" :message="errors.bank" />
    </div>
    <div class="mt-5">
      <UiLabel for="bank">Date of payment</UiLabel>
      <DatePicker
        v-model:value="date"
        input-class="cursor-pointer form-input-field text-dark-text dark:text-white"
        value-type="format"
        format="YYYY-MM-DD"
        type="date"
        :disabled-date="notBeforeToday"
      />
      <FormError v-show="errors.date" :message="errors.date" />
    </div>
    <div class="mt-5">
      <UiLabel for="branchName">Bank / ATM Branch Name</UiLabel>
      <input
        id="branchName"
        v-model="branchName"
        type="text"
        name="branchName"
        class="form-input-field"
        :class="{
          'focus-visible:ring-red-500': errors.branchName,
        }"
      />
      <FormError v-show="errors.branchName" :message="errors.branchName" />
    </div>
    <div class="mt-5">
      <UiLabel for="depositorName">Depositor's name</UiLabel>
      <input
        id="depositorName"
        v-model="depositorName"
        type="text"
        name="depositorName"
        class="form-input-field"
        :class="{
          'focus-visible:ring-red-500': errors.depositorName,
        }"
      />
      <FormError
        v-show="errors.depositorName"
        :message="errors.depositorName"
      />
    </div>
    <div class="mt-5">
      <UiLabel for="amountPaid">Amount paid</UiLabel>
      <input
        id="amountPaid"
        v-model="amountPaid"
        type="text"
        name="amountPaid"
        class="form-input-field"
        :class="{
          'focus-visible:ring-red-500': errors.amountPaid,
        }"
        @keypress="isNumber"
      />
      <FormError v-show="errors.amountPaid" :message="errors.amountPaid" />
    </div>
    <div class="mt-5">
      <UiLabel for="referenceId">
        Teller number / Transaction ID / Reference Id
      </UiLabel>
      <input
        id="referenceId"
        v-model="referenceId"
        type="text"
        name="referenceId"
        class="form-input-field"
        :class="{
          'focus-visible:ring-red-500': errors.referenceId,
        }"
      />
      <FormError v-show="errors.referenceId" :message="errors.referenceId" />
    </div>
    <div class="mt-5">
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
      />
      <FormError v-show="errors.phoneNumber" :message="errors.phoneNumber" />
    </div>
    <div class="mt-5">
      <UiFileSelect v-model="receipt">
        <p class="text-sm text-center">Upload receipt of payment (Optional)</p>
      </UiFileSelect>
    </div>
    <UiButton type="submit" :disabled="disabled" class="w-full mt-8">
      <SpinLoader v-show="loading" class="mr-2" />
      {{ loading ? 'Please wait' : 'Submit' }}
    </UiButton>
  </form>
</template>

<script setup lang="ts">
import * as Yup from 'yup'
import { useField, useForm } from 'vee-validate'
import type { Bank } from '@/types/misc'

// Reusable composable not related to this component
const { api } = useApi()
const { $toast } = useNuxtApp()

const schema = Yup.object().shape({
  bank: Yup.string().required().label('Bank').trim(),
  date: Yup.string().required().label('Date').trim(),
  branchName: Yup.string().required().label('Branch name').trim(),
  depositorName: Yup.string().required().label('Depositor name').trim(),
  amountPaid: Yup.string().required().label('Amount').trim(),
  referenceId: Yup.string().required().label('Reference').trim(),
  phoneNumber: Yup.string().required().label('phone number').trim(),
})
const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    bank: '',
    date: '',
    branchName: '',
    depositorName: '',
    amountPaid: '',
    referenceId: '',
    phoneNumber: '',
  },
})
const { value: bank } = useField<string>('bank')
const { value: date } = useField<string>('date')
const { value: branchName } = useField<string>('branchName')
const { value: depositorName } = useField<string>('depositorName')
const { value: amountPaid } = useField<string>('amountPaid')
const { value: referenceId } = useField<string>('referenceId')
const { value: phoneNumber } = useField<string>('phoneNumber')
const receipt = ref<File | null>(null)
const bankAccounts = useState<Bank[] | null>('banks', () => null)
const loading = ref(false)

onMounted(async () => {
  try {
    const response = await api.misc.fetchBanks()
    if (response.status === 1) {
      bankAccounts.value = response.data
    }
  } catch (error) {}
})

watch(amountPaid, (val) => {
  if (val) {
    amountPaid.value = parseNumber(val).toLocaleString()
  }
})

const disabled = computed(() => {
  if (loading.value) {
    return true
  } else {
    return !!(
      bank.value === '' ||
      date.value === '' ||
      branchName.value === '' ||
      depositorName.value === '' ||
      amountPaid.value === '' ||
      referenceId.value === '' ||
      phoneNumber.value === '' ||
      errors.value.bank ||
      errors.value.date ||
      errors.value.branchName ||
      errors.value.bank ||
      errors.value.amountPaid ||
      errors.value.referenceId ||
      errors.value.phoneNumber
    )
  }
})

function notBeforeToday(date: Date) {
  return date > new Date(new Date().setHours(0, 0, 0, 0))
}
const onSubmit = handleSubmit(async (values, { resetForm }) => {
  try {
    loading.value = true
    const formData = new FormData()
    formData.append('amount', values.amountPaid)
    formData.append('paymentdate', values.date)
    formData.append('bank', values.bank)
    formData.append('branch', values.branchName)
    formData.append('depositor', values.depositorName)
    formData.append('payer_phone', values.phoneNumber)
    formData.append('tellerno', values.referenceId)
    formData.append('receipt', receipt.value as any)

    const response = await api.misc.submitPaymentDetails(formData)
    if (response.status === 1) {
      $toast.fire({
        icon: 'success',
        title: response.msg,
      })
      resetForm({
        values: {
          bank: '',
          date: '',
          branchName: '',
          depositorName: '',
          amountPaid: '',
          referenceId: '',
          phoneNumber: '',
        },
      })
      receipt.value = null
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
</script>
