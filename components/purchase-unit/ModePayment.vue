<template>
  <form
    class="max-w-lg px-8 py-6 mt-5 bg-white border rounded-lg dark:bg-dark-secondary border-grey dark:border-transparent shadow-custom"
    @submit.prevent="onSubmit"
  >
    <div>
      <UiLabel for="numberOfUnit">Number of unit</UiLabel>
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
      <UiLabel>Unit price</UiLabel>
      <p v-if="loading.unit" class="text-sm">Loading...</p>
      <p v-else class="text-lg font-bold">
        {{ formatNumberWithComma(unitPrice) }}
      </p>
    </div>
    <div class="mt-5">
      <UiLabel>Amount to pay</UiLabel>
      <p v-if="loading.unit" class="text-sm">Loading...</p>
      <p v-else class="text-lg font-bold">
        ₦ {{ formatNumberWithComma(amountToPay) }}
      </p>
    </div>
    <div class="mt-5">
      <UiLabel>Transaction fee</UiLabel>
      <p v-if="loading.unit" class="text-sm">Loading...</p>
      <p v-else class="text-lg font-bold">
        {{ formatNumberWithComma(transactionFee) }}
      </p>
    </div>
    <div class="mt-5">
      <UiLabel>Total payment</UiLabel>
      <p v-if="loading.unit" class="text-sm">Loading...</p>
      <p v-else class="text-lg font-bold">
        ₦ {{ formatNumberWithComma(totalPayment) }}
      </p>
    </div>
    <div class="mt-5">
      <UiLabel for="cardType">Card type</UiLabel>
      <UiSelect v-model="selectedCardType" name="cardType">
        <SelectTrigger>
          <SelectValue placeholder="Choose card type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel class="text-light-text dark:text-dark-light-text">
              Cards
            </SelectLabel>
            <SelectItem
              v-for="card in cards"
              :key="card.value"
              :value="card.value"
            >
              {{ card.name }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </UiSelect>
    </div>
    <UiButton type="submit" :disabled="disabled" class="w-full mt-8">
      <SpinLoader v-show="loading.submit" class="mr-2" />
      {{ loading.submit ? 'Please wait' : 'Submit' }}
    </UiButton>
  </form>
</template>

<script setup lang="ts">
import * as Yup from 'yup'
import { useField, useForm } from 'vee-validate'

const { $toast } = useNuxtApp()

// Reusable composable not related to this page
const { api } = useApi()

const schema = Yup.object().shape({
  numberOfUnit: Yup.string().required().label('Number of unit').trim(),
})
const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    numberOfUnit: '',
  },
})
const { value: numberOfUnit } = useField<string>('numberOfUnit')
const unitPrice = ref(0)
const amountToPay = ref(0)
const transactionFee = ref(0)
const totalPayment = ref(0)
const cards = [
  {
    name: 'Nigerian cards',
    value: 'Paystack',
  },
  {
    name: 'Non-Nigerian cards',
    value: 'flutterwave',
  },
]
const selectedCardType = ref('Paystack')
const loading = ref({
  unit: false,
  submit: false,
})

const disabled = computed(() => {
  if (loading.value.submit || loading.value.unit) {
    return true
  } else {
    return !!(numberOfUnit.value === '' || errors.value.numberOfUnit)
  }
})

watch(numberOfUnit, (val) => {
  if (val) {
    numberOfUnit.value = parseNumber(val).toLocaleString()
  }
})

watchDebounced(
  numberOfUnit,
  (val) => {
    if (val) {
      calculateUnitPrice()
    }
  },
  { debounce: 1000, maxWait: 3000 },
)

async function calculateUnitPrice() {
  try {
    loading.value.unit = true
    const response = await api.payment.calculateUnitPrice({
      unit: parseNumber(numberOfUnit.value),
      paymentGateway: selectedCardType.value,
    })
    if (response.status === 1) {
      unitPrice.value = response.data.price
      amountToPay.value = response.data.amountdue
      transactionFee.value = response.data.charges
      totalPayment.value = response.data.total
    } else {
      unitPrice.value = 0
      amountToPay.value = 0
      transactionFee.value = 0
      totalPayment.value = 0

      $toast.fire({
        icon: 'error',
        title: response.msg,
      })
    }
    loading.value.unit = false
  } catch (err) {
    loading.value.unit = false
    $toast.fire({
      icon: 'error',
      title: formatErrorResponse(err),
    })
  }
}
const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value.submit = true
    const response = await api.payment.purchaseUnit({
      unit: parseNumber(values.numberOfUnit),
      paymentGateway: selectedCardType.value,
    })
    if (response.status === 1) {
      window.location.href = response.url
    } else {
      $toast.fire({
        icon: 'error',
        title: response.msg,
      })
    }
    loading.value.submit = false
  } catch (err: any) {
    loading.value.submit = false
    $toast.fire({
      icon: 'error',
      title: formatErrorResponse(err),
    })
  }
})
</script>
