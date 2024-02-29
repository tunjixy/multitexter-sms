import { cva } from 'class-variance-authority'

export { default as UiButton } from './UiButton.vue'

export const buttonVariants = cva(
  'inline-flex items-center justify-center text-base rounded-md whitespace-nowrap font-bold transition-colors duration-300 outline-none focus-visible:outline focus-visible:outline-primary focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed shadow-btn',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary-dark',
        destructive:
          'bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90',
        outline:
          'border border-primary bg-transparent hover:bg-primary/20 text-primary',
        secondary:
          'bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80',
        ghost: 'shadow-none font-normal',
        link: 'text-slate-900 underline-offset-4 hover:underline dark:text-slate-50',
      },
      size: {
        default: 'min-h-10 px-6',
        sm: 'min-h-9 rounded-md px-3',
        lg: 'min-h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)
