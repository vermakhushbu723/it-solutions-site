import { site } from '../config/site'

export default function Logo({ light = false }) {
  return (
    <span className={`logo ${light ? 'logo-light' : ''}`}>
      <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
        <rect width="40" height="40" rx="9" fill="#d92d21" />
        <path d="M9 29 20 9l11 20h-7l-4-7-4 7z" fill="#fff" />
        <circle cx="31" cy="10" r="4" fill="#f2541b" />
      </svg>
      <span className="logo-text">
        <strong>{site.shortName}</strong>
        <small>IT Solutions</small>
      </span>
    </span>
  )
}
