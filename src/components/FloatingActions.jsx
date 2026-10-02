import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'

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

const MAX = 500

// microsoft.com "Store Assistant" style panel: light-blue sheet, white bubbles, outlined input with a counter.
function ChatPanel({ onClose }) {
  const [msgs, setMsgs] = useState([{ from: 'bot', text: "Hi, I'm the ProXinet Assistant. I can help you with our IT solutions, services and support, or connect you with one of our engineers. What can I do for you today?" }])
  const [val, setVal] = useState('')
  const boxRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs])

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const send = (text) => {
    const t = (text ?? val).trim()
    if (!t) return
    setMsgs((m) => [...m, { from: 'me', text: t }])
    setVal('')
    setTimeout(() => setMsgs((m) => [...m, { from: 'bot', ...answer(t) }]), 400)
  }

  const restart = () => {
    setMsgs((m) => m.slice(0, 1))
    setVal('')
  }

  return (
    <div className="chat-panel ms-chat" role="dialog" aria-label="ProXinet Assistant">
      <div className="chat-head">
        <span className="chat-avatar"><Icon name="chat" size={22} /></span>
        <strong>ProXinet Assistant</strong>
        <span className="chat-head-actions">
          <button onClick={restart} aria-label="New conversation" title="New conversation"><Icon name="plus" size={20} /></button>
          <button onClick={onClose} aria-label="Minimise chat" title="Minimise"><Icon name="chevron" size={20} /></button>
          <button onClick={onClose} aria-label="Close chat" title="Close"><Icon name="close" size={20} /></button>
        </span>
      </div>
      <div className="chat-body" ref={boxRef}>
        {msgs.map((m, i) => (
          <div key={i} className={`msg ${m.from}`}>
            {m.text}
            {m.cta && <Link to={m.cta.to} onClick={onClose}>{m.cta.label} →</Link>}
          </div>
        ))}
        {msgs.length === 1 && (
          <div className="quick">
            {quickReplies.map((q) => <button key={q} onClick={() => send(q)}>{q}</button>)}
          </div>
        )}
      </div>
      <div className="chat-foot">
        <form onSubmit={(e) => { e.preventDefault(); send() }}>
          <textarea
            ref={inputRef}
            rows={2}
            value={val}
            maxLength={MAX}
            onChange={(e) => setVal(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            placeholder="Ask me anything…"
            aria-label="Message"
          />
          <div className="chat-input-bar">
            <span>{val.length} / {MAX}</span>
            <button type="submit" aria-label="Send" disabled={!val.trim()}><Icon name="send" size={20} /></button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ---------- Floating actions: back-to-top and the "Need help? Let's chat" launcher ---------- */
export default function FloatingActions() {
  const [chat, setChat] = useState(false)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
        {!chat && (
          <button className="chat-launcher" onClick={() => setChat(true)} aria-label="Need help? Let's chat" aria-expanded={chat}>
            <span className="chat-launcher-avatar">
              <img src="/images/photos/chat-avatar.jpg" alt="" />
              <span className="chat-launcher-badge"><Icon name="chat" size={12} /></span>
            </span>
            <span className="chat-launcher-text">Need help?<br />Let&apos;s chat</span>
          </button>
        )}
      </div>
      {chat && <ChatPanel onClose={() => setChat(false)} />}
    </>
  )
}
