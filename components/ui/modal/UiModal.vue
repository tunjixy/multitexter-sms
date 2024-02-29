<template>
  <teleport to="body">
    <TransitionFade :duration="300">
      <div
        v-show="showModal"
        class="relative z-40"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="fixed inset-0 transition ease-in-out bg-black/75 backdrop-blur-sm"
          aria-hidden="true"
          @click.self="closeIfDismissible()"
        ></div>

        <div class="fixed inset-0 z-40 w-screen overflow-y-auto scrollbar-thin">
          <div
            class="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0"
          >
            <Transition name="move-modal">
              <div
                v-if="showModal"
                class="relative w-full overflow-hidden text-left transition-all transform bg-white rounded-b-none shadow-xl rounded-t-2xl sm:rounded-lg dark:bg-dark-secondary sm:my-8 sm:max-w-lg"
              >
                <div
                  class="px-4 pt-5 pb-4 bg-white dark:bg-dark-secondary sm:p-6 sm:pb-4"
                >
                  <slot />
                  <button v-if="showCloseButton" @click="$emit('close')">
                    <TimesIcon class="absolute mb-5 size-6 top-4 right-4" />
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </TransitionFade>
  </teleport>
</template>

<script setup lang="ts">
import TimesIcon from '@/assets/icons/times.svg?component'

const props = withDefaults(
  defineProps<{
    isBlocking?: boolean
    showCloseButton?: boolean
  }>(),
  {
    isBlocking: false,
    showCloseButton: true,
  },
)

defineEmits(['close'])

const showModal = ref(false)

function open() {
  showModal.value = true
}
function close() {
  showModal.value = false
}
function closeIfDismissible() {
  if (!props.isBlocking) {
    showModal.value = false
  }
}
const escapeHandler = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && showModal.value) {
    closeIfDismissible()
  }
}

onMounted(() => {
  document.addEventListener('keydown', escapeHandler)
})

onUnmounted(() => {
  document.removeEventListener('keydown', escapeHandler)
  document.body.style.removeProperty('overflow')
})

watch(showModal, (value) => {
  if (value) {
    document.body.style.setProperty('overflow', 'hidden')
  } else {
    document.body.style.removeProperty('overflow')
  }
})

defineExpose({
  open,
  close,
})
</script>
