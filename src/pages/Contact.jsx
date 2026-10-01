import { site } from '../config/site'
import { contactImg } from '../data/pxImages'
import Icon from '../components/Icon'
import { ContactStrip, PageBanner, SectionTitle, usePageTitle } from '../components/Common'

export default function Contact() {
  usePageTitle('Contact')
  return (
    <>
      <PageBanner title="Contact Us" sub="Let's talk — you get a reply within two working hours." />

      <section className="section">
        <div className="container row">
          <div>
            <SectionTitle title="Reach Us" />
            <ul className="info-list">
              {site.offices.map((o) => (
                <li key={o.label}>
                  <Icon name="pin" size={20} />
                  <div><strong>{o.label}</strong><p>{o.line}</p></div>
                </li>
              ))}
              <li>
                <Icon name="phone" size={20} />
                <div><strong>Phone</strong>{site.phones.map((p) => <p key={p}><a href={`tel:${p}`}>{p}</a></p>)}</div>
              </li>
              <li>
                <Icon name="mail" size={20} />
                <div><strong>Email</strong><p><a href={`mailto:${site.email}`}>{site.email}</a></p></div>
              </li>
              <li>
                <Icon name="clock" size={20} />
                <div><strong>Hours</strong><p>{site.hours}</p></div>
              </li>
            </ul>
          </div>
          <div className="row-img"><img src={contactImg} alt="Contact ProXinet" loading="lazy" /></div>
        </div>
      </section>

      <ContactStrip title="Send us a message" gray />
    </>
  )
}
