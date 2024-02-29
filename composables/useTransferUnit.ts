import type { RecentTransfer } from '@/types/transfer'

const loading = ref(false)
const error = ref(false)

export default function useTransferUnit() {
  // Reusable composable not related to this composable
  const { api } = useApi()

  const recentTransfers = useState<RecentTransfer[] | null>(
    'recent-transfers',
    () => null,
  )

  const modifiedTransfers = computed(() => {
    if (recentTransfers.value) {
      return recentTransfers.value.slice(0, 20).sort((a, b) => {
        const currDate = new Date(a.date_shared)
        const nextDate = new Date(b.date_shared)

        if (currDate > nextDate) {
          return -1
        }
        if (currDate < nextDate) {
          return 1
        }

        return 0
      })
    }
  })

  async function fetchRecentTransfers() {
    try {
      loading.value = true
      error.value = false
      const response = await api.transfer.fetchRecentTransfers()
      if (response.status === 1) {
        recentTransfers.value = response.data
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
    recentTransfers,
    modifiedTransfers,
    fetchRecentTransfers,
  }
}
