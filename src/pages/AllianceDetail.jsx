import { Link, useParams } from 'react-router-dom'
import { findAlliance } from '../data/alliances'
import Icon from '../components/Icon'
import { ContactStrip, PageBanner, usePageTitle } from '../components/Common'
import NotFound from './NotFound'

export default function AllianceDetail() {
  const { slug } = useParams()
  const a = findAlliance(slug)
  usePageTitle(a?.name)
  if (!a) return <NotFound />

  return (
    <>
      <PageBanner title={a.name} sub={a.category} trail={[{ label: 'Alliances', to: '/partners' }]} />

      <section className="section">
        <div className="container alliance-intro">
          <div className="alliance-logo-card">
            <span className="alliance-logo-inner">
              <img src={a.logoHd} alt={`${a.name} logo`} />
            </span>
            <span className="alliance-logo-caption">
              <Icon name="star" size={14} /> {a.tier || 'Technology Partner'}
            </span>
          </div>
          <div>
            <span className="badge">{a.category}</span>
            <h2>{a.name} with ProXinet</h2>
            <p className="lead">{a.intro}</p>
            <h3 className="alliance-sub">What we deliver</h3>
            <ul className="check-list">
              {a.offer.map((o) => (
                <li key={o}><Icon name="check" size={16} /> {o}</li>
              ))}
            </ul>
            <div className="btn-row">
              <Link to="/contact" className="btn btn-primary">Get A Quote</Link>
              <Link to="/partners" className="btn btn-outline">All Alliances</Link>
            </div>
          </div>
        </div>
      </section>

      <ContactStrip title={`Talk to us about ${a.name}`} gray />
    </>
  )
}
