import { Link } from 'react-router-dom'
import { alliances } from '../data/alliances'

// Clean partner-logo strip under the hero: white background, no cards or borders,
// large logos spaced out, scrolling slowly right -> left.
export default function Ticker() {
  const logos = alliances
  return (
    <section className="logo-ticker" aria-label="Our technology partners">
      <div className="logo-ticker-row">
        <div className="logo-ticker-track" style={{ animationDuration: `${logos.length * 3}s` }}>
          {[...logos, ...logos].map((a, i) => (
            <Link
              to={`/partners/${a.slug}`}
              className="logo-ticker-item"
              key={i}
              aria-hidden={i >= logos.length}
              tabIndex={i >= logos.length ? -1 : 0}
            >
              <img src={a.logo} alt={i >= logos.length ? '' : `${a.name} logo`} loading="lazy" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
