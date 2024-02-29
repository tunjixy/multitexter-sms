import { type VariantProps, cva } from 'class-variance-authority'

export { default as UiAlert } from './UiAlert.vue'
export { default as AlertTitle } from './AlertTitle.vue'
export { default as AlertDescription } from './AlertDescription.vue'

export const alertVariants = cva(
  'relative w-full rounded-lg border border-slate-200 p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-slate-950 dark:border-slate-800 dark:[&>svg]:text-slate-50',
  {
    variants: {
      variant: {
        default:
          'border-blue-500/50 text-blue-500 [&>svg]:text-blue-500 dark:border-blue-400/30 dark:text-blue-400 dark:[&>svg]:text-blue-400',
        success:
          'border-green-500/50 text-green-500 [&>svg]:text-green-500 dark:border-green-400/30 dark:text-green-400 dark:[&>svg]:text-green-400',
        warning:
          'border-yellow-500/50 text-yellow-500 [&>svg]:text-yellow-500 dark:border-yellow-400/50 dark:text-yellow-400 dark:[&>svg]:text-yellow-400',
        destructive:
          'border-red-500/50 text-red-500 [&>svg]:text-red-500 dark:border-red-400/50 dark:text-red-400 dark:[&>svg]:text-red-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type AlertVariants = VariantProps<typeof alertVariants>
