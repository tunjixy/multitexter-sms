import ApiClient from '../api-client'
import type {
  DraftMessageRes,
  DraftMessagesRes,
  MessageDeleteRes,
  SentMessageRes,
  SentMessagesRes,
  ScheduledMessageRes,
  ScheduledMessagesRes,
  SMSStatusRes,
  MessageResendRes,
  QueuedSMSRes,
  SMSDetailRes,
  RecurrentType,
  MessageReq,
  MessageRes,
} from '@/types/message'

class MessageService extends ApiClient {
  fetchDrafts(page: number): Promise<DraftMessagesRes> {
    return this.call<DraftMessagesRes>('get', `message/draft?page=${page}`)
  }

  fetchDraft(id: number): Promise<DraftMessageRes> {
    return this.call<DraftMessageRes>('get', `message/draft/${id}`)
  }

  deleteDraft(id: number): Promise<MessageDeleteRes> {
    return this.call<MessageDeleteRes>('post', `draft/delete/${id}`)
  }

  fetchSentMessages(page: number): Promise<SentMessagesRes> {
    return this.call<SentMessagesRes>('get', `message/sent?page=${page}`)
  }

  fetchSentMessage(id: number): Promise<SentMessageRes> {
    return this.call<SentMessageRes>('get', `message/sent/${id}`)
  }

  deleteSentMessage(id: number): Promise<MessageDeleteRes> {
    return this.call<MessageDeleteRes>('post', 'message/delete', {
      messageids: id,
    })
  }

  fetchScheduledSMS(page: number): Promise<ScheduledMessagesRes> {
    return this.call<ScheduledMessagesRes>(
      'get',
      `scheduled/message?page=${page}`,
    )
  }

  fetchScheduled(id: number): Promise<ScheduledMessageRes> {
    return this.call<ScheduledMessageRes>('get', `scheduled/message/${id}`)
  }

  editScheduledMessage(payload: MessageReq): Promise<MessageRes> {
    return this.call<MessageRes>('post', `scheduled/update/${payload.id}`, {
      displayname: payload.senderName,
      message: payload.message,
      recipients: payload.recipients,
      country_id: payload.countryCode,
      listids: payload.listIds,
      dispatchtime: payload.sendTime,
      message_type_id: payload.messageType,
      forcednd: payload.dnd,
      recurrent_type: payload.recurrentType,
      recurrent_count: payload.recurrentCount,
      sendlater: payload.sendLater,
      source: payload.source,
    })
  }

  stopScheduledMessage(id: number): Promise<MessageDeleteRes> {
    return this.call<MessageDeleteRes>('post', `scheduled/pause/${id}`)
  }

  startScheduledMessage(id: number): Promise<MessageDeleteRes> {
    return this.call<MessageDeleteRes>('post', `scheduled/start/${id}`)
  }

  deleteScheduledMessage(id: number): Promise<MessageDeleteRes> {
    return this.call<MessageDeleteRes>('post', 'scheduled/delete', {
      messageids: id,
    })
  }

  fetchMessageStatus(page: number): Promise<SMSStatusRes> {
    return this.call<SMSStatusRes>('get', `bulksms/status?page=${page}`)
  }

  resendMessage(id: string): Promise<MessageResendRes> {
    return this.call<MessageResendRes>('get', `bulksms/restart/${id}`)
  }

  fetchQueuedMessages(page: number): Promise<QueuedSMSRes> {
    return this.call<QueuedSMSRes>('get', `queued-messages?page=${page}`)
  }

  fetchMessageDetail(id: string): Promise<SMSDetailRes> {
    return this.call<SMSDetailRes>('get', `bulksms/status/${id}`)
  }

  fetchRecurrentType(): Promise<RecurrentType[]> {
    return this.call<RecurrentType[]>('get', 'recurrent-type')
  }

  sendMessage(payload: MessageReq): Promise<MessageRes> {
    return this.call<MessageRes>('post', 'sendsms', {
      sender_name: payload.senderName,
      message: payload.message,
      recipients: payload.recipients,
      forcednd: payload.dnd,
      listids: payload.listIds,
      country_code: payload.countryCode,
      message_type: payload.messageType,
      source: payload.source,
      sendtime: payload.sendTime,
      recurrent_type: payload.recurrentType,
      recurrent_count: payload.recurrentCount,
      sendlater: payload.sendLater,
    })
  }

  saveAsDraft(payload: MessageReq): Promise<MessageRes> {
    return this.call<MessageRes>('post', 'draft/save', {
      displayname: payload.senderName,
      message: payload.message,
      recipients: payload.recipients,
      forcednd: payload.dnd,
      listids: payload.listIds,
      source: payload.source,
    })
  }
}

export default MessageService
