import { defineStore } from 'pinia'
import type { MessageStore } from '~/types/message'

export const useMessageStore = defineStore('messageStore', {
  state: (): MessageStore => ({
    senderIds: null,
    queuedMessages: null,
    smsStatus: null,
    sentMessages: null,
    scheduledMessages: null,
    draftMessages: null,
  }),
})
