import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs text-[#A0A0A0] tracking-wide uppercase">
          {label}
        </label>
      )}
      <input
        className={`
          w-full bg-[#1A1A1A] border rounded-lg px-4 py-3 text-sm text-white
          placeholder:text-[#606060] transition-colors outline-none
          ${error
            ? 'border-[#EF4444] focus:border-[#EF4444]'
            : 'border-[#2A2A2A] focus:border-[#D4AF37]'
          }
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-xs text-[#EF4444]">{error}</span>
      )}
    </div>
  )
}
