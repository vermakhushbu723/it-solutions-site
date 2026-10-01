import { Link } from 'react-router-dom'
import { imageFor, industries } from '../data/pages'
import { testimonials } from '../data/proxinet/proof'
import { clientLogoImages } from '../data/logos'
import { home } from '../data/pxImages'
import Icon from '../components/Icon'
import { ContactStrip, ImageLogoStrip, PageBanner, SectionTitle, usePageTitle } from '../components/Common'

const palette = ['#0074c7', '#e5352a', '#16a34a', '#f59e0b', '#7c3aed', '#0891b2', '#db2777', '#ea580c', '#0d9488']

const highlights = [
  { img: home.about, value: '200+', label: 'Clients served', color: '#0074c7' },
  { img: home.portfolio, value: '9', label: 'Industries', color: '#16a34a' },
  { img: home.solutions, value: '15+', label: 'Years in business', color: '#f59e0b' },
  { img: home.contact, value: '99.9%', label: 'SLA uptime', color: '#e5352a' },
]

export default function Clients() {
  usePageTitle('Clients')
  return (
    <>
      <PageBanner title="Our Prestigious Clients" sub="Over 200 organisations across manufacturing, BFSI, pharma, education, retail, legal and hospitality." />

      <section className="section">
        <div className="container">
          <SectionTitle center sub="Trusted by" title="Clients are our backbone" desc="Long-term relationships built on SLA-backed delivery, a named engineer on every account and a published escalation matrix." />
          <div className="stat-cards">
            {highlights.map((h) => (
              <div className="stat-card" key={h.label} style={{ '--c': h.color }}>
                <img className="stat-img" src={h.img} alt="" loading="lazy" />
                <div>
                  <strong>{h.value}</strong>
                  <span>{h.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section gray-1">
        <div className="container">
          <SectionTitle center sub="Our clients" title="Organisations that trust ProXinet" />
          <div className="logo-wall">
            {clientLogoImages.map((src) => (
              <div className="logo-tile" key={src}>
                <img src={src} alt="Client logo" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle center sub="Industries" title="Sectors we serve" />
          <div className="industry-grid">
            {industries.map((ind, i) => (
              <Link to={`/industries/${ind.slug}`} className="industry-card" key={ind.slug} style={{ '--c': palette[i % palette.length] }}>
                <span className="industry-img"><img src={imageFor(`/industries/${ind.slug}`)} alt={ind.name} loading="lazy" /></span>
                <div className="industry-body">
                  <h3>{ind.name}</h3>
                  <p>{ind.blurb}</p>
                  <span className="more">Explore <Icon name="arrow" size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <SectionTitle center light sub="Client voices" title="What our clients say" />
          <div className="grid grid-2">
            {testimonials.map((t, i) => (
              <figure className="testimonial" key={t.text} style={{ '--c': palette[i % palette.length] }}>
                <span className="quote-mark">“</span>
                <blockquote>{t.text}</blockquote>
                <figcaption>
                  <img className="t-avatar" src={imageFor(`/testimonials/${i}`)} alt="" loading="lazy" />
                  <span><strong>{t.by}</strong>{t.role} · {t.industry}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="center-link"><Link to="/case-studies" className="btn btn-primary">Read Case Studies</Link></div>
        </div>
      </section>

      <section className="section gray-2">
        <div className="container">
          <SectionTitle center title="Alliances" />
          <ImageLogoStrip />
        </div>
      </section>

      <ContactStrip />
    </>
  )
}
