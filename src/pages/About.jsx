import { Link } from 'react-router-dom'
import { site } from '../config/site'
import { img, photos, values } from '../data/pages'
import { leadership } from '../data/proxinet/people'
import Icon from '../components/Icon'
import { Breadcrumbs, CallToAction, PartnerStrip, SectionTitle, usePageTitle } from '../components/Common'

const pillars = [
  { icon: 'layers', title: 'One-stop IT solutions', text: 'Cloud, security, data center, backup and network in one place.' },
  { icon: 'chart', title: 'SLA-backed delivery', text: 'ITIL-aligned processes and measurable response times.' },
  { icon: 'users', title: 'Certified engineers', text: 'OEM-trained, background verified and continuously upskilled.' },
]

export default function About() {
  usePageTitle('About')
  return (
    <>
      <Breadcrumbs title="About Us" />
      <PartnerStrip />

      <section className="section gray">
        <div className="container two-col">
          <div>
            <SectionTitle sub="About us" title="An IT partner that designs the system and answers at 2 a.m." />
            <p className="lead">
              Our breadth of experience means we can recommend, design, deploy and maintain your IT infrastructure — all
              four. One accountable partner, so the burden of coordinating between multiple vendors does not land on you.
            </p>
            <p>
              Working across manufacturing, IT/ITES, BFSI, pharma, education, legal, retail, construction and
              hospitality means we understand not just the technology but the compliance and uptime expectations that
              surround it.
            </p>
            <Link to="/contact" className="btn btn-primary">Contact Us</Link>
          </div>
          <div className="about-visual">
            <div className="visual-card big"><img src={img(photos.openOffice, 900)} alt="ProXinet office" loading="lazy" /></div>
            <div className="visual-card small a"><Icon name="users" size={36} /></div>
            <div className="visual-card small b"><Icon name="star" size={36} /></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid grid-3">
          {pillars.map((v) => (
            <div className="feature-box" key={v.title}>
              <div className="feature-icon"><Icon name={v.icon} size={30} /></div>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section why-dark">
        <div className="container two-col">
          <div>
            <SectionTitle light sub="What we stand for" title="Core values" />
            <ul className="check-list light">
              {values.map((r) => (
                <li key={r.title}><Icon name="check" size={18} /> {r.title} — {r.desc}</li>
              ))}
            </ul>
          </div>
          <div className="skill-bars">
            {[['SLA uptime', 99.9], ['Endpoints under active AMC', 95], ['NOC & helpdesk coverage', 100], ['Clients across 9 industries', 92]].map(([l, v]) => (
              <div className="skill" key={l}>
                <div className="skill-head"><span>{l}</span><span>{v}%</span></div>
                <div className="bar"><span style={{ width: `${v}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle center sub="Team" title="Leadership" />
          <div className="grid grid-4">
            {leadership.slice(0, 4).map((t) => (
              <div className="team-card" key={t.name}>
                <div className="avatar"><Icon name="users" size={48} /></div>
                <h3>{t.name}</h3>
                <p>{t.role}</p>
              </div>
            ))}
          </div>
          <p className="center-link"><Link to="/about/leadership">View full leadership team →</Link></p>
        </div>
      </section>

      <CallToAction title={`${site.shortName} — ${site.tagline}`} />
    </>
  )
}
