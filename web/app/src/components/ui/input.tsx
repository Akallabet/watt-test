import * as React from 'react'
import { cn, noop } from '@/lib/utils'
import { useRef } from 'react'

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

const FilterInput = React.forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onSelect' | 'onClear'> & {
    debounce?: number
    onSelect: (value: string) => void
    onClear?: () => void
  }
>(({ className, type, onSelect = noop, debounce = 500 }, ref) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      onSelect?.(event.target.value)
    }, debounce)
  }

  return (
    <input
      type={type}
      className={cn(
        'flex h-7 w-full rounded-sm border border-input bg-background px-1 text-xs shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      onChange={handleInputChange}
    />
  )
})
FilterInput.displayName = 'FilterInput'

export { Input, FilterInput }
