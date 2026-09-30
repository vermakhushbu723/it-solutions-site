import { Link } from 'react-router-dom'
import { site } from '../config/site'
import { bannerImage, familyImg, icon, img, painPoints, photos, processSteps, solutionFamilies, stats, values } from '../data/pages'
import Icon from '../components/Icon'
import { CallToAction, Counter, PartnerStrip, SectionTitle, usePageTitle } from '../components/Common'

// Same number of cards as before: 4 counters, 4 "why" boxes, 4 process steps.
const counters = stats.slice(0, 4)
const whyUs = values.slice(0, 4)
const whyIcons = ['chart', 'users', 'shield', 'star']

export default function Home() {
  usePageTitle('Home')
  return (
    <>
      <section className="hero" style={{ '--bg': `url(${bannerImage('/')})` }}>
        <div className="rain" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => <span key={i} />)}
        </div>
        <div className="container hero-inner">
          <span className="hero-kicker">{site.tagline}</span>
          <h1>End-to-end IT infrastructure for Delhi NCR businesses</h1>
          <p>Designed, deployed and managed 24/7 by one accountable partner.</p>
          <div className="hero-btns">
            <Link to="/contact" className="btn btn-orange">Book a Free Assessment</Link>
            <Link to="/solutions" className="btn btn-outline-light">Explore Solutions</Link>
          </div>
        </div>
      </section>

      <PartnerStrip />

      <section className="counters">
        <div className="container counter-grid">
          {counters.map((c) => (
            <div className="counter-item" key={c.label}>
              <div className="count"><Counter end={Math.round(c.value)} suffix={c.suffix} /></div>
              <p>{c.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle center sub="What we do" title="Solutions" desc="Seven practice areas under one accountable partner." />
          <div className="grid grid-3">
            {solutionFamilies.map((f) => (
              <Link to={`/solutions/${f.slug}`} className="service-card" key={f.slug}>
                <div className="card-img"><img src={familyImg(f.slug, 700)} alt={f.name} loading="lazy" /></div>
                <div className="service-icon"><Icon name={icon(f.icon)} size={34} /></div>
                <h3>{f.name}</h3>
                <p>{f.blurb}</p>
                <span className="read-more">Read More <Icon name="arrow" size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section gray">
        <div className="container two-col">
          <div className="about-visual">
            <div className="visual-card big"><img src={img(photos.nocDesk, 900)} alt="ProXinet NOC desk" loading="lazy" /></div>
            <div className="visual-card small a"><Icon name="shield" size={36} /></div>
            <div className="visual-card small b"><Icon name="server" size={36} /></div>
          </div>
          <div>
            <SectionTitle sub="About us" title="An IT partner that designs the system and answers at 2 a.m." />
            <p className="lead">
              Our breadth of experience means we can recommend, design, deploy and maintain your IT infrastructure — all
              four. One accountable partner, so the burden of coordinating between multiple vendors does not land on you.
            </p>
            <ul className="check-list">
              {painPoints.slice(0, 3).map((p) => (
                <li key={p.title}><Icon name="check" size={18} /> <Link to={p.to}>{p.title}</Link></li>
              ))}
            </ul>
            <Link to="/about" className="btn btn-primary">Why ProXinet</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle center sub="What we stand for" title="Core values" />
          <div className="grid grid-4">
            {whyUs.map((w, i) => (
              <div className="feature-box" key={w.title}>
                <div className="feature-icon"><Icon name={whyIcons[i]} size={30} /></div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section gray">
        <div className="container">
          <SectionTitle center sub="How we work" title="Assess → Design → Deploy → Manage" />
          <div className="grid grid-4">
            {processSteps.map((s) => (
              <div className="process-item" key={s.title}>
                <div className="number">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
