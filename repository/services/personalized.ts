import ApiClient from '../api-client'
import type {
  VerifiedSenderRes,
  UploadTemplateRes,
  PreviewMessageReq,
  PreviewMessageRes,
  SendMessageReq,
  SendMessageRes,
} from '@/types/personalized'

class PersonalizedService extends ApiClient {
  fetchVerifiedSenderId(): Promise<VerifiedSenderRes> {
    return this.call<VerifiedSenderRes>('get', 'verified-sender')
  }

  uploadPersonalizedTemplate(formData: FormData): Promise<UploadTemplateRes> {
    return this.call<UploadTemplateRes>(
      'post',
      'personalized/messages',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
  }

  previewMessage(payload: PreviewMessageReq): Promise<PreviewMessageRes> {
    return this.call<PreviewMessageRes>('post', 'personalized/firstmessage', {
      fileurl: payload.url,
      filename: payload.filename,
      message: payload.message,
    })
  }

  sendMessage(payload: SendMessageReq): Promise<SendMessageRes> {
    return this.call<SendMessageRes>('post', 'personalized/send', {
      fileurl: payload.fileUrl,
      filename: payload.filename,
      message: payload.message,
      displayname: payload.displayname,
      forcednd: payload.dnd,
    })
  }
}

export default PersonalizedService
