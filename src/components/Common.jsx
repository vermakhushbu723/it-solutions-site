import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { site } from '../config/site'
import { bannerImage, partners } from '../data/pages'
import Icon from './Icon'
import PartnerLogo from './PartnerLogo'

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} - ${site.name}` : site.name
  }, [title])
}

export function Breadcrumbs({ title, trail = [] }) {
  const { pathname } = useLocation()
  return (
    <section className="breadcrumbs" style={{ '--bg': `url(${bannerImage(pathname)})` }}>
      <div className="container breadcrumbs-inner">
        <h1 className="page-title">{title}</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          {trail.map((t) => (
            <li key={t.label}>{t.to ? <Link to={t.to}>{t.label}</Link> : t.label}</li>
          ))}
          <li>{title}</li>
        </ul>
      </div>
    </section>
  )
}

export function CallToAction({
  title = 'Design. Deploy. Manage. — talk to an engineer today',
  button = 'Get A Quote',
}) {
  return (
    <section className="cta">
      <div className="container cta-inner">
        <h2>{title}</h2>
        <Link to="/contact" className="btn btn-orange">{button}</Link>
      </div>
    </section>
  )
}

// Auto-scrolling partner strip (CSS marquee); list is doubled for a seamless loop.
export function PartnerStrip({ items }) {
  const list = items || partners.map((p) => ({ name: p.name, color: p.color, to: '/partners' }))
  return (
    <section className="partner-strip">
      <div className="container">
        <div className="marquee">
          <div className="marquee-track">
            {[...list, ...list].map((p, i) => {
              const dup = i >= list.length
              const badge = (
                <span className="partner-badge" style={{ '--brand': p.color || '#d92d21' }}>
                  <PartnerLogo name={p.name} color={p.color || '#d92d21'} size={30} />
                  {p.name}
                </span>
              )
              return (
                <div className="partner-item" key={i} aria-hidden={dup}>
                  {p.to ? <Link to={p.to} tabIndex={dup ? -1 : 0}>{badge}</Link> : badge}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export function SectionTitle({ sub, title, desc, center = false, light = false }) {
  return (
    <div className={`sec-title ${center ? 'center' : ''} ${light ? 'light' : ''}`}>
      {sub && <span className="sub-text">{sub}</span>}
      <h2 className="title">{title}</h2>
      {desc && <p className="desc">{desc}</p>}
    </div>
  )
}

export function ScrollToTop() {
  const { pathname } = useLocation()
  const [show, setShow] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      className={`scroll-up ${show ? 'show' : ''}`}
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <Icon name="chevron" size={20} className="rot-180" />
    </button>
  )
}

// Counts up from 0 when scrolled into view.
export function Counter({ end, suffix = '' }) {
  const [val, setVal] = useState(0)
  const [ref, setRef] = useState(null)
  useEffect(() => {
    if (!ref) return
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (t) => {
        const p = Math.min((t - start) / 1500, 1)
        setVal(Math.round(end * p))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
    io.observe(ref)
    return () => io.disconnect()
  }, [ref, end])
  return <span ref={setRef}>{val}{suffix}</span>
}
