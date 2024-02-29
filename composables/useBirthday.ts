import type { Birthday } from '@/types/birthday'

const loading = ref(false)
const error = ref(false)

export default function useAuth() {
  const { api } = useApi()

  const birthdays = useState<Birthday[] | null>('birthdays', () => null)
  const currentPage = useState<number>('birthday-current-page', () => 1)
  const perPage = useState<number>('birthday-per-page', () => 0)
  const totalPage = useState<number>('birthday-total-page', () => 0)

  async function fetchBirthdays(page?: number) {
    try {
      loading.value = true
      error.value = false
      const response = await api.birthday.fetchBirthdays(
        page || currentPage.value,
      )
      if (response.status === 1) {
        birthdays.value = response.data
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
    birthdays,
    currentPage,
    perPage,
    totalPage,
    fetchBirthdays,
  }
}
