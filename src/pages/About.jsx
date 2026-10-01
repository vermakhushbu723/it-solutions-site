import { Link } from 'react-router-dom'
import { site } from '../config/site'
import { processSteps, values } from '../data/pages'
import { leadership } from '../data/proxinet/people'
import { about } from '../data/pxImages'
import Icon from '../components/Icon'
import { ContactStrip, LogoStrip, PageBanner, SectionTitle, usePageTitle } from '../components/Common'

const pillars = [
  { icon: 'layers', title: 'One-stop IT solutions', text: 'Cloud, security, data center, backup and network in one place.' },
  { icon: 'chart', title: 'SLA-backed delivery', text: 'ITIL-aligned processes and measurable response times.' },
  { icon: 'users', title: 'Certified engineers', text: 'OEM-trained, background verified and continuously upskilled.' },
]

const moreLinks = [
  { title: 'Leadership Team', to: '/about/leadership', icon: 'users' },
  { title: 'Our Story', to: '/about/story', icon: 'star' },
  { title: 'Our Process', to: '/about/process', icon: 'chart' },
  { title: 'Certifications', to: '/about/certifications', icon: 'shield' },
]

const sustainability = values.find((v) => v.title === 'Sustainability')

export default function About() {
  usePageTitle('About')
  return (
    <>
      <PageBanner title="About Us" sub="An IT partner that designs the system and answers at 2 a.m." />

      <section className="section" id="overview">
        <div className="container row">
          <div>
            <SectionTitle title="Overview" />
            <p>
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
          <div className="row-img"><img src={about.overview} alt="ProXinet office" loading="lazy" /></div>
        </div>
      </section>

      <section className="section gray-3">
        <div className="container grid grid-3">
          {pillars.map((v) => (
            <div className="icon-box" key={v.title}>
              <div className="icon"><Icon name={v.icon} size={28} /></div>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="what-we-believe">
        <div className="container row reverse">
          <div>
            <SectionTitle title="What We Believe" />
            <ul className="check-list">
              {values.map((r) => (
                <li key={r.title}><Icon name="check" size={16} /><span><strong>{r.title}</strong> — {r.desc}</span></li>
              ))}
            </ul>
          </div>
          <div className="row-img"><img src={about.believe} alt="Our values" loading="lazy" /></div>
        </div>
      </section>

      <section className="section gray-1" id="vision">
        <div className="container row">
          <div className="row-img"><img src={about.vision} alt="Our vision" loading="lazy" /></div>
          <div>
            <SectionTitle title="Vision" />
            <p>{site.promise}</p>
            <p>Every engagement follows the same path:</p>
            <ul className="check-list">
              {processSteps.map((s) => (
                <li key={s.n}><Icon name="check" size={16} /><span><strong>{s.title}</strong> — {s.desc}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section band" id="social-responsibility">
        <div className="container text-center">
          <SectionTitle center light title="Social Responsibility" desc={sustainability?.desc} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle center title="Leadership" />
          <div className="grid grid-4">
            {leadership.slice(0, 4).map((t) => (
              <div className="team-box" key={t.name}>
                <div className="avatar">{t.initials}</div>
                <h3>{t.name}</h3>
                <span className="role">{t.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section gray-3">
        <div className="container grid grid-4">
          {moreLinks.map((l) => (
            <Link to={l.to} className="icon-box link" key={l.to}>
              <div className="icon"><Icon name={l.icon} size={28} /></div>
              <h3>{l.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="section gray-2">
        <div className="container">
          <SectionTitle center title="Alliances" />
          <LogoStrip />
        </div>
      </section>

      <ContactStrip />
    </>
  )
}
