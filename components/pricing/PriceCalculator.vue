<template>
  <div
    class="sticky p-6 bg-white border rounded-lg top-20 dark:bg-dark-secondary shadow-custom border-grey dark:border-transparent"
  >
    <h2 class="text-lg font-bold">Price Calculator</h2>
    <form class="mt-5">
      <div>
        <UiLabel for="totalRecipients">
          How many people are you sending SMS to?
        </UiLabel>
        <input
          id="totalRecipients"
          v-model="totalRecipients"
          type="text"
          name="totalRecipients"
          class="form-input-field"
          :class="{
            'focus-visible:ring-red-500': errors.totalRecipients,
          }"
          @keypress="isNumber"
        />
        <FormError
          v-show="errors.totalRecipients"
          :message="errors.totalRecipients"
        />
      </div>
      <div class="mt-5">
        <UiLabel for="totalPages">
          How many SMS pages? (1 page = 160 characters)
        </UiLabel>
        <input
          id="totalPages"
          v-model="totalPages"
          type="text"
          name="totalPages"
          class="form-input-field"
          :class="{
            'focus-visible:ring-red-500': errors.totalPages,
          }"
          @keypress="isNumber"
        />
        <FormError v-show="errors.totalPages" :message="errors.totalPages" />
      </div>
      <h3 class="mt-5 text-sm font-bold">You'll need about</h3>
      <div class="mt-5">
        <UiLabel for="totalUnits"> Total units </UiLabel>
        <input
          id="totalUnits"
          v-model="totalUnits"
          type="text"
          name="totalUnits"
          class="form-input-field"
          :class="{
            'focus-visible:ring-red-500': errors.totalUnits,
          }"
          disabled
        />
        <FormError v-show="errors.totalUnits" :message="errors.totalUnits" />
      </div>
      <div class="mt-5">
        <UiLabel for="unitPrice"> Unit price </UiLabel>
        <input
          id="unitPrice"
          v-model="unitPrice"
          type="text"
          name="unitPrice"
          class="form-input-field"
          :class="{
            'focus-visible:ring-red-500': errors.unitPrice,
          }"
          disabled
        />
        <FormError v-show="errors.unitPrice" :message="errors.unitPrice" />
      </div>
      <div class="mt-5">
        <UiLabel for="amountToPay"> Amount to pay (₦) </UiLabel>
        <input
          id="amountToPay"
          v-model="amountToPay"
          type="text"
          name="amountToPay"
          class="form-input-field"
          :class="{
            'focus-visible:ring-red-500': errors.amountToPay,
          }"
          disabled
        />
        <FormError v-show="errors.amountToPay" :message="errors.amountToPay" />
      </div>
    </form>
    <p
      class="mt-5 text-sm leading-loose text-light-text dark:text-dark-light-text"
    >
      You can calculate your SMS units for any amount and get instant credit if
      you pay online with your ATM, credit, or debit card.
    </p>
  </div>
</template>

<script setup lang="ts">
import * as Yup from 'yup'
import { useField, useForm } from 'vee-validate'

const schema = Yup.object().shape({
  totalRecipients: Yup.string().required().label('Recipients').trim(),
  totalPages: Yup.string().required().label('Total page').trim(),
  totalUnits: Yup.string().label('Total unit').trim(),
  unitPrice: Yup.string().label('Unit price').trim(),
  amountToPay: Yup.string().label('Amount').trim(),
})
const { errors } = useForm({
  validationSchema: schema,
  initialValues: {
    totalRecipients: '',
    totalPages: '',
    totalUnits: '',
    unitPrice: '',
    amountToPay: '',
  },
})
const { value: totalRecipients } = useField<string>('totalRecipients')
const { value: totalPages } = useField<string>('totalPages')
const { value: totalUnits } = useField<string | number>('totalUnits')
const { value: unitPrice } = useField<number>('unitPrice')
const { value: amountToPay } = useField<string | number>('amountToPay')
const FIXED_UNIT_PRICE = 2

const updatedUnitPrice = computed(() => {
  if (
    parseNumber(totalRecipients.value) *
      parseNumber(totalPages.value) *
      FIXED_UNIT_PRICE <=
    499
  ) {
    return 3
  } else if (
    parseNumber(totalRecipients.value) *
      parseNumber(totalPages.value) *
      FIXED_UNIT_PRICE <=
    9999
  ) {
    return 2
  } else if (
    parseNumber(totalRecipients.value) *
      parseNumber(totalPages.value) *
      FIXED_UNIT_PRICE >=
      9999 &&
    parseNumber(totalRecipients.value) *
      parseNumber(totalPages.value) *
      FIXED_UNIT_PRICE <=
      999999
  ) {
    return 1.9
  } else if (
    parseNumber(totalRecipients.value) *
      parseNumber(totalPages.value) *
      FIXED_UNIT_PRICE >=
      1000000 &&
    parseNumber(totalRecipients.value) *
      parseNumber(totalPages.value) *
      FIXED_UNIT_PRICE <=
      9999999
  ) {
    return 1.85
  } else if (
    parseNumber(totalRecipients.value) *
      parseNumber(totalPages.value) *
      FIXED_UNIT_PRICE >=
      10000000 &&
    parseNumber(totalRecipients.value) *
      parseNumber(totalPages.value) *
      FIXED_UNIT_PRICE <=
      99999999
  ) {
    return 1.75
  } else if (
    parseNumber(totalRecipients.value) *
      parseNumber(totalPages.value) *
      FIXED_UNIT_PRICE >=
      100000000 &&
    parseNumber(totalRecipients.value) *
      parseNumber(totalPages.value) *
      FIXED_UNIT_PRICE <=
      999999999
  ) {
    return 1.7
  }

  return 0
})

function calculatePrice() {
  if (totalRecipients.value !== '' && totalPages.value !== '') {
    const unitPerPage = parseNumber(totalPages.value) * FIXED_UNIT_PRICE
    const total = parseNumber(totalRecipients.value) * unitPerPage
    const totalAmount = total * updatedUnitPrice.value
    unitPrice.value = updatedUnitPrice.value
    totalUnits.value = total.toLocaleString()
    amountToPay.value = totalAmount.toLocaleString()
  } else {
    unitPrice.value = 0
    totalUnits.value = 0
    amountToPay.value = 0
  }
}

watch(totalRecipients, (val) => {
  if (val) {
    totalRecipients.value = parseNumber(val).toLocaleString()
  }
  calculatePrice()
})
watch(totalPages, (val) => {
  if (val) {
    totalPages.value = parseNumber(val).toLocaleString()
  }
  calculatePrice()
})
</script>
