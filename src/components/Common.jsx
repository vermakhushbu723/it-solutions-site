import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { site } from '../config/site'
import { bannerImage, partners, solutionFamilies } from '../data/pages'
import { home } from '../data/pxImages'
import { allianceLogoImages } from '../data/logos'
import Icon from './Icon'
import PartnerLogo from './PartnerLogo'
import Ticker from './Ticker'

// Same tab title on every page, as on the ProXinet site.
export const SITE_TITLE = 'ProXinet Technologies — IT Infrastructure Solutions'

// eslint-disable-next-line no-unused-vars
export function usePageTitle(_title) {
  useEffect(() => {
    document.title = SITE_TITLE
  }, [])
}

/** Full-width page-title banner with the page's photo behind it, followed by the partner logo strip. */
export function PageBanner({ title, sub, trail = [], image }) {
  const { pathname } = useLocation()
  return (
    <>
    <section className="banner center" style={{ '--bg': `url(${image || bannerImage(pathname)})` }}>
      <div className="container">
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
        <ul className="crumbs">
          <li><Link to="/">Home</Link></li>
          {trail.map((t) => (
            <li key={t.label}>{t.to ? <Link to={t.to}>{t.label}</Link> : t.label}</li>
          ))}
          <li>{title}</li>
        </ul>
      </div>
    </section>
    <Ticker />
    </>
  )
}

export function SectionTitle({ sub, title, desc, center = false, light = false }) {
  return (
    <div className={`sec-title ${center ? 'center' : ''} ${light ? 'light' : ''}`}>
      {sub && <span className="sub-text">{sub}</span>}
      <h2 className="title">{title}</h2>
      <div className="divider" />
      {desc && <p className="desc">{desc}</p>}
    </div>
  )
}

/** Auto-scrolling logo strip (alliances / clients). */
export function LogoStrip({ items }) {
  const list = items || partners.map((p) => ({ name: p.name, color: p.color }))
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[...list, ...list].map((p, i) => (
          <div className="logo-card" key={i} aria-hidden={i >= list.length} style={{ '--brand': p.color || '#0074c7' }}>
            <PartnerLogo name={p.name} color={p.color || '#0074c7'} size={30} />
            <span>{p.name}{p.sub && <small>{p.sub}</small>}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Auto-scrolling strip of real logo images (alliances by default). */
export function ImageLogoStrip({ images = allianceLogoImages, reverse = false }) {
  return (
    <div className="marquee">
      <div className={`marquee-track ${reverse ? 'reverse' : ''}`}>
        {[...images, ...images].map((src, i) => (
          <div className="logo-img-card" key={i} aria-hidden={i >= images.length}>
            <img src={src} alt={i >= images.length ? '' : 'Partner logo'} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  )
}

/** Contact form section (image + enquiry form), used at the bottom of pages. */
export function ContactStrip({ title = 'Get in touch', gray = false }) {
  const empty = { name: '', email: '', phone: '', service: '', message: '' }
  const [form, setForm] = useState(empty)
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    // Hook up your backend / email service here.
    setSent(true)
    setForm(empty)
  }
  return (
    <section className={`section contact-strip ${gray ? 'gray-1' : ''}`}>
      <div className="container row">
        <div className="row-img"><img src={home.contact} alt="ProXinet support desk" loading="lazy" /></div>
        <div>
          <SectionTitle sub={site.tagline} title={title} />
          {sent && <div className="alert">Thank you! We will get back to you shortly.</div>}
          <form className="form" onSubmit={submit}>
            <input required placeholder="Your Name" value={form.name} onChange={set('name')} />
            <input required type="email" placeholder="Your Email" value={form.email} onChange={set('email')} />
            <input placeholder="Phone Number" value={form.phone} onChange={set('phone')} />
            <select value={form.service} onChange={set('service')}>
              <option value="">Select Solution</option>
              {solutionFamilies.map((s) => <option key={s.slug}>{s.name}</option>)}
            </select>
            <textarea required rows={5} placeholder="Your Message" value={form.message} onChange={set('message')} className="full" />
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </section>
  )
}

/** Scrolls to top on route change, or to the #anchor when there is one. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
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
