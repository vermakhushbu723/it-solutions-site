import { Link, useLocation, useParams } from 'react-router-dom'
import { childPage, familyPage, imageFor, industryPage, servicePage } from '../data/pages'
import Icon from '../components/Icon'
import { ContactStrip, LogoStrip, PageBanner, SectionTitle, usePageTitle } from '../components/Common'
import NotFound from './NotFound'

// One template for solution families, solution items, services and industries.
function DetailPage({ page: s }) {
  const { pathname } = useLocation()
  usePageTitle(s?.title)
  if (!s) return <NotFound />

  const trail = [
    ...(pathname.startsWith('/solutions') ? [{ label: 'Solutions', to: '/solutions' }] : []),
    ...(pathname.startsWith('/services') ? [{ label: 'Services', to: '/services' }] : []),
    ...(pathname.startsWith('/industries') ? [{ label: 'Industries', to: '/industries' }] : []),
    ...(s.trail ? [s.trail] : []),
  ]

  return (
    <>
      <PageBanner title={s.heroTitle} sub={s.heroText} trail={trail} />

      <section className="section">
        <div className="container row">
          <div>
            <SectionTitle sub={s.aboutLabel} title={s.aboutTitle} />
            <p>{s.about}</p>
            <Link to="/contact" className="btn btn-primary">Book a Free Assessment</Link>
          </div>
          <div className="row-img"><img src={imageFor(pathname)} alt={s.title} loading="lazy" /></div>
        </div>
      </section>

      {s.platforms && (
        <section className="section gray-2">
          <div className="container">
            <LogoStrip items={s.platforms.map((name) => ({ name }))} />
          </div>
        </section>
      )}

      <section className="section gray-3">
        <div className="container">
          <div className={`grid grid-${Math.min(s.features.length, 4)}`}>
            {s.features.map((f) => (
              <div className="icon-box" key={f.title}>
                <div className="icon"><Icon name={f.icon} size={28} /></div>
                <h3>{f.title}</h3>
                {f.text && <p>{f.text}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle center sub={s.processLabel} title={s.processTitle} />
          <div className="grid grid-2">
            {s.process.map((p, i) => {
              const body = (
                <>
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{p.title}</h3>
                  {p.text && <p>{p.text}</p>}
                </>
              )
              return p.to
                ? <Link to={p.to} className="list-item" key={p.title}>{body}</Link>
                : <div className="list-item" key={p.title}>{body}</div>
            })}
          </div>
        </div>
      </section>

      {s.extra && (
        <section className="section band">
          <div className="container text-center">
            <h3>{s.extra.title}</h3>
            <p>{s.extra.text}</p>
          </div>
        </section>
      )}

      <ContactStrip title="For demo please contact" gray />
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
