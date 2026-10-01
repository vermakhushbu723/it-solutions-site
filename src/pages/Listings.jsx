import { Link } from 'react-router-dom'
import { blogDate, imageFor, industries, partners, posts, services, solutionFamilies } from '../data/pages'
import Icon from '../components/Icon'
import PartnerLogo from '../components/PartnerLogo'
import { ContactStrip, PageBanner, SectionTitle, usePageTitle } from '../components/Common'
import { alliances } from '../data/alliances'

// Image box grid used by every listing page.
function BoxGrid({ items }) {
  return (
    <div className="grid grid-3">
      {items.map((s) => (
        <Link to={s.to} className="box" key={s.to}>
          <div className="box-img">
            <img src={s.img || imageFor(s.to)} alt={s.title} loading="lazy" />
            {s.tag && <span className="tag">{s.tag}</span>}
          </div>
          <div className="box-text">
            {s.date && <time>{s.date}</time>}
            <h3>{s.title}</h3>
            {s.text && <p>{s.text}</p>}
            <span className="more">Read More <Icon name="arrow" size={14} /></span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export function Solutions() {
  usePageTitle('Solutions')
  return (
    <>
      <PageBanner title="Solutions" sub="The full IT stack, one accountable partner" />
      <section className="section gray-1">
        <div className="container">
          <SectionTitle center title="Our Solutions" desc="Seven practice areas and over 40 services. Each solution has its own design, deployment and support model." />
          <BoxGrid items={solutionFamilies.map((f) => ({ to: `/solutions/${f.slug}`, title: f.name, text: f.blurb, tag: f.tag.split(' · ')[0] }))} />
          <p className="center-link"><Link to="/industries" className="btn btn-outline">Solutions by Industry</Link></p>
        </div>
      </section>
      <ContactStrip />
    </>
  )
}

export function Services() {
  usePageTitle('Services')
  const groups = [
    { icon: 'gear', title: 'Managed', text: services.slice(0, 4).map((s) => s.name).join(' · ') },
    { icon: 'rocket', title: 'Professional', text: services.slice(4, 7).map((s) => s.name).join(' · ') },
    { icon: 'box', title: 'Advisory & Supply', text: services.slice(7).map((s) => s.name).join(' · ') },
    { icon: 'chart', title: 'SLA & Support Plans', text: 'Bronze, Silver and Gold — transparent scope and response times.', to: '/services/plans' },
  ]
  return (
    <>
      <PageBanner title="Services" sub="Not just supply — the whole lifecycle" />
      <section className="section gray-3">
        <div className="container grid grid-4">
          {groups.map((o) => {
            const body = (
              <>
                <div className="icon"><Icon name={o.icon} size={28} /></div>
                <h3>{o.title}</h3>
                <p>{o.text}</p>
              </>
            )
            return o.to
              ? <Link to={o.to} className="icon-box link" key={o.title}>{body}</Link>
              : <div className="icon-box" key={o.title}>{body}</div>
          })}
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionTitle center title="Our Services" desc="From consulting and design through deployment, 24/7 support and lifecycle management." />
          <BoxGrid items={services.map((s) => ({ to: `/services/${s.slug}`, title: s.name, text: s.blurb }))} />
        </div>
      </section>
      <ContactStrip gray />
    </>
  )
}

export function Industries() {
  usePageTitle('Industries')
  return (
    <>
      <PageBanner title="Industries" sub="Every industry has its own uptime and compliance reality" />
      <section className="section gray-1">
        <div className="container">
          <SectionTitle center title="Industries We Serve" desc="In manufacturing, downtime is production loss; in BFSI, the audit trail is a regulatory obligation. The approach differs." />
          <BoxGrid items={industries.map((i) => ({ to: `/industries/${i.slug}`, title: i.name, text: i.blurb }))} />
        </div>
      </section>
      <ContactStrip />
    </>
  )
}

export function Partners() {
  usePageTitle('Alliances')
  return (
    <>
      <PageBanner title="Alliances" sub="OEM partnerships that give you trained engineers, direct escalation paths and better commercials." />
      <section className="section gray-1">
        <div className="container">
          <SectionTitle center title="Our Alliances" />
          <div className="logo-wall">
            {alliances.map((a) => (
              <Link to={`/partners/${a.slug}`} className="logo-tile" key={a.slug} title={`${a.name} — view details`}>
                <img src={a.logo} alt={`${a.name} logo`} loading="lazy" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionTitle center title="Partnership Tiers" />
          <div className="logo-grid">
            {partners.map((p) => (
              <div key={p.name} className="logo-card" style={{ '--brand': p.color }}>
                <PartnerLogo name={p.name} color={p.color} size={44} />
                <span>{p.name}<small>{p.tier} · {p.cat}</small></span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ContactStrip />
    </>
  )
}

export function Blog() {
  usePageTitle('Blog')
  return (
    <>
      <PageBanner title="Blog" sub="Practical IT writing, without the jargon" trail={[{ label: 'Resources', to: '/resources' }]} />
      <section className="section gray-1">
        <div className="container">
          <BoxGrid items={posts.map((p) => ({ to: `/blog/${p.slug}`, title: p.title, text: p.excerpt, tag: p.cat, date: `${blogDate(p.date)} · ${p.read}` }))} />
        </div>
      </section>
    </>
  )
}
