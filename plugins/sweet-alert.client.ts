import Swal from 'sweetalert2'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      swal: Swal.mixin({
        confirmButtonColor: '#40c2f3',
        buttonsStyling: false,
        customClass: {
          popup: 'popup',
          title: 'popup-title',
          confirmButton: 'popup-button',
          cancelButton: 'popup-button-cancel',
          htmlContainer: 'popup-description',
        },
      }),
      toast: Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        customClass: {
          popup: 'popup',
          title: 'popup-title',
          confirmButton: 'popup-button',
          cancelButton: 'popup-button-cancel',
          htmlContainer: 'popup-description',
        },
        // timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer
          toast.onmouseleave = Swal.resumeTimer
        },
      }),
    },
  }
})
