import ApiClient from '../api-client'
import type {
  CountryRes,
  BankRes,
  SubmitPaymentDetailsRes,
  SenderIdRes,
  CreateSenderIdReq,
  CreateSenderIdRes,
  DeleteSenderIdRes,
  UnsubscribeRes,
} from '@/types/misc'

class MiscService extends ApiClient {
  fetchCountries(): Promise<CountryRes> {
    return this.call<CountryRes>('get', 'country-code')
  }

  fetchBanks(): Promise<BankRes> {
    return this.call<BankRes>('get', 'banks')
  }

  submitPaymentDetails(formData: FormData): Promise<SubmitPaymentDetailsRes> {
    return this.call<SubmitPaymentDetailsRes>(
      'post',
      'payment-user',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
  }

  fetchSenderId(): Promise<SenderIdRes> {
    return this.call<SenderIdRes>('get', 'get-sender')
  }

  createSenderId(payload: CreateSenderIdReq): Promise<CreateSenderIdRes> {
    return this.call<CreateSenderIdRes>('post', 'register-sender', {
      sender_name: payload.senderName,
      company_name: payload.companyName,
      cac_number: payload.cacNumber,
      business_nature: payload.businessNature,
      service_description: payload.serviceDescription,
      sample_message: payload.sampleMessage,
    })
  }

  deleteSenderId(senderName: string): Promise<DeleteSenderIdRes> {
    return this.call<DeleteSenderIdRes>('post', 'delete-sender', {
      sender_name: senderName,
    })
  }

  unsubscribe(userId: string, phoneNumber: string): Promise<UnsubscribeRes> {
    return this.call<UnsubscribeRes>('post', 'unsubscribe', {
      userid: userId,
      mobile_number: phoneNumber,
    })
  }
}

export default MiscService
