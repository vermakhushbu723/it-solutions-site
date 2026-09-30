import { useState } from 'react'
import { site } from '../config/site'
import { solutionFamilies } from '../data/pages'
import Icon from '../components/Icon'
import { Breadcrumbs, SectionTitle, usePageTitle } from '../components/Common'

const empty = { name: '', email: '', phone: '', service: '', message: '' }

export default function Contact() {
  usePageTitle('Contact')
  const [form, setForm] = useState(empty)
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    // Hook up your backend / email service here.
    setSent(true)
    setForm(empty)
  }

  return (
    <>
      <Breadcrumbs title="Contact" />
      <section className="section">
        <div className="container contact-wrap">
          <div className="contact-info-box">
            <SectionTitle light sub="Let's Talk" title="Let's talk" />
            <ul>
              {site.offices.map((o) => (
                <li key={o.label}><span className="ci-icon"><Icon name="pin" /></span><div><strong>{o.label}</strong><p>{o.line}</p></div></li>
              ))}
              <li><span className="ci-icon"><Icon name="phone" /></span><div><strong>Phone</strong>{site.phones.map((p) => <a key={p} href={`tel:${p}`} style={{ display: 'block' }}>{p}</a>)}</div></li>
              <li><span className="ci-icon"><Icon name="mail" /></span><div><strong>Email</strong><a href={`mailto:${site.email}`}>{site.email}</a></div></li>
              <li><span className="ci-icon"><Icon name="clock" /></span><div><strong>Hours</strong><p>{site.hours}</p></div></li>
            </ul>
          </div>

          <div>
            <SectionTitle sub="Get In Touch" title="Fill the form below" />
            {sent && <div className="alert">Thank you! We will get back to you shortly.</div>}
            <form className="contact-form" onSubmit={submit}>
              <input required placeholder="Name" value={form.name} onChange={set('name')} />
              <input required type="email" placeholder="E-Mail" value={form.email} onChange={set('email')} />
              <input placeholder="Phone Number" value={form.phone} onChange={set('phone')} />
              <select value={form.service} onChange={set('service')}>
                <option value="">Select Service</option>
                {solutionFamilies.map((s) => <option key={s.slug}>{s.name}</option>)}
              </select>
              <textarea required rows={6} placeholder="Your message here" value={form.message} onChange={set('message')} className="full" />
              <button type="submit" className="btn btn-primary full">Submit Now</button>
            </form>
          </div>
        </div>
      </section>

      <div className="map-placeholder">
        <Icon name="pin" size={40} />
        <p>Embed your Google Map here (see src/pages/Contact.jsx)</p>
      </div>
    </>
  )
}
