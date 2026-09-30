import { useState } from 'react'

// Simple Icons slugs (https://simpleicons.org) for brands that have one.
const iconSlug = {
  'Dell Technologies': 'dell',
  Fortinet: 'fortinet',
  Veeam: 'veeam',
  VMware: 'vmware',
  Cisco: 'cisco',
  Lenovo: 'lenovo',
  Sonicwall: 'sonicwall',
  GCP: 'googlecloud',
  'Google Cloud': 'googlecloud',
  Teams: 'microsoftteams',
}

function MicrosoftMark({ size }) {
  const g = size * 0.06
  const q = (size - g) / 2
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <rect width={q} height={q} fill="#f25022" />
      <rect x={q + g} width={q} height={q} fill="#7fba00" />
      <rect y={q + g} width={q} height={q} fill="#00a4ef" />
      <rect x={q + g} y={q + g} width={q} height={q} fill="#ffb900" />
    </svg>
  )
}

function HpeMark({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="7" width="20" height="10" rx="0.5" fill="none" stroke="#01a982" strokeWidth="2.6" />
    </svg>
  )
}

function LetterMark({ name, color, size }) {
  const letters = name === 'AWS' ? 'aws' : name.slice(0, 1)
  return (
    <span
      aria-hidden="true"
      className="letter-mark"
      style={{ width: size, height: size, background: color, fontSize: letters.length > 1 ? size * 0.36 : size * 0.55 }}
    >
      {letters}
    </span>
  )
}

/** Brand mark for a partner or platform — falls back to a coloured letter badge. */
export default function PartnerLogo({ name, color = '#d92d21', size = 28 }) {
  const [failed, setFailed] = useState(false)

  if (['Microsoft', 'Azure', 'Microsoft Azure', 'M365', 'Microsoft 365'].includes(name)) return <MicrosoftMark size={size} />
  if (name === 'HPE') return <HpeMark size={size} />

  const slug = iconSlug[name]
  if (slug && !failed) {
    return (
      <img
        src={`https://cdn.simpleicons.org/${slug}/${color.replace('#', '')}`}
        alt="" aria-hidden="true" width={size} height={size} loading="lazy"
        onError={() => setFailed(true)}
        style={{ width: size, height: size, objectFit: 'contain', flexShrink: 0 }}
      />
    )
  }
  return <LetterMark name={name} color={color} size={size} />
}
