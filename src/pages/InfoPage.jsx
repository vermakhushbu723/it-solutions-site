import { Link, useLocation } from 'react-router-dom'
import { infoPages } from '../data/pages'
import Icon from '../components/Icon'
import { Breadcrumbs, CallToAction, SectionTitle, usePageTitle } from '../components/Common'
import NotFound from './NotFound'

// Generic page built only from existing sections: breadcrumbs, a card grid and the CTA band.
function Cards({ cards, style }) {
  return (
    <div className="grid grid-3">
      {cards.map((c, i) => {
        const body = style === 'process' ? (
          <>
            <span className="step">{c.meta && c.meta.length <= 4 ? c.meta : String(i + 1).padStart(2, '0')}</span>
            {c.meta && c.meta.length > 4 && <span className="card-meta">{c.meta}</span>}
            <h3>{c.title}</h3>
            {c.text && <p>{c.text}</p>}
          </>
        ) : style === 'team' ? (
          <>
            <div className="avatar"><Icon name="users" size={48} /></div>
            <h3>{c.title}</h3>
            <p>{c.meta}</p>
            {c.text && <small>{c.text}</small>}
          </>
        ) : (
          <>
            <div className="feature-icon"><Icon name={c.icon || 'check'} size={30} /></div>
            {c.meta && <span className="card-meta">{c.meta}</span>}
            <h3>{c.title}</h3>
            {c.text && <p>{c.text}</p>}
          </>
        )
        const cls = style === 'process' ? 'process-card' : style === 'team' ? 'team-card' : 'feature-box'
        return c.to
          ? <Link to={c.to} className={`${cls} link`} key={c.title}>{body}</Link>
          : <div className={cls} key={c.title}>{body}</div>
      })}
    </div>
  )
}

export default function InfoPage() {
  const { pathname } = useLocation()
  const page = infoPages[pathname.replace(/\/$/, '')]
  usePageTitle(page?.title)
  if (!page) return <NotFound />

  return (
    <>
      <Breadcrumbs title={page.title} trail={page.trail ? [page.trail] : []} />
      <section className="section gray">
        <div className="container">
          <SectionTitle center sub={page.sub} title={page.heading} desc={page.desc} />
          {page.cardsHeading && <h3 className="cards-heading">{page.cardsHeading}</h3>}
          <Cards cards={page.cards} style={page.style} />
          {page.extraQuote && (
            <div className="extra-box quote">
              <div className="service-icon"><Icon name="chat" size={34} /></div>
              <div>
                <p>“{page.extraQuote.text}”</p>
                <h3>{page.extraQuote.by}, {page.extraQuote.role}</h3>
              </div>
            </div>
          )}
        </div>
      </section>
      {page.extra && (
        <section className="section">
          <div className="container">
            <SectionTitle center sub={page.extra.sub} title={page.extra.heading} desc={page.extra.desc} />
            <Cards cards={page.extra.cards} />
          </div>
        </section>
      )}
      <CallToAction title={page.cta} />
    </>
  )
}
