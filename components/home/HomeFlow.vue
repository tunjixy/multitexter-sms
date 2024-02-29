<template>
  <div class="max-w-3xl mx-auto mt-10">
    <UiProgress v-model="progress" class="max-w-lg mx-auto" />
    <LazyUiButton
      v-if="currentStepNumber > 1"
      variant="outline"
      class="flex items-center mt-8"
      :disabled="loading"
      @click="navigateToPreviousStep"
    >
      <LeftIcon class="mr-2 size-4" />
      Back
    </LazyUiButton>
    <TransitionFade :duration="300" mode="out-in">
      <keep-alive>
        <HomeMessageDetail
          v-if="currentStepNumber === 1"
          @update="processStep"
          @next-step="goToNextStep"
        />
        <HomeAccountDetail v-else-if="currentStepNumber === 2" />
      </keep-alive>
    </TransitionFade>
  </div>
</template>

<script setup lang="ts">
import type { SMSInfo, HomeStep } from '@/types'
import LeftIcon from '@/assets/icons/chevron-left.svg?component'

// Reusable composable related to this component
const { loading } = useHomeFlow()

const steps = ref([
  'HomeMessageDetail', // step 1
  'HomeAccountDetail', // step 2
])
const currentStepNumber = ref(1)
const form = ref<SMSInfo>({
  sender: '',
  message: '',
  recipients: '',
})

const totalSteps = computed(() => {
  return steps.value.length
})
const progress = computed(() => {
  return (currentStepNumber.value / totalSteps.value) * 100
})

function navigateToPreviousStep() {
  currentStepNumber.value--
}
function goToNextStep(step: number) {
  currentStepNumber.value = step
}
function processStep(payload: HomeStep) {
  Object.assign(form.value, payload.form)
  localStorage.setItem('message', JSON.stringify(payload.form))
}
</script>
