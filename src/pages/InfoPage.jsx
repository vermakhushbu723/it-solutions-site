import { Link, useLocation } from 'react-router-dom'
import { imageFor, infoPages } from '../data/pages'
import Icon from '../components/Icon'
import { ContactStrip, PageBanner, SectionTitle, usePageTitle } from '../components/Common'
import NotFound from './NotFound'

// Card styles: 'process' = numbered list items, 'team' = people, default = icon boxes.
function Cards({ cards, style }) {
  if (style === 'process') {
    return (
      <div className="grid grid-2">
        {cards.map((c, i) => {
          const short = c.meta && c.meta.length <= 4
          const body = (
            <>
              <span className="num">{short ? c.meta : String(i + 1).padStart(2, '0')}</span>
              {c.meta && !short && <span className="meta">{c.meta}</span>}
              <h3>{c.title}</h3>
              {c.text && <p>{c.text}</p>}
            </>
          )
          return c.to
            ? <Link to={c.to} className="list-item" key={c.title}>{body}</Link>
            : <div className="list-item" key={c.title}>{body}</div>
        })}
      </div>
    )
  }
  if (style === 'team') {
    return (
      <div className="grid grid-3">
        {cards.map((c) => (
          <div className="team-box" key={c.title}>
            <div className="avatar"><Icon name="users" size={44} /></div>
            <h3>{c.title}</h3>
            <span className="role">{c.meta}</span>
            {c.text && <p>{c.text}</p>}
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="grid grid-3">
      {cards.map((c) => {
        const body = (
          <>
            <div className="icon"><Icon name={c.icon || 'check'} size={28} /></div>
            {c.meta && <span className="meta">{c.meta}</span>}
            <h3>{c.title}</h3>
            {c.text && <p>{c.text}</p>}
          </>
        )
        return c.to
          ? <Link to={c.to} className="icon-box link" key={c.title}>{body}</Link>
          : <div className="icon-box" key={c.title}>{body}</div>
      })}
    </div>
  )
}

export default function InfoPage() {
  const { pathname } = useLocation()
  const path = pathname.replace(/\/$/, '')
  const page = infoPages[path]
  usePageTitle(page?.title)
  if (!page) return <NotFound />

  return (
    <>
      <PageBanner title={page.title} sub={page.sub} trail={page.trail ? [page.trail] : []} />

      {page.desc && (
        <section className="section">
          <div className="container row">
            <div>
              <SectionTitle title={page.heading} />
              <p>{page.desc}</p>
              <Link to="/contact" className="btn btn-primary">Contact Us</Link>
            </div>
            <div className="row-img"><img src={imageFor(path)} alt={page.title} loading="lazy" /></div>
          </div>
        </section>
      )}

      <section className="section gray-3" id={page.anchor}>
        <div className="container">
          {page.desc
            ? page.cardsHeading && <SectionTitle center title={page.cardsHeading} />
            : <SectionTitle center title={page.heading} />}
          <Cards cards={page.cards} style={page.style} />
          {page.extraQuote && (
            <blockquote className="quote">
              “{page.extraQuote.text}”
              <cite>{page.extraQuote.by}, {page.extraQuote.role}</cite>
            </blockquote>
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

      <ContactStrip title={page.cta || 'Get in touch'} />
    </>
  )
}
