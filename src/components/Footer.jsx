import { Link } from 'react-router-dom'
import { site } from '../config/site'
import Icon, { SocialIcon } from './Icon'
import Logo from './Logo'

// Only information that is not already in the navbar: company intro, offices and contact details.
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-about">
          <Link to="/"><Logo light /></Link>
          <p>{site.promise}</p>
          <a className="btn btn-linkedin" href={site.social.linkedin} target="_blank" rel="noreferrer">
            Subscribe on LinkedIn
          </a>
        </div>

        <div>
          <h3 className="widget-title">Our Offices</h3>
          <ul className="contact-list">
            {site.offices.map((o) => (
              <li key={o.label}>
                <Icon name="pin" size={18} />
                <span><strong className="footer-label">{o.label}</strong>{o.line}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="widget-title">Get In Touch</h3>
          <ul className="contact-list">
            {site.phones.map((p) => (
              <li key={p}><Icon name="phone" size={18} /><a href={`tel:${p}`}>{p}</a></li>
            ))}
            <li><Icon name="mail" size={18} /><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><Icon name="clock" size={18} /><span>{site.hours}</span></li>
          </ul>
          <ul className="social">
            {Object.entries(site.social).map(([k, v]) => (
              <li key={k}>
                <a href={v} target="_blank" rel="noreferrer" aria-label={k}><SocialIcon name={k} /></a>
              </li>
            ))}
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
