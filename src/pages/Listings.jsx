import { Link } from 'react-router-dom'
import { blogDate, familyImg, icon, industries, industryImg, partners, postImg, posts, serviceImg, services, solutionFamilies } from '../data/pages'
import Icon from '../components/Icon'
import PartnerLogo from '../components/PartnerLogo'
import { Breadcrumbs, CallToAction, SectionTitle, usePageTitle } from '../components/Common'

function CardGrid({ items }) {
  return (
    <div className="grid grid-3">
      {items.map((s) => (
        <Link to={s.to} className="service-card" key={s.to}>
          {s.img && <div className="card-img"><img src={s.img} alt={s.title} loading="lazy" /></div>}
          <div className="service-icon"><Icon name={s.icon} size={34} /></div>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
          <span className="read-more">Read More <Icon name="arrow" size={16} /></span>
        </Link>
      ))}
    </div>
  )
}

const familyCards = solutionFamilies.map((f) => ({ to: `/solutions/${f.slug}`, icon: icon(f.icon), title: f.name, text: f.blurb, img: familyImg(f.slug, 700) }))

export function Solutions() {
  usePageTitle('Solutions')
  return (
    <>
      <Breadcrumbs title="Solutions" />
      <section className="section">
        <div className="container">
          <SectionTitle center sub="Solutions" title="The full IT stack, one accountable partner" desc="Seven practice areas and over 40 services. Each solution has its own design, deployment and support model." />
          <CardGrid items={familyCards} />
        </div>
      </section>
      <CallToAction />
    </>
  )
}

export function Services() {
  usePageTitle('Services')
  const offer = [
    { icon: 'gear', title: 'Managed', text: services.slice(0, 4).map((s) => s.name).join(' · ') },
    { icon: 'rocket', title: 'Professional', text: services.slice(4, 7).map((s) => s.name).join(' · ') },
    { icon: 'box', title: 'Advisory & Supply', text: services.slice(7).map((s) => s.name).join(' · ') },
    { icon: 'chart', title: 'Plans', text: 'SLA & Support Plans — Bronze, Silver and Gold.', to: '/services/plans' },
  ]
  return (
    <>
      <Breadcrumbs title="Services" />
      <section className="section gray">
        <div className="container">
          <SectionTitle center sub="Services" title="Not just supply — the whole lifecycle" desc="From consulting and design through deployment, 24/7 support and lifecycle management." />
          <div className="grid grid-4">
            {offer.map((o) => {
              const body = (
                <>
                  <div className="feature-icon"><Icon name={o.icon} size={30} /></div>
                  <h3>{o.title}</h3>
                  <p>{o.text}</p>
                </>
              )
              return o.to
                ? <Link to={o.to} className="feature-box link" key={o.title}>{body}</Link>
                : <div className="feature-box" key={o.title}>{body}</div>
            })}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionTitle center sub="Service Areas" title="Where we can help" />
          <CardGrid items={services.map((s) => ({ to: `/services/${s.slug}`, icon: icon(s.icon), title: s.name, text: s.blurb, img: serviceImg(s.slug, 700) }))} />
        </div>
      </section>
      <CallToAction />
    </>
  )
}

export function Industries() {
  usePageTitle('Industries')
  return (
    <>
      <Breadcrumbs title="Industries" />
      <section className="section">
        <div className="container">
          <SectionTitle center sub="Industries" title="Every industry has its own uptime and compliance reality" desc="In manufacturing, downtime is production loss; in BFSI, the audit trail is a regulatory obligation. The approach differs." />
          <CardGrid items={industries.map((i) => ({ to: `/industries/${i.slug}`, icon: icon(i.icon), title: i.name, text: i.blurb, img: industryImg(i.slug, 700) }))} />
        </div>
      </section>
      <CallToAction />
    </>
  )
}

export function Partners() {
  usePageTitle('Partners')
  return (
    <>
      <Breadcrumbs title="Partners & Alliances" />
      <section className="section">
        <div className="container">
          <SectionTitle center sub="Alliances" title="Technology Partners" desc="OEM partnerships that give you trained engineers, direct escalation paths and better commercials." />
          <div className="partner-grid big">
            {partners.map((p) => (
              <div key={p.name} className="partner-card" style={{ '--brand': p.color }}>
                <PartnerLogo name={p.name} color={p.color} size={48} />
                <span className="partner-badge">{p.name}</span>
                <small>{p.tier} · {p.cat}</small>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  )
}

export function Blog() {
  usePageTitle('Blog')
  return (
    <>
      <Breadcrumbs title="Blog" />
      <section className="section gray">
        <div className="container grid grid-3">
          {posts.map((p) => (
            <Link to={`/blog/${p.slug}`} className="blog-card" key={p.slug}>
              <div className="blog-thumb" style={{ '--bg': `url(${postImg(p.slug, 700)})` }}><span>{p.cat}</span></div>
              <div className="blog-body">
                <time>{blogDate(p.date)} · {p.read}</time>
                <h3>{p.title}</h3>
                <span className="read-more">Read More <Icon name="arrow" size={16} /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
