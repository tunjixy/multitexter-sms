import ApiClient from '../api-client'
import type {
  ProfileRes,
  ProfileSummaryRes,
  UpdateProfileReq,
  UpdateProfileRes,
  ChangePasswordReq,
  ChangePasswordRes,
} from '@/types/profile'

class ProfileService extends ApiClient {
  fetchProfile(): Promise<ProfileRes> {
    return this.call<ProfileRes>('get', 'profile')
  }

  fetchProfileSummary(): Promise<ProfileSummaryRes> {
    return this.call<ProfileSummaryRes>('get', 'profile-summary')
  }

  updateProfile(payload: UpdateProfileReq): Promise<UpdateProfileRes> {
    return this.call<UpdateProfileRes>('post', 'update-profile', {
      firstname: payload.firstName,
      surname: payload.surname,
      othername: payload.otherName,
      email: payload.email,
      altemail: payload.otherEmail,
      mobile_number: payload.phoneNumber,
      other_number: payload.otherNumber,
      gender: payload.gender,
      displayname: payload.displayName,
      country: payload.countryId,
    })
  }

  changePassword(payload: ChangePasswordReq): Promise<ChangePasswordRes> {
    return this.call<ChangePasswordRes>('post', 'change-password', {
      current_password: payload.current_password,
      password: payload.password,
      password_confirmation: payload.password_confirmation,
    })
  }
}

export default ProfileService
