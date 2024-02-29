import type { LoginReq, SignUpReq } from '@/types/auth'

const loading = ref(false)

export default function useHomeFlow() {
  // Reuseable composable not related to this component
  const { api } = useApi()
  const { $toast } = useNuxtApp()

  // Reusable composable related to this component
  const { handleLoginResponse } = useAuth()

  async function loginUser(payload: LoginReq) {
    try {
      loading.value = true
      const response = await api.auth.login({
        email: payload.email,
        password: payload.password,
      })
      if (response.status === 1) {
        navigateTo(handleLoginResponse(response))
      } else if (response.status === -2 || response.status === -3) {
        $toast.fire({
          icon: 'error',
          title: response.msg,
        })
      }
      loading.value = false
    } catch (err: any) {
      loading.value = false
      $toast.fire({
        icon: 'error',
        title: formatErrorResponse(err),
      })
    }
  }

  async function registerUser(payload: SignUpReq) {
    try {
      loading.value = true
      const response = await api.auth.signup({
        firstname: payload.firstname,
        lastname: payload.lastname,
        email: payload.email,
        mobile_number: payload.mobile_number,
        password: payload.password,
        password_confirmation: payload.password_confirmation,
      })
      if (response.status === 1) {
        // After registering user, Login user
        const response = await api.auth.login({
          email: payload.email,
          password: payload.password,
        })
        if (response.status === 1) {
          navigateTo(handleLoginResponse(response))
        }
      } else if (response.status === -2) {
        $toast.fire({
          icon: 'error',
          title: response.data.msg.split('.'),
        })
      }
      loading.value = false
    } catch (err: any) {
      $toast.fire({
        icon: 'error',
        title: formatErrorResponse(err),
      })
      loading.value = false
    }
  }

  return {
    loading,
    loginUser,
    registerUser,
  }
}
