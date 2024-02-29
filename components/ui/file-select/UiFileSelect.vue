<template>
  <a href="#" class="block">
    <label
      v-if="!model"
      class="flex flex-col items-center px-4 py-6 transition-colors duration-500 ease-in-out border rounded-lg cursor-pointer border-grey dark:border-grey/10 shadow-custom hover:bg-grey/5"
    >
      <UploadIcon class="size-10 text-primary" />
      <span class="mt-2">
        <slot></slot>
      </span>
      <input
        ref="file"
        type="file"
        class="hidden"
        accept=".csv"
        @change="onFileSelected"
      />
    </label>
    <div
      v-else
      class="flex items-center justify-between gap-5 p-4 text-xs font-bold border rounded border-grey dark:border-grey/10 hover:bg-grey/5"
    >
      {{ filename }}
      <button class="ml-3" @click="removeFile">
        <DeleteIcon class="text-red-500 size-5" />
      </button>
    </div>
  </a>
</template>

<script setup lang="ts">
import DeleteIcon from '@/assets/icons/delete.svg?component'
import UploadIcon from '@/assets/icons/upload.svg?component'

const model = defineModel<File | null>()

const files = ref<File | null>()
const filename = ref('')

function onFileSelected(e: Event) {
  const target = e.target as HTMLInputElement
  const fileList = target.files
  if (fileList !== null) {
    files.value = fileList[0]
    filename.value = fileList[0].name
    model.value = fileList[0]
  }
}
function removeFile() {
  files.value = null
  filename.value = ''
  model.value = null
}
</script>
