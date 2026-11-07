import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface AccordionItem {
  id: string
  label: string
  content: React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  defaultOpen?: string
}

export function Accordion({ items, defaultOpen }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpen ?? null)

  return (
    <div className="divide-y" style={{ borderColor: 'var(--color-outline-variant)' }}>
      {items.map((item) => {
        const isOpen = openId === item.id
        return (
          <div key={item.id}>
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between py-4 text-left focus:outline-none"
            >
              <span
                className="text-[0.75rem] tracking-[0.2em] uppercase font-semibold font-body"
                style={{ color: 'var(--color-on-surface)' }}
              >
                {item.label}
              </span>
              {isOpen
                ? <ChevronUp size={16} style={{ color: 'var(--color-secondary)' }} />
                : <ChevronDown size={16} style={{ color: 'var(--color-secondary)' }} />}
            </button>
            {isOpen && (
              <div className="pb-5 font-body text-sm leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

