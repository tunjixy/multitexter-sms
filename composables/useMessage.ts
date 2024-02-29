const loading = ref(false)
const error = ref(false)

export default function useMessage() {
  const { api } = useApi()
  const {
    scheduledMessages,
    draftMessages,
    sentMessages,
    queuedMessages,
    smsStatus,
  } = storeToRefs(useMessageStore())

  const sentMessageCurrentPage = useState<number>(
    'sent-sms-current-page',
    () => 1,
  )
  const draftMessageCurrentPage = useState<number>(
    'draft-sms-current-page',
    () => 1,
  )
  const scheduledMessageCurrentPage = useState<number>(
    'scheduled-sms-current-page',
    () => 1,
  )
  const queueMessageCurrentPage = useState<number>(
    'queue-sms-current-page',
    () => 1,
  )
  const messageStatusCurrentPage = useState<number>(
    'sms-status-current-page',
    () => 1,
  )

  const sentMessagePerPage = useState<number>('sent-sms-per-page', () => 0)
  const draftMessagePerPage = useState<number>('draft-sms-per-page', () => 0)
  const scheduledMessagePerPage = useState<number>(
    'scheduled-sms-per-page',
    () => 0,
  )
  const queueMessagePerPage = useState<number>('queue-sms-per-page', () => 0)
  const messageStatusPerPage = useState<number>('sms-status-per-page', () => 0)

  const sentMessageTotalPage = useState<number>('sent-sms-total-page', () => 0)
  const draftMessageTotalPage = useState<number>(
    'draft-sms-total-page',
    () => 0,
  )
  const scheduledMessageTotalPage = useState<number>(
    'scheduled-sms-total-page',
    () => 0,
  )
  const queueMessageTotalPage = useState<number>(
    'queue-sms-total-page',
    () => 0,
  )
  const messageStatusTotalPage = useState<number>(
    'sms-status-total-page',
    () => 0,
  )

  async function fetchSentMessages(page?: number) {
    try {
      loading.value = true
      error.value = false
      const response = await api.message.fetchSentMessages(
        page || sentMessageCurrentPage.value,
      )
      if (response.status === 1) {
        sentMessages.value = response.data
        sentMessagePerPage.value = response.rows
        sentMessageTotalPage.value = response.total
      }
      loading.value = false
    } catch (err) {
      loading.value = false
      error.value = true
    }
  }

  async function fetchDrafts(page?: number) {
    try {
      loading.value = true
      error.value = false
      const response = await api.message.fetchDrafts(
        page || draftMessageCurrentPage.value,
      )
      if (response.status === 1) {
        draftMessages.value = response.data
        draftMessagePerPage.value = response.rows
        draftMessageTotalPage.value = response.total
      }
      loading.value = false
    } catch (err) {
      loading.value = false
      error.value = true
    }
  }

  async function fetchScheduledMessages(page?: number) {
    try {
      loading.value = true
      error.value = false
      const response = await api.message.fetchScheduledSMS(
        page || scheduledMessageCurrentPage.value,
      )
      if (response.status === 1) {
        scheduledMessages.value = response.data
        scheduledMessagePerPage.value = response.rows
        scheduledMessageTotalPage.value = response.total
      }
      loading.value = false
    } catch (err) {
      loading.value = false
      error.value = true
    }
  }

  async function fetchQueuedMessages(page?: number) {
    try {
      loading.value = true
      error.value = false
      const response = await api.message.fetchQueuedMessages(
        page || queueMessageCurrentPage.value,
      )
      if (response.status === 1) {
        queuedMessages.value = response.data
        queueMessagePerPage.value = response.rows
        queueMessageTotalPage.value = response.total
      }
      loading.value = false
    } catch (err) {
      loading.value = false
      error.value = true
    }
  }

  async function fetchMessageStatus(page?: number) {
    try {
      loading.value = true
      error.value = false
      const response = await api.message.fetchMessageStatus(
        page || messageStatusCurrentPage.value,
      )
      if (response.status === 1) {
        smsStatus.value = response.data.data
        messageStatusPerPage.value = response.data.per_page
        messageStatusTotalPage.value = response.data.total
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
    sentMessageCurrentPage,
    draftMessageCurrentPage,
    scheduledMessageCurrentPage,
    queueMessageCurrentPage,
    messageStatusCurrentPage,
    sentMessagePerPage,
    draftMessagePerPage,
    scheduledMessagePerPage,
    queueMessagePerPage,
    messageStatusPerPage,
    sentMessageTotalPage,
    draftMessageTotalPage,
    scheduledMessageTotalPage,
    queueMessageTotalPage,
    messageStatusTotalPage,
    fetchSentMessages,
    fetchDrafts,
    fetchScheduledMessages,
    fetchQueuedMessages,
    fetchMessageStatus,
  }
}
