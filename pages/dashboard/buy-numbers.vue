<template>
  <div class="py-6">
    <div class="container">
      <UiAlert v-if="!showView">
        <InfoIcon class="size-4" />
        <AlertDescription class="text-sm">
          <p>
            Contacts are not available at the moment, but you can still send SMS
            <nuxt-link class="text-green-500" to="/dashboard/compose-sms">
              here
            </nuxt-link>
            from your generated numbers.
          </p>
        </AlertDescription>
      </UiAlert>

      <div v-if="showView" class="max-w-2xl mx-auto">
        <template v-if="loading.resources">
          <LazyUiSkeleton
            v-for="n in 4"
            :key="n"
            class="w-full mt-3 rounded h-14"
          />
        </template>

        <LazyErrorState
          v-else-if="!loading.resources && error"
          @try-again="fetchResources"
        />
        <template v-else>
          <template v-if="(states && networks && ageRange) || availableNumbers">
            <form @submit.prevent="onSubmit">
              <div>
                <UiLabel for="state">State</UiLabel>
                <UiSelect v-model="selectedState" name="state">
                  <SelectTrigger>
                    <SelectValue placeholder="Choose state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel
                        class="text-light-text dark:text-dark-light-text"
                      >
                        States
                      </SelectLabel>
                      <SelectItem
                        v-for="state in states"
                        :key="state.id"
                        :value="state.id.toString()"
                      >
                        {{ state.statename }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </UiSelect>
              </div>
              <div class="mt-5">
                <p v-if="loading.lga" class="mt-1 text-xs">Fetching lga...</p>
                <template v-else>
                  <UiLabel for="lga">Local Government Area</UiLabel>
                  <UiSelect v-model="selectedLga" name="lga">
                    <SelectTrigger>
                      <SelectValue placeholder="Choose lga" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel
                          class="text-light-text dark:text-dark-light-text"
                        >
                          Lga
                        </SelectLabel>
                        <SelectItem
                          v-for="item in lga"
                          :key="item.id"
                          :value="item.id.toString()"
                        >
                          {{ item.area }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </UiSelect>
                </template>
              </div>
              <div class="mt-5">
                <UiLabel for="age">Age Range</UiLabel>
                <UiSelect v-model="selectedAgeRange" name="age">
                  <SelectTrigger>
                    <SelectValue placeholder="Choose age range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel
                        class="text-light-text dark:text-dark-light-text"
                      >
                        Age range
                      </SelectLabel>
                      <SelectItem
                        v-for="(age, index) in ageRange"
                        :key="index"
                        :value="age.age"
                      >
                        {{ age.age }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </UiSelect>
              </div>
              <div class="mt-5">
                <UiLabel for="network">Network</UiLabel>
                <UiSelect v-model="selectedNetwork" name="network">
                  <SelectTrigger>
                    <SelectValue placeholder="Choose network" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel
                        class="text-light-text dark:text-dark-light-text"
                      >
                        Networks
                      </SelectLabel>
                      <SelectItem
                        v-for="(item, index) in networks"
                        :key="index"
                        :value="item.network"
                      >
                        {{ item.network }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </UiSelect>
              </div>
              <div class="mt-5">
                <UiLabel for="gender">Gender</UiLabel>
                <UiSelect v-model="gender" name="gender">
                  <SelectTrigger>
                    <SelectValue placeholder="Choose gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel
                        class="text-light-text dark:text-dark-light-text"
                      >
                        Genders
                      </SelectLabel>
                      <SelectItem
                        v-for="(item, index) in genders"
                        :key="index"
                        :value="item"
                      >
                        {{ item }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </UiSelect>
              </div>
              <div class="mt-5">
                <UiLabel for="listName">
                  Name of the list numbers will be stored
                </UiLabel>
                <input
                  id="listName"
                  v-model="listName"
                  type="text"
                  name="listName"
                  class="form-input-field"
                  :class="{
                    'focus-visible:ring-red-500': errors.listName,
                  }"
                />
                <FormError
                  v-show="errors.listName"
                  :message="errors.listName"
                />
              </div>
              <div class="mt-5">
                <UiLabel>
                  Available phone numbers in the area selected
                </UiLabel>
                <p v-if="loading.numbers" class="mt-1 text-xs">
                  Fetching available numbers...
                </p>
                <p v-else class="mt-1 text-lg font-bold">
                  {{ formatNumberWithComma(availableNumbers) }}
                </p>
              </div>
              <div class="mt-5">
                <UiLabel for="amountOfNumbers">
                  Volume of numbers to buy
                </UiLabel>
                <input
                  id="amountOfNumbers"
                  v-model="amountOfNumbers"
                  type="text"
                  name="amountOfNumbers"
                  class="form-input-field"
                  :class="{
                    'focus-visible:ring-red-500': errors.amountOfNumbers,
                  }"
                  @keypress="isNumber"
                />
                <FormError
                  v-show="errors.amountOfNumbers"
                  :message="errors.amountOfNumbers"
                />
              </div>
              <div class="mt-5">
                <UiLabel> Unit cost </UiLabel>
                <p v-if="loading.unit" class="mt-1 text-xs">Fetching unit...</p>
                <p v-else class="mt-1 text-lg font-bold">
                  {{ formatNumberWithComma(unitCost) }}
                </p>
              </div>
              <UiButton
                type="submit"
                :disabled="disabled"
                class="flex mt-8 ml-auto shadow-btn"
              >
                <SpinLoader v-show="loading.submit" class="mr-2" />
                {{ loading.submit ? 'Please wait' : 'Buy Numbers' }}
              </UiButton>
            </form>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Yup from 'yup'
import { useField, useForm } from 'vee-validate'
import type { State, LGA, Network, AgeRange } from '@/types/phonebook'
import InfoIcon from '@/assets/icons/info.svg?component'

// Reusable composable not related to this page
const { api } = useApi()
const appStore = useAppStore()
const { $toast } = useNuxtApp()

const showView = ref(false)
const states = useState<State[] | null>('states', () => null)
const networks = useState<Network[] | null>('networks', () => null)
const ageRange = useState<AgeRange[] | null>('ageRange', () => null)
const availableNumbers = useState<number>('availableNumbers', () => 0)
const lga = ref<LGA[] | null>(null)

const schema = Yup.object().shape({
  selectedState: Yup.string().label('State'),
  selectedLga: Yup.string().label('Lga'),
  selectedAgeRange: Yup.string().label('Age range'),
  selectedNetwork: Yup.string().label('Network'),
  gender: Yup.string().label('Gender'),
  listName: Yup.string().required().label('List name'),
  amountOfNumbers: Yup.string().required().label('Amount'),
})
const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    selectedState: '',
    selectedLga: '',
    selectedAgeRange: '',
    selectedNetwork: '',
    gender: '',
    listName: '',
    amountOfNumbers: '',
  },
})
const { value: selectedState } = useField<string>('selectedState')
const { value: selectedLga } = useField<string>('selectedLga')
const { value: selectedAgeRange } = useField<string>('selectedAgeRange')
const { value: selectedNetwork } = useField<string>('selectedNetwork')
const { value: gender } = useField<string>('gender')
const { value: listName } = useField<string>('listName')
const { value: amountOfNumbers } = useField<string>('amountOfNumbers')
const unitCost = ref<number>(0)
const genders = ['Male', 'Female']
const loading = ref({
  numbers: false,
  lga: false,
  unit: false,
  resources: false,
  submit: false,
})
const error = ref(false)

watch(amountOfNumbers, (val) => {
  if (val) {
    amountOfNumbers.value = parseNumber(val).toLocaleString()
  }
})
watch(selectedState, (id) => {
  if (id) {
    fetchLga(Number(id))
  }
})
watch([selectedLga, gender, selectedAgeRange, selectedNetwork], () => {
  fetchAvailableNumbers()
})
watchDebounced(
  amountOfNumbers,
  async (val) => {
    if (val) {
      try {
        loading.value.unit = true
        const response = await api.phoneBook.calculateUnitCost(
          parseNumber(amountOfNumbers.value),
        )
        if (response.status === 1) {
          unitCost.value = response.msg
        }
        loading.value.unit = false
      } catch (err) {}
    }
  },
  { debounce: 1000, maxWait: 5000 },
)

const disabled = computed(() => {
  if (loading.value.submit) {
    return true
  } else {
    return !!(listName.value === '' || amountOfNumbers.value === '')
  }
})

onMounted(() => {
  if (
    !states.value &&
    !networks.value &&
    !ageRange.value &&
    !availableNumbers.value &&
    showView.value
  ) {
    fetchResources()
  }
})

async function fetchResources() {
  try {
    loading.value.resources = true
    error.value = false
    const [state, network, age, numbers] = await Promise.all([
      await api.phoneBook.fetchStates(),
      await api.phoneBook.fetchNetworks(),
      await api.phoneBook.fetchAgeRange(),
      await api.phoneBook.fetchAvailableNumbers({
        stateId: 0,
        lgaId: 0,
        gender: 0,
        ageRange: 0,
        network: 0,
      }),
    ])

    if (state.status === 1) {
      states.value = state.msg
    }
    if (network) {
      networks.value = network.msg
    }
    if (age) {
      ageRange.value = age.msg.filter((item) => item.age !== '')
    }
    if (numbers) {
      availableNumbers.value = numbers.msg
    }

    loading.value.resources = false
  } catch (err) {
    loading.value.resources = false
    error.value = true
  }
}
async function fetchAvailableNumbers() {
  try {
    loading.value.numbers = true
    const response = await api.phoneBook.fetchAvailableNumbers({
      stateId: Number(selectedState.value),
      lgaId: Number(selectedLga.value),
      gender: gender.value,
      ageRange: selectedAgeRange.value,
      network: selectedNetwork.value,
    })
    if (response.status) {
      availableNumbers.value = response.msg
    }
    loading.value.numbers = false
  } catch (err) {}
}
async function fetchLga(stateId: number) {
  try {
    loading.value.lga = true
    const response = await api.phoneBook.fetchLga(stateId)
    if (response.status) {
      lga.value = response.msg
    }
    loading.value.lga = false
  } catch (err) {}
}
const onSubmit = handleSubmit(async (values, { resetForm }) => {
  if (parseNumber(amountOfNumbers.value) > availableNumbers?.value) {
    $toast.fire({
      icon: 'error',
      title: "You can't buy more than the available numbers",
    })
  } else {
    try {
      loading.value.submit = true
      const response = await api.phoneBook.buyNumber({
        stateId: Number(values.selectedState),
        lgaId: Number(values.selectedLga),
        gender: values.gender,
        ageRange: values.selectedAgeRange,
        network: values.selectedNetwork,
        unitsToBuy: parseNumber(amountOfNumbers.value),
        contactListName: values.listName,
      })
      if (response.status === 1) {
        $toast.fire({
          icon: 'success',
          title: response.msg,
        })
        resetForm({
          values: {
            selectedState: '',
            selectedLga: '',
            selectedAgeRange: '',
            gender: '',
            selectedNetwork: '',
            listName: '',
            amountOfNumbers: '',
          },
        })
        unitCost.value = 0
        availableNumbers.value = 0
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
  }
})

appStore.setPageTitle('Purchase Numbers')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Multitexter BulkSMS - Purchase Numbers',
})
</script>
