import Cookies from 'js-cookie'
import type { LoginRes } from '@/types/auth'
import type { User } from '@/types/user'

export default function useAuth() {
  const { api } = useApi()
  const { user, userDetail } = storeToRefs(useUserStore())

  function handleLoginResponse(response: LoginRes) {
    const today = new Date()
    const newDate = new Date(today.setDate(today.getDate() + 30))

    const token = useCookie<null | undefined | string>('mt_token', {
      expires: newDate,
    })
    token.value = response.token

    // Store user
    useLocalStorage<User>('user', response.data)

    // Check for last visit and remove from cookies
    const lastVisit = Cookies.get('last_visit')
    Cookies.remove('last_visit')
    if (lastVisit) {
      return lastVisit
    }
    return '/dashboard/compose-sms'
  }
  async function fetchUserDetails() {
    user.value = JSON.parse(localStorage.getItem('user') || '{}') as User

    try {
      const response = await api.auth.fetchUserDetail()
      if (response) {
        userDetail.value = response.success
      }
    } catch (error) {}
  }
  function logout() {
    navigateTo('/logout')
  }

  return {
    handleLoginResponse,
    fetchUserDetails,
    logout,
  }
}
