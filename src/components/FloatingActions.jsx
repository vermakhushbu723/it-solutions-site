import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { company } from '../data/proxinet/company'
import Icon, { SocialIcon } from './Icon'

/* ---------- Scripted assistant (from the ProXinet project) ---------- */
const quickReplies = [
  'What does a server AMC cost?',
  'We need ransomware protection',
  'We want to migrate to Azure',
  'I need to raise a ticket',
]

const answer = (q) => {
  const s = q.toLowerCase()
  if (s.includes('amc') || s.includes('price') || s.includes('cost'))
    return { text: 'AMC comes in three tiers — Bronze at ₹15,000/mo (up to 25 endpoints), Silver at ₹40,000/mo (up to 100), and Gold on a custom quote. The exact figure follows an assessment.', cta: { label: 'SLA & Support Plans', to: '/services/plans' } }
  if (s.includes('ransom') || s.includes('security') || s.includes('virus'))
    return { text: 'Ransomware needs three layers — EDR on the endpoint, an email security gateway, and immutable backup. You can score your current setup in two minutes.', cta: { label: 'Security Health Score', to: '/tools/security-health-score' } }
  if (s.includes('azure') || s.includes('cloud') || s.includes('migrat'))
    return { text: 'We migrate in waves — dependency mapping, a pilot, then the bulk move, always with a rollback plan. You can estimate the monthly cost up front.', cta: { label: 'Cloud Cost Calculator', to: '/tools/cloud-cost-calculator' } }
  if (s.includes('ticket') || s.includes('support') || s.includes('issue'))
    return { text: 'Existing clients can raise a ticket by phone, email or WhatsApp — the SLA timer starts immediately. If you are new, the contact form is the best route.', cta: { label: 'Contact us', to: '/contact' } }
  if (s.includes('backup') || s.includes('veeam') || s.includes('restore'))
    return { text: 'We follow the 3-2-1-1-0 rule — one immutable copy and zero errors on a verified restore. Veeam SureBackup verifies every backup automatically.', cta: { label: 'Backup & DR', to: '/solutions/backup-dr' } }
  if (s.includes('wifi') || s.includes('wi-fi') || s.includes('network'))
    return { text: 'For Wi-Fi we start with a predictive survey, then AP placement, and after install a heatmap validation report proves the design was delivered.', cta: { label: 'Enterprise Wi-Fi', to: '/solutions/network/enterprise-wifi' } }
  return { text: 'This is best discussed with an engineer. Send us your requirement and we will reply within two working hours.', cta: { label: 'Contact us', to: '/contact' } }
}

function ChatPanel({ onClose }) {
  const [msgs, setMsgs] = useState([{ from: 'bot', text: 'Hello! I am the ProXinet assistant. What are you looking for?' }])
  const [val, setVal] = useState('')
  const boxRef = useRef(null)

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs])

  const send = (text) => {
    const t = (text ?? val).trim()
    if (!t) return
    setMsgs((m) => [...m, { from: 'me', text: t }])
    setVal('')
    setTimeout(() => setMsgs((m) => [...m, { from: 'bot', ...answer(t) }]), 400)
  }

  return (
    <div className="chat-panel" role="dialog" aria-label="ProXinet assistant">
      <div className="chat-head">
        <span className="chat-avatar"><Icon name="robot" size={20} /></span>
        <span>
          <strong>ProXinet Assistant</strong>
          <small>Usually replies instantly</small>
        </span>
        <button onClick={onClose} aria-label="Close chat"><Icon name="close" size={18} /></button>
      </div>
      <div className="chat-body" ref={boxRef}>
        {msgs.map((m, i) => (
          <div key={i} className={`msg ${m.from}`}>
            {m.text}
            {m.cta && <Link to={m.cta.to} onClick={onClose}>{m.cta.label} →</Link>}
          </div>
        ))}
      </div>
      <div className="chat-foot">
        <div className="quick">
          {quickReplies.map((q) => <button key={q} onClick={() => send(q)}>{q}</button>)}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); send() }}>
          <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="Type your question…" aria-label="Message" />
          <button type="submit" aria-label="Send"><Icon name="send" size={18} /></button>
        </form>
      </div>
    </div>
  )
}

/* ---------- Floating buttons: back-to-top, call, WhatsApp, chat ---------- */
export default function FloatingActions() {
  const [chat, setChat] = useState(false)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const wa = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent('Hi ProXinet, I would like to talk about IT infrastructure.')}`

  return (
    <>
      <div className="fab-stack">
        <button
          className={`fab fab-top ${showTop ? 'show' : ''}`}
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Icon name="chevron" size={20} className="rot-180" />
        </button>
        <a className="fab fab-call" href={`tel:${company.phones[0]}`} aria-label={`Call ${company.phones[0]}`}>
          <span className="fab-label">Call us</span>
          <Icon name="phone" size={22} />
        </a>
        <a className="fab fab-wa" href={wa} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
          <span className="fab-label">WhatsApp</span>
          <SocialIcon name="whatsapp" size={26} />
        </a>
        <button className="fab fab-chat" onClick={() => setChat((c) => !c)} aria-label="Open chat assistant" aria-expanded={chat}>
          <span className="fab-label">Chat with us</span>
          <Icon name={chat ? 'close' : 'chat'} size={24} />
        </button>
      </div>
      {chat && <ChatPanel onClose={() => setChat(false)} />}
    </>
  )
}
