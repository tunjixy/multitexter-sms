<template>
  <UiModal ref="modal" @close="closeModal()">
    <h2 class="text-lg font-bold">
      {{ isEditing ? 'Edit list' : 'Create List' }}
    </h2>
    <form class="mt-5" @submit.prevent="onSubmit">
      <div>
        <UiLabel for="listName">Name of your list</UiLabel>
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
        <FormError v-show="errors.listName" :message="errors.listName" />
      </div>
      <UiButton
        type="submit"
        :disabled="disabled"
        class="flex mt-8 ml-auto shadow-btn"
      >
        <SpinLoader v-show="loading" class="mr-2" />
        {{ loading ? 'Please wait' : 'Submit' }}
      </UiButton>
    </form>
  </UiModal>
</template>

<script setup lang="ts">
import * as Yup from 'yup'
import { useField, useForm } from 'vee-validate'
import type { EditContactList } from '@/types/phonebook'
import UiModal from '@/components/ui/modal/UiModal.vue'

const props = defineProps<{
  contactList: EditContactList | null
  isEditing: boolean
}>()

const emit = defineEmits(['onListUpdated'])

const { $toast } = useNuxtApp()

// Reuseable function not specific to this component
const { api } = useApi()

const schema = Yup.object().shape({
  listName: Yup.string().required().label('List name').trim(),
})
const { errors, handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    listName: '',
  },
})
const { value: listName } = useField<string>('listName')
const loading = ref(false)

const disabled = computed(() => {
  if (loading.value) {
    return true
  } else {
    return !!(listName.value === '' || errors.value.listName)
  }
})

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true
    const response = props.isEditing
      ? await api.phoneBook.updateContactList({
          listId: props.contactList?.listId,
          name: values.listName,
        })
      : await api.phoneBook.createContactList({
          name: values.listName,
        })
    if (response.status === 1) {
      emit('onListUpdated')
      $toast.fire({
        icon: 'success',
        title: `List ${props.isEditing ? 'updated' : 'created'} successfully`,
      })
      closeModal()
    } else {
      $toast.fire({
        icon: 'error',
        title:
          response.msg ||
          `Error ${props.isEditing ? 'updating' : 'creating'} list`,
      })
    }
    loading.value = false
  } catch (err: any) {
    $toast.fire({
      icon: 'error',
      title: formatErrorResponse(err),
    })
    loading.value = false
  }
})

watch(
  () => props.contactList,
  (val) => {
    if (val != null) {
      listName.value = props.contactList?.listName as string
    } else {
      resetForm({
        values: {
          listName: '',
        },
      })
    }
  },
  { immediate: true },
)

// Modal
const modal = ref<InstanceType<typeof UiModal> | null>(null)

function open() {
  modal.value?.open()
}
function closeModal() {
  modal.value?.close()
}

defineExpose({
  open,
  closeModal,
})
</script>
