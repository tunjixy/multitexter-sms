export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('mt_token')
  const lastVisit = useCookie('last_visit')

  if (!token.value) {
    lastVisit.value = to.fullPath
    return navigateTo('/logout')
  }
})
