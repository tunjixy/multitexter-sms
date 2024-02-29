export default function usePassword() {
  const currentPasswordRef = ref<HTMLInputElement | null>(null)
  const passwordRef = ref<HTMLInputElement | null>(null)
  const confirmPasswordRef = ref<HTMLInputElement | null>(null)
  const currentPasswordVisibility = ref(false)
  const passwordVisibility = ref(false)
  const confirmPasswordVisibility = ref(false)

  function toggleCurrentPasswordVisibility() {
    if (currentPasswordRef.value !== null) {
      if (currentPasswordRef.value.type === 'password') {
        currentPasswordVisibility.value = true
        currentPasswordRef.value.type = 'text'
      } else {
        currentPasswordVisibility.value = false
        currentPasswordRef.value.type = 'password'
      }
    }
  }
  function togglePasswordVisibility() {
    if (passwordRef.value !== null) {
      if (passwordRef.value.type === 'password') {
        passwordVisibility.value = true
        passwordRef.value.type = 'text'
      } else {
        passwordVisibility.value = false
        passwordRef.value.type = 'password'
      }
    }
  }
  function toggleConfirmPasswordVisibility() {
    if (confirmPasswordRef.value !== null) {
      if (confirmPasswordRef.value.type === 'password') {
        confirmPasswordVisibility.value = true
        confirmPasswordRef.value.type = 'text'
      } else {
        confirmPasswordVisibility.value = false
        confirmPasswordRef.value.type = 'password'
      }
    }
  }

  return {
    currentPasswordRef,
    passwordRef,
    confirmPasswordRef,
    currentPasswordVisibility,
    passwordVisibility,
    confirmPasswordVisibility,
    toggleCurrentPasswordVisibility,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  }
}
