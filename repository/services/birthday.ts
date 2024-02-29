import ApiClient from '../api-client'
import type {
  BirthdayRes,
  BirthdayStatusRes,
  DeleteBirthdayRes,
  BirthdayEntryReq,
  BirthdayCreateReq,
  BirthdayEntryRes,
  UploadBirthdayRes,
} from '@/types/birthday'

class BirthdayService extends ApiClient {
  fetchBirthdays(page: number): Promise<BirthdayRes> {
    return this.call<BirthdayRes>('get', `birthday/list?page=${page}`)
  }

  stopBirthday(id: number): Promise<BirthdayStatusRes> {
    return this.call<BirthdayStatusRes>('post', `birthday/stop/${id}`)
  }

  startBirthday(id: number): Promise<BirthdayStatusRes> {
    return this.call<BirthdayStatusRes>('post', `birthday/start/${id}`)
  }

  createBirthday(entries: BirthdayCreateReq[]): Promise<BirthdayEntryRes> {
    return this.call<BirthdayEntryRes>('post', 'birthday/create', {
      birthdayinputs: entries,
    })
  }

  updateBirthday(payload: BirthdayEntryReq): Promise<BirthdayEntryRes> {
    return this.call<BirthdayEntryRes>(
      'post',
      `birthday/update/${payload.id}`,
      {
        displayname: payload.displayName,
        message: payload.message,
        birthday: payload.birthday,
        send_time: payload.sendTime,
        mobile_number: payload.phoneNumber,
        contact_name: payload.contactName,
      },
    )
  }

  uploadBirthday(formData: FormData): Promise<UploadBirthdayRes> {
    return this.call<UploadBirthdayRes>('post', 'birthday-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  deleteBirthday(id: number): Promise<DeleteBirthdayRes> {
    return this.call<DeleteBirthdayRes>('post', `birthday/delete/${id}`)
  }
}

export default BirthdayService
