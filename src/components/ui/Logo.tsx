import { Link } from 'react-router-dom'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  inverted?: boolean
}

export default function Logo({ className = '', size = 'md', inverted = false }: LogoProps) {
  const sizeStyles = {
    sm: {
      brand: 'text-lg tracking-[0.25em]',
      sub: 'text-[0.55rem] tracking-[0.14em]',
    },
    md: {
      brand: 'text-2xl tracking-[0.3em]',
      sub: 'text-[0.6875rem] tracking-[0.16em]',
    },
    lg: {
      brand: 'text-3xl sm:text-4xl tracking-[0.32em]',
      sub: 'text-xs tracking-[0.18em]',
    },
  }

  const textColor = inverted
    ? 'text-white'
    : 'text-[var(--color-primary)]'
  const subColor = inverted
    ? 'text-white/60'
    : 'text-[var(--color-secondary)]'

  return (
    <Link to="/" className={`flex flex-col items-start group select-none ${className}`}>
      {/* Primary Brand: ZAMYAA (Large, bold, uppercase luxury serif) */}
      <span
        className={`font-display font-semibold uppercase leading-none transition-opacity group-hover:opacity-85 ${sizeStyles[size].brand} ${textColor}`}
      >
        ZAMYAA
      </span>

      {/* Founder Sign-off: by jyoti (Small lowercase italic) */}
      <span
        className={`font-body italic leading-tight mt-1 transition-opacity ${sizeStyles[size].sub} ${subColor}`}
      >
        by jyoti
      </span>
    </Link>
  )
}

