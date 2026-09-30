import { Link, useLocation, useParams } from 'react-router-dom'
import { bannerImage, childPage, familyPage, industryPage, servicePage } from '../data/pages'
import Icon from '../components/Icon'
import { CallToAction, PartnerStrip, SectionTitle, usePageTitle } from '../components/Common'
import NotFound from './NotFound'

const cardColors = ['', 'gold', 'cyan', 'blue']

// One template for solution families, solution items, services and industries.
function DetailPage({ page: s }) {
  const { pathname } = useLocation()
  usePageTitle(s?.title)
  if (!s) return <NotFound />

  return (
    <>
      <section className="page-hero" style={{ '--bg': `url(${bannerImage(pathname)})` }}>
        <div className="container page-hero-inner">
          <span className="hero-kicker">{s.kicker}</span>
          <h1>{s.heroTitle}</h1>
          <p>{s.heroText}</p>
          <Link to="/contact" className="btn btn-orange">Book a Free Assessment</Link>
        </div>
      </section>

      {s.platforms && (
        <PartnerStrip items={s.platforms.map((name) => ({ name }))} />
      )}

      <section className="section">
        <div className="container two-col align-start">
          <div>
            <SectionTitle sub={s.aboutLabel} title={s.aboutTitle} />
            <p className="lead">{s.about}</p>
            {s.trail && <p><Link to={s.trail.to}>← All {s.trail.label}</Link></p>}
            <Link to="/contact" className="btn btn-primary">Talk to an Engineer</Link>
          </div>
          <div className="grid grid-2">
            {s.features.map((f, i) => (
              <div className={`service-tile ${cardColors[i % 4]}`} key={f.title}>
                <div className="service-icon"><Icon name={f.icon} size={30} /></div>
                <h3>{f.title}</h3>
                {f.text && <p>{f.text}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section gray">
        <div className="container">
          <SectionTitle center sub={s.processLabel} title={s.processTitle} />
          <div className="grid grid-3">
            {s.process.map((p, i) => {
              const body = (
                <>
                  <span className="step">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{p.title}</h3>
                  {p.text && <p>{p.text}</p>}
                </>
              )
              return p.to ? (
                <Link to={p.to} className="process-card link" key={p.title}>{body}</Link>
              ) : (
                <div className="process-card" key={p.title}>{body}</div>
              )
            })}
          </div>
        </div>
      </section>

      {s.extra && (
        <section className="section">
          <div className="container">
            <div className="extra-box">
              <div className="service-icon"><Icon name="shield" size={34} /></div>
              <div>
                <h3>{s.extra.title}</h3>
                <p>{s.extra.text}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <CallToAction />
    </>
  )
}

export function FamilyDetail() {
  const { family } = useParams()
  return <DetailPage key={family} page={familyPage(family)} />
}

export function SolutionItemDetail() {
  const { family, slug } = useParams()
  return <DetailPage key={slug} page={childPage(family, slug)} />
}

export function ServiceDetail() {
  const { slug } = useParams()
  return <DetailPage key={slug} page={servicePage(slug)} />
}

export function IndustryDetail() {
  const { slug } = useParams()
  return <DetailPage key={slug} page={industryPage(slug)} />
}
