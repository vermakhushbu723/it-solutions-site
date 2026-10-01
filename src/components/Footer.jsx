import { Link } from 'react-router-dom'
import { site } from '../config/site'
import { services } from '../data/pages'
import Icon, { SocialIcon } from './Icon'
import Logo from './Logo'

// Footer only carries links that are NOT in the navbar, and none repeat between columns.
const serviceLinks = services
  .filter((s) => s.slug !== 'infrastructure-assessment') // already in navbar as "Infrastructure Services"
  .slice(0, 6)
  .map((s) => ({ label: s.name, to: `/services/${s.slug}` }))

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-about">
          <Link to="/" className="footer-logo"><Logo /></Link>
          <p>{site.tagline} {site.promise}</p>
          <ul className="social">
            {Object.entries(site.social).map(([k, v]) => (
              <li key={k}>
                <a href={v} target="_blank" rel="noreferrer" aria-label={k}><SocialIcon name={k} size={15} /></a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="widget-title">Our Services</h3>
          <ul className="site-map">
            {serviceLinks.map((s) => <li key={s.to}><Link to={s.to}>{s.label}</Link></li>)}
          </ul>
        </div>

        <div>
          <h3 className="widget-title">Contact Info</h3>
          <ul className="contact-list">
            <li><Icon name="pin" size={18} strokeWidth={1.5} /><span>{site.offices[0].line}</span></li>
            <li>
              <Icon name="phone" size={18} strokeWidth={1.5} />
              <span>{site.phones.map((p, i) => <span key={p}>{i > 0 && ', '}<a href={`tel:${p}`}>{p}</a></span>)}</span>
            </li>
            <li><Icon name="mail" size={18} strokeWidth={1.5} /><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><Icon name="clock" size={18} strokeWidth={1.5} /><span>{site.hours}</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {site.year} {site.name}. All Rights Reserved</p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
