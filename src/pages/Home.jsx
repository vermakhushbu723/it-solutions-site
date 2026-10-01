import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../config/site'
import { icon, services, solutionFamilies, stats } from '../data/pages'
import { home } from '../data/pxImages'
import Icon from '../components/Icon'
import { ContactStrip, usePageTitle } from '../components/Common'
import { clientLogoImages } from '../data/logos'
import Ticker from '../components/Ticker'

// Hero slides: the two proxinet.in slides, with the matching family text from the ProXinet content.
const slides = home.slides.map((s) => {
  const fam = solutionFamilies.find((f) => s.to.endsWith(f.slug))
  return { ...s, text: s.text || fam?.hero }
})

// Four highlight cards for the About section (ProXinet content).
const aboutCards = [
  { tone: 'violet', icon: 'layers', title: 'One-stop IT solutions', text: 'Cloud, security, data center, backup and network in one place.', to: '/solutions' },
  { tone: 'gold', icon: 'chart', title: 'SLA-backed delivery', text: 'ITIL-aligned processes and measurable response times.', to: '/services/plans' },
  { tone: 'cyan', icon: 'users', title: 'Certified engineers', text: 'OEM-trained, background verified and continuously upskilled.', to: '/about/certifications' },
  { tone: 'blue', icon: 'phone', title: '24×7 NOC & helpdesk', text: 'Always-on monitoring and support with a published escalation matrix.', to: '/services/247-noc-helpdesk' },
]

// Nine services fill a clean 3 x 3 grid; the rest are on /services.
const homeServices = services.slice(0, 9)

// How long each photo stays on screen
const SLIDE_MS = 6000

function Slider() {
  // Photos move left -> right: the next one enters from the left, the current one exits to the right.
  const [state, setState] = useState({ i: 0, prev: null })
  const { i, prev } = state

  useEffect(() => {
    // Never pauses (not even on hover) and loops forever: after the last photo it goes back to the first.
    const t = setTimeout(() => setState((st) => ({ i: (st.i + 1) % slides.length, prev: st.i })), SLIDE_MS)
    return () => clearTimeout(t)
  }, [i])

  const pos = (n) => (n === i ? 'active' : n === prev ? 'out-right' : 'wait-left')

  return (
    <section className="slider photo-only">
      {slides.map((s, n) => (
        <div className={`slide ${pos(n)}`} key={s.title} aria-hidden={n !== i}>
          <div className="banner" style={{ '--bg': `url(${s.img})` }}>
            <div className="container">
              <div className="hero-caption">
                <h2>{s.title}</h2>
                {s.text && <p>{s.text}</p>}
                <Link to={s.to} className="btn btn-primary hero-cta" tabIndex={n === i ? 0 : -1}>View More</Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default function Home() {
  usePageTitle('Home')
  return (
    <>
      <Slider />
      <Ticker />

      {/* About: simple image + text, like a classic WordPress section */}
      <section className="section about-home">
        <div className="container simple-about">
          <div>
            <h2 className="simple-title underline">About ProXinet</h2>
            <p>
              Our breadth of experience means we can recommend, design, deploy and maintain your IT infrastructure — all
              four. One accountable partner, so the burden of coordinating between multiple vendors does not land on you.
            </p>
            <ul className="tick-list">
              {aboutCards.map((c) => <li key={c.title}><Icon name="check" size={16} /> {c.title}</li>)}
            </ul>
            <Link to="/about" className="btn btn-primary">Read More</Link>
          </div>
          <div className="simple-about-img">
            <img src={home.about} alt="ProXinet team at work" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Services: plain cards — icon, name, one line, link */}
      <section className="section gray-1">
        <div className="container">
          <h2 className="simple-title center underline">Our Services</h2>
          <div className="plain-services">
            {homeServices.map((s) => (
              <Link to={`/services/${s.slug}`} className="plain-service" key={s.slug}>
                <h3>{s.name}</h3>
                <p>{s.blurb}</p>
                <span className="plain-more">Read more →</span>
              </Link>
            ))}
          </div>
          <div className="center-link"><Link to="/services" className="btn btn-outline">View All Services</Link></div>
        </div>
      </section>

      {/* Portfolio / Solutions: two plain photo cards */}
      <section className="section">
        <div className="container grid grid-2">
          <Link to="/case-studies" className="simple-photo caption">
            <img src={home.portfolio} alt="Portfolio" loading="lazy" />
            <h3>Portfolio</h3>
          </Link>
          <Link to="/solutions" className="simple-photo caption">
            <img src={home.solutions} alt="Solutions" loading="lazy" />
            <h3>Solutions</h3>
          </Link>
        </div>
      </section>

      {/* Clients: plain logos on white */}
      <section className="section">
        <div className="container">
          <h2 className="simple-title center underline">Our Clients</h2>
          <div className="simple-logos plain">
            {clientLogoImages.slice(0, 12).map((src) => (
              <img key={src} src={src} alt="Client logo" loading="lazy" />
            ))}
          </div>
          <div className="center-link"><Link to="/clients" className="btn btn-outline">View All Clients</Link></div>
        </div>
      </section>

      {/* Company line with plain numbers */}
      <section className="section simple-band light">
        <div className="container text-center">
          <h2>{site.name}</h2>
          <p>{site.promise}</p>
          <ul className="simple-stats">
            {stats.slice(0, 4).map((s) => (
              <li key={s.label}><strong>{s.value}{s.suffix}</strong>{s.label}</li>
            ))}
          </ul>
        </div>
      </section>

      <ContactStrip title="Talk to our engineers" />
    </>
  )
}
