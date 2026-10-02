import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../config/site'
import { icon, services, solutionFamilies, stats } from '../data/pages'
import { home, imageFor } from '../data/pxImages'
import Icon from '../components/Icon'
import { ContactStrip, Counter, ImageLogoStrip, usePageTitle } from '../components/Common'
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

// Online meeting: how a visitor books one and joins it.
const meetingSteps = [
  { icon: '/images/icons/alarm-clock.png', title: 'Book a slot', text: 'Pick a time on our contact form or call us (Mon–Sat, 9:30 AM – 6:30 PM).' },
  { icon: '/images/icons/envelope.png', title: 'Get your invite', text: 'A Teams or Google Meet link reaches your inbox within two working hours.' },
  { icon: '/images/icons/laptop.png', title: 'Join from any device', text: 'Click the link on laptop, phone or browser. Nothing to install.' },
  { icon: '/images/icons/video-camera.png', title: 'Talk to an engineer', text: 'Share your screen and get a written proposal after the call.' },
]

// Eight services fill two rows of four, like the microsoft.com card grid; the rest are on /services.
const homeServices = services.slice(0, 8)

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
          <div className={`banner ${s.align === 'right' ? 'cap-right' : ''}`} style={{ '--bg': `url(${s.img})` }}>
            <div className="container">
              <div className="hero-caption">
                <h2>{s.title}</h2>
                {s.text && <p>{s.text}{s.highlight && <> <span className="hero-highlight">{s.highlight}</span></>}</p>}
                <Link to={s.to} className="btn btn-primary hero-cta" tabIndex={n === i ? 0 : -1}>
                  {s.cta ? <>{s.cta} <Icon name="arrow" size={18} /></> : 'View More'}
                </Link>
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
    <div className="ms-home">
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
                <div className="plain-service-img">
                  <img src={imageFor(`/services/${s.slug}`)} alt={s.name} loading="lazy" />
                </div>
                <div className="plain-service-body">
                  <h3>{s.name}</h3>
                  <p>{s.blurb}</p>
                  <span className="plain-more">Learn more</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="center-link"><Link to="/services" className="btn btn-outline">View All Services</Link></div>
        </div>
      </section>

      {/* Online meetings: how to book one and how to join it — photo + one coloured panel holding all the text */}
      <section className="section meet-section">
        <div className="container meet-card">
          <div className="meet-img">
            <img src={home.meeting} alt="Online meeting with a ProXinet engineer" loading="lazy" />
            <span className="meet-live"><span className="meet-live-dot" /> Live with an engineer</span>
          </div>
          <div className="meet-panel">
            <span className="meet-badge">
              <img src="/images/icons/teams.svg" alt="" width="18" height="18" /> Microsoft Teams
              <span className="meet-badge-sep" />
              <img src="/images/icons/google-meet.svg" alt="" width="20" height="18" /> Google Meet
            </span>
            <h2>Meet our engineers online</h2>
            <p className="meet-intro">No office visit needed. Talk to a ProXinet engineer from wherever you are.</p>
            <ol className="meet-steps">
              {meetingSteps.map((st, n) => (
                <li key={st.title}>
                  <span className="meet-icon"><img src={st.icon} alt="" width="34" height="34" /><b>{n + 1}</b></span>
                  <div>
                    <h3>{st.title}</h3>
                    <p>{st.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="btn-row">
              <Link to="/contact" className="btn btn-primary">Book an online meeting <Icon name="arrow" size={18} /></Link>
              <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="btn btn-outline"><Icon name="phone" size={16} /> Call {site.phone}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Clients: plain logos on white */}
      <section className="section">
        <div className="container">
          <h2 className="simple-title center underline">Our Clients</h2>
          <div className="client-sliders">
            <ImageLogoStrip images={clientLogoImages.slice(0, 18)} />
            <ImageLogoStrip images={clientLogoImages.slice(18)} reverse />
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
              <li key={s.label}><strong><Counter end={s.value} suffix={s.suffix} decimals={s.decimals || 0} /></strong>{s.label}</li>
            ))}
          </ul>
        </div>
      </section>

      <ContactStrip title="Talk to our engineers" />
    </div>
  )
}
