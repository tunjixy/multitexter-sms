export default defineNuxtRouteMiddleware(() => {
  const token = useCookie('mt_token')
  if (token.value) {
    return navigateTo('/dashboard')
  }
})
