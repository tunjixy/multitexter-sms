import type { ContactList } from '@/types/phonebook'

type LIST_TYPE = 'create' | 'add'

const loading = ref(false)
const error = ref(false)

export default function useContactList() {
  const { api } = useApi()

  const currentPage = useState<number>('contact-list-current-page', () => 1)
  const perPage = useState<number>('contact-list-per-page', () => 0)
  const totalPage = useState<number>('contact-list-total-page', () => 0)
  const contactLists = useState<ContactList[] | null>(
    'contactLists',
    () => null,
  )
  const listOptions = [
    { title: 'Create new list', value: 'create' },
    { title: 'Add to existing lists', value: 'add' },
  ]
  const selectedListOption = ref<LIST_TYPE>('create')
  const listName = ref('')
  const selectedListId = ref('')

  async function fetchContactLists(page?: number) {
    try {
      loading.value = true
      error.value = false
      const response = await api.phoneBook.fetchContactLists(page)
      if (response.status === 1) {
        contactLists.value = response.data
        perPage.value = response.rows
        totalPage.value = response.total
      }
      loading.value = false
    } catch (err) {
      loading.value = false
      error.value = true
    }
  }

  return {
    loading,
    error,
    contactLists,
    selectedListOption,
    listName,
    selectedListId,
    listOptions,
    currentPage,
    totalPage,
    perPage,
    fetchContactLists,
  }
}
