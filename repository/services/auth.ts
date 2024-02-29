import ApiClient from '../api-client'
import type {
  LoginReq,
  LoginRes,
  SignUpReq,
  SignUpRes,
  ForgotPasswordRes,
  ResetPasswordReq,
  RequestVerificationLinkRes,
  UserDetailRes,
  ActivationStatusRes,
} from '@/types/auth'

class AuthService extends ApiClient {
  login(payload: LoginReq): Promise<LoginRes> {
    return this.call<LoginRes>('post', 'login', {
      email: payload.email,
      password: payload.password,
    })
  }

  signup(payload: SignUpReq): Promise<SignUpRes> {
    return this.call<SignUpRes>('post', 'register', {
      email: payload.email,
      firstname: payload.firstname,
      lastname: payload.lastname,
      mobile_number: payload.mobile_number,
      password: payload.password,
      password_confirmation: payload.password_confirmation,
    })
  }

  forgotPassword(email: string): Promise<ForgotPasswordRes> {
    return this.call<ForgotPasswordRes>('post', 'password/email', {
      email,
    })
  }

  resetPassword(payload: ResetPasswordReq): Promise<boolean> {
    return this.call<boolean>('post', 'password/reset', {
      email: payload.email,
      password: payload.password,
      password_confirmation: payload.password_confirmation,
      token: payload.token,
    })
  }

  resetVerificationLink(email: string): Promise<RequestVerificationLinkRes> {
    return this.call<RequestVerificationLinkRes>(
      'post',
      'user/resend-activate',
      {
        email,
      },
    )
  }

  fetchUserDetail(): Promise<UserDetailRes> {
    return this.call<UserDetailRes>('post', 'detail')
  }

  checkActivationStatus(code: string): Promise<ActivationStatusRes> {
    return this.call<ActivationStatusRes>('post', 'user/activate', {
      activation_code: code,
    })
  }
}

export default AuthService
