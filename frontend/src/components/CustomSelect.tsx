import { useEffect, useId, useRef, useState } from 'react'

export type SelectOption = {
  value: string | number
  label: string
}

interface CustomSelectProps {
  id?: string
  value: string | number
  onChange: (value: string | number) => void
  options: SelectOption[]
  className?: string
  'aria-label'?: string
}

/** Dark-themed dropdown — avoids native white/blue select popup */
export default function CustomSelect({
  id,
  value,
  onChange,
  options,
  className = '',
  'aria-label': ariaLabel,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()
  const selected = options.find((o) => o.value === value) ?? options[0]

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <div ref={rootRef} className={`custom-select ${className}`.trim()} id={id}>
      <button
        type="button"
        className="custom-select-trigger"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-label={ariaLabel ?? selected.label}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="truncate">{selected.label}</span>
        <span className="custom-select-chevron" aria-hidden>
          ▾
        </span>
      </button>
      {open && (
        <ul id={listId} className="custom-select-menu" role="listbox">
          {options.map((o) => {
            const active = o.value === value
            return (
              <li key={String(o.value)} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={`custom-select-option ${active ? 'custom-select-option--active' : ''}`}
                  onClick={() => {
                    onChange(o.value)
                    setOpen(false)
                  }}
                >
                  {o.label}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
