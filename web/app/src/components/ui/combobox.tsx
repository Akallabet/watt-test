'use client'

import { Check, ChevronsUpDown, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useRef, useState } from 'react'
import { Badge } from './badge'

function noop() {}

export type ComboboxProps = {
  data: { value: string; label: string }[]
  placeholder: string
  name?: string
  notFoundMessage: string
  modal?: boolean
  defaultValue?: string
  debounce?: number
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  onInputChange?: (value: string) => void
  onSelect?: (value: string) => void
  onOpenChange?: (open: boolean) => void
  onClear?: () => void
  open?: boolean
  disabled?: boolean
  clearButtonRef?: React.RefObject<HTMLButtonElement>
  addNew?: {
    enabled: boolean
    buttonText: string
    onSelect: (value: string) => void
  }
}

export function Combobox({
  data,
  placeholder,
  notFoundMessage,
  name,
  modal,
  defaultValue = '',
  size = 'default',
  className,
  onInputChange = noop,
  onSelect = noop,
  onOpenChange = noop,
  onClear = noop,
  debounce = 0,
  open: initialOpen = false,
  disabled = false,
  clearButtonRef,
  addNew = {
    enabled: false,
    buttonText: 'Aggiungi nuovo tag',
    onSelect: noop,
  },
}: ComboboxProps) {
  const [open, setOpen] = useState(initialOpen)
  const [value, setValue] = useState(defaultValue)
  const [newValue, setNewValue] = useState('')

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
    onOpenChange(open)
  }

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const handleInputChange = (value: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      onInputChange(value)
    }, debounce)
    if (addNew.enabled) {
      setNewValue(value)
    }
  }

  const handleClear = () => {
    setValue('')
    onClear()
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange} modal={modal}>
      <input type="hidden" name={name} defaultValue={value} />
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn('justify-between', className)}
          size={size}
        >
          {value && data.find(datum => datum.value === value)?.label}
          <div className="flex items-center gap-1">
            {value && (
              <span
                role="button"
                ref={clearButtonRef}
                onClick={e => {
                  e.preventDefault()
                  handleClear()
                }}
              >
                <X className="opacity-50" />
              </span>
            )}
            <ChevronsUpDown className="opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput
            placeholder={placeholder}
            disabled={false}
            className="h-9"
            onValueChange={handleInputChange}
          />
          <CommandList>
            {!addNew.enabled && <CommandEmpty>{notFoundMessage}</CommandEmpty>}
            <CommandGroup>
              {data.map(datum => (
                <CommandItem
                  key={datum.value}
                  value={datum.label}
                  onSelect={() => {
                    setValue(datum.value)
                    setOpen(false)
                    onSelect(datum.value)
                  }}
                >
                  {datum.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === datum.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
              {addNew.enabled && newValue && (
                <CommandItem
                  key="add-new"
                  value={newValue}
                  onSelect={() => {
                    addNew.onSelect(newValue)
                    setOpen(false)
                  }}
                >
                  {addNew.buttonText}
                  <Badge variant="secondary">{newValue}</Badge>
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
