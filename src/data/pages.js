// Adapts the ProXinet content (src/data/proxinet) to this site's page templates.
import { company, stats, processSteps, values, painPoints } from './proxinet/company'
import { solutionFamilies, findFamily, findChild } from './proxinet/solutions'
import { services, slaPlans, findService } from './proxinet/services'
import { industries, findIndustry } from './proxinet/industries'
import { leadership, milestones, jobs } from './proxinet/people'
import { caseStudies, testimonials, partners, certifications, clientLogos } from './proxinet/proof'
import { posts, glossary, faqs, whitepapers } from './proxinet/resources'

export { company, stats, processSteps, values, painPoints, solutionFamilies, services, industries, partners, posts }

// ProXinet icon names -> components/Icon.jsx names
const iconMap = {
  cloud: 'cloud', shield: 'shield', server: 'server', backup: 'refresh', wifi: 'network', team: 'users',
  camera: 'video', setting: 'gear', safety: 'shield', bulb: 'chat', project: 'chart', customer: 'phone',
  scan: 'search', user: 'users', audit: 'search', shop: 'box', swap: 'refresh', tool: 'gear', bank: 'building',
  medicine: 'shield', read: 'layers', build: 'building', coffee: 'star', code: 'laptop',
}
export const icon = (name) => iconMap[name] || 'box'

const steps = processSteps.map((s) => ({ title: s.title, text: s.desc }))

/* ---------- Navbar menu (same structure as proxinet.in) ---------- */
const sol = (fam, slug) => (slug ? `/solutions/${fam}/${slug}` : `/solutions/${fam}`)
export const menu = [
  { label: 'Home', to: '/' },
  {
    label: 'Solution', to: '/solutions',
    children: [
      { label: 'Cloud Solutions', to: sol('cloud'), children: [
        { label: 'Azure', to: sol('cloud', 'microsoft-azure') },
        { label: 'AWS', to: sol('cloud', 'aws') },
        { label: 'Microsoft 365', to: sol('cloud', 'microsoft-365') },
        { label: 'Google Cloud', to: sol('cloud', 'google-cloud') },
      ] },
      { label: 'Security Solution', to: sol('cyber-security'), children: [
        { label: 'End Point Solutions', to: sol('cyber-security', 'endpoint-security') },
        { label: 'Email Security', to: sol('cyber-security', 'email-security') },
        { label: 'SSL and VPN', to: sol('cyber-security', 'ssl-vpn') },
        { label: 'Data Loss Prevention', to: sol('cyber-security', 'data-loss-prevention') },
        { label: 'Mobile Device Management', to: sol('cyber-security', 'mobile-device-management') },
        { label: 'Proxy and Content Filters', to: sol('cyber-security', 'web-proxy-filtering') },
      ] },
      { label: 'Data Center Solutions', to: sol('data-center'), children: [
        { label: 'Virtualization', to: sol('data-center', 'server-virtualization') },
        { label: 'Server', to: sol('data-center', 'servers') },
        { label: 'SAN', to: sol('data-center', 'san-storage') },
        { label: 'NAS', to: sol('data-center', 'nas-storage') },
      ] },
      { label: 'Backup Solutions', to: sol('backup-dr'), children: [
        { label: 'Backup', to: sol('backup-dr', 'veeam-backup') },
      ] },
      { label: 'Network Solutions', to: sol('network'), children: [
        { label: 'Wired', to: sol('network', 'structured-cabling') },
        { label: 'Wireless', to: sol('network', 'enterprise-wifi') },
      ] },
    ],
  },
  {
    label: 'Services', to: '/services',
    children: [
      { label: 'Infrastructure Services', to: '/services/infrastructure-assessment' },
      { label: 'Data Center Services', to: sol('data-center') },
      { label: 'Network Services', to: sol('network') },
      { label: 'Cloud Services', to: sol('cloud') },
    ],
  },
  { label: 'Client', to: '/clients' },
  {
    label: 'Resources', to: '/resources',
    children: [
      { label: 'News', to: '/news-events' },
      { label: 'Events', to: '/news-events#events' },
    ],
  },
  { label: 'Alliances', to: '/partners' },
  { label: 'Contact', to: '/contact' },
  { label: 'About', to: '/about' },
]

/* ---------- Detail pages (SolutionDetail template) ---------- */
const tile = (title, text, ic) => ({ title, text, icon: ic })

export function familyPage(slug) {
  const f = findFamily(slug)
  if (!f) return null
  return {
    title: f.name,
    kicker: f.tag,
    heroTitle: f.name,
    heroText: f.hero,
    aboutLabel: 'What we do',
    aboutTitle: f.blurb,
    about: `Typical problems we are called in for: ${f.pains.join('; ')}.`,
    features: f.children.slice(0, 4).map((c) => tile(c.name, c.blurb, icon(f.icon))),
    processLabel: 'Services',
    processTitle: `What ${f.name} includes`,
    process: f.children.map((c) => ({ title: c.name, text: c.blurb, to: `/solutions/${f.slug}/${c.slug}` })),
    extra: { title: 'How we work', text: processSteps.map((s) => `${s.title}: ${s.desc}`).join(' ') },
    platforms: f.tag.split(' · '),
  }
}

export function childPage(fam, slug) {
  const f = findFamily(fam)
  const c = findChild(fam, slug)
  if (!c) return null
  return {
    title: c.name,
    trail: { label: f.name, to: `/solutions/${f.slug}` },
    kicker: f.name,
    heroTitle: c.name,
    heroText: c.blurb,
    aboutLabel: f.name,
    aboutTitle: c.name,
    about: c.blurb,
    features: c.bullets.slice(0, 4).map((b) => tile(b, '', icon(f.icon))),
    processLabel: 'How we work',
    processTitle: 'Assess → Design → Deploy → Manage',
    process: steps,
  }
}

export function servicePage(slug) {
  const s = findService(slug)
  if (!s) return null
  return {
    title: s.name,
    kicker: 'Service',
    heroTitle: s.name,
    heroText: s.hero,
    aboutLabel: 'Service',
    aboutTitle: s.hero,
    about: s.blurb,
    features: s.deliverables.slice(0, 4).map((d) => tile(d, '', icon(s.icon))),
    processLabel: 'Deliverables',
    processTitle: 'What you get',
    process: s.deliverables.map((d) => ({ title: d, text: '' })),
    extra: s.faqs[0] ? { title: s.faqs[0].q, text: s.faqs[0].a } : null,
  }
}

export function industryPage(slug) {
  const ind = findIndustry(slug)
  if (!ind) return null
  const fits = ind.fits.map(findFamily).filter(Boolean)
  return {
    title: ind.name,
    kicker: 'Industry',
    heroTitle: `IT infrastructure for ${ind.name}`,
    heroText: ind.blurb,
    aboutLabel: 'Reality check',
    aboutTitle: `Typical IT challenges in ${ind.name}`,
    about: ind.blurb,
    features: ind.challenges.map((c) => tile(c, '', icon(ind.icon))),
    processLabel: 'Best fit',
    processTitle: 'Recommended solutions',
    process: fits.map((f) => ({ title: f.name, text: f.blurb, to: `/solutions/${f.slug}` })),
    extra: { title: 'Which frameworks apply', text: ind.compliance.join(' · ') },
  }
}

/* ---------- Info pages (Breadcrumbs + card grid + CTA) ---------- */
const fmtDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

const tools = [
  { slug: 'cloud-cost-calculator', t: 'Cloud Cost Calculator', d: 'Enter VMs, storage and backup for an instant Azure or AWS monthly estimate.', ic: 'cloud' },
  { slug: 'security-health-score', t: 'IT Security Health Score', d: 'Ten questions, one score and a prioritised set of recommendations.', ic: 'shield' },
  { slug: 'amc-plan-selector', t: 'AMC Plan Selector', d: 'Endpoints, sites and coverage give you the right plan and an indicative price.', ic: 'chart' },
  { slug: 'server-sizing', t: 'Server Sizing Tool', d: 'Users and workload give you recommended CPU, RAM and storage.', ic: 'server' },
  { slug: 'wifi-estimator', t: 'Wi-Fi AP Estimator', d: 'Floor area and user density give you the access point count.', ic: 'network' },
  { slug: 'tco-calculator', t: 'Cloud vs On-prem TCO', d: 'A three-year total cost comparison, including the hidden costs on both sides.', ic: 'chart' },
]

const news = [
  { date: '2026-09-02', type: 'Event', title: 'Webinar: Ransomware readiness for SMEs', desc: 'A 45-minute session co-hosted with Veeam on immutable backup and the recovery playbook.' },
  { date: '2026-08-18', type: 'News', title: '24x7 NOC coverage expanded', desc: 'The 15-minute P1 response guarantee is now live for Gold plan clients.' },
  { date: '2026-07-25', type: 'News', title: 'New Delhi office expansion', desc: 'The service desk team at the New Ashok Nagar office has doubled in size.' },
  { date: '2026-06-30', type: 'Event', title: 'Workshop: Cloud cost optimisation', desc: 'A hands-on session on the practical steps that cut Azure and AWS bills by 20 to 40 percent.' },
  { date: '2026-05-12', type: 'News', title: 'ISO 27001:2022 transition complete', desc: 'The ISMS has migrated to the updated standard and cleared its surveillance audit.' },
]

const procurementDocs = [
  'Company profile PDF — CIN, GST and Udyam registration',
  'ISO 27001:2022 and ISO 9001:2015 certificates',
  'OEM partnership certificates (Microsoft, Dell, Fortinet, Veeam)',
  'Financial credentials — turnover band and bank reference',
  'Client references — industry-matched, contactable',
  'Insurance — professional indemnity and workmen compensation',
  'Data protection & confidentiality policy (DPDP Act 2023 aligned)',
  'Information security policy summary',
  'Sample SLA document and escalation matrix',
  'Background verification policy for deployed engineers',
  'MSA / NDA templates',
  'Business continuity plan summary',
]

// Each entry: title, sub, heading, desc, cards[{title, text, meta, icon, to}], cardStyle
export const infoPages = {
  '/about/leadership': {
    title: 'Leadership', sub: 'Team', heading: 'Leadership',
    cards: leadership.map((p) => ({ title: p.name, meta: `${p.role} · ${p.exp}`, text: p.focus, icon: 'users' })),
    style: 'team',
  },
  '/about/story': {
    title: 'Our Story', sub: 'Our story', heading: 'Where we started, and where we are now',
    cards: milestones.map((m) => ({ title: m.title, meta: m.year, text: m.desc })), style: 'process',
  },
  '/about/process': {
    title: 'Our Process', sub: 'How we work', heading: 'Our delivery process',
    cards: processSteps.map((s) => ({ title: s.title, meta: s.n, text: `${s.desc} Output: ${s.out}.` })), style: 'process',
    extra: {
      sub: 'Governance', heading: 'Support delivery framework', desc: 'ITIL-aligned — these four pillars apply to every managed account.',
      cards: [
        { title: 'Governance', text: 'SLA-based delivery, 24/7 support and a standardised incident process.', icon: 'chart' },
        { title: 'Resource pool', text: 'ITIL-trained engineers with enterprise delivery experience, plus backup resources.', icon: 'users' },
        { title: 'Knowledge management', text: 'Client-specific repositories, redundancy planning and rapid response capability.', icon: 'layers' },
        { title: 'Information security', text: 'Data confidentiality, regulatory compliance and perimeter-to-endpoint protection.', icon: 'shield' },
      ],
    },
  },
  '/about/certifications': {
    title: 'Certifications', sub: 'Credentials', heading: 'Certifications & Compliance',
    cards: certifications.map((c) => ({ title: c.name, meta: c.status, text: c.desc, icon: 'check' })),
  },
  '/clients': {
    title: 'Clients', sub: 'Trusted by', heading: 'Our prestigious clients',
    desc: 'Over 200 organisations across manufacturing, BFSI, pharma, education, retail, legal and hospitality.',
    cards: clientLogos.map((c) => ({ title: c.name, meta: findIndustry(c.industry)?.name, icon: 'building' })),
  },
  '/case-studies': {
    title: 'Case Studies', sub: 'Case studies', heading: 'What we built, and what it delivered',
    desc: 'Every case study follows the same format — challenge, solution architecture, deployed stack and measurable outcome.',
    cards: caseStudies.map((c) => ({ title: c.title, meta: `${c.metric.value} ${c.metric.label}`, text: c.result, to: `/case-studies/${c.slug}` })),
    style: 'process',
  },
  '/testimonials': {
    title: 'Testimonials', sub: 'Client voices', heading: 'Testimonials',
    desc: 'With names, designations and companies — anonymous quotes carry no weight.',
    cards: testimonials.map((t) => ({ title: `${t.by}, ${t.role}`, meta: t.industry, text: `“${t.text}”`, icon: 'chat' })),
  },
  '/procurement': {
    title: 'Procurement Pack', sub: 'For procurement teams', heading: 'Vendor Onboarding Pack',
    desc: 'Every document requested during enterprise vendor registration, in a single request. Email us from your business address and we send the pack within one working day.',
    cards: procurementDocs.map((d) => ({ title: d, icon: 'check' })),
  },
  '/resources': {
    title: 'Resources', sub: 'Resources', heading: 'To read, to understand, to decide',
    cards: [
      { title: 'Blog', text: 'Practical IT writing, without the jargon.', icon: 'layers', to: '/blog' },
      { title: 'Whitepapers', text: 'Guides, playbooks and checklists.', icon: 'box', to: '/resources/whitepapers' },
      { title: 'Glossary', text: 'IT infrastructure terms in plain language.', icon: 'search', to: '/resources/glossary' },
      { title: 'FAQs', text: 'Common questions, direct answers.', icon: 'chat', to: '/resources/faq' },
      { title: 'Tools', text: 'Calculators that give you real numbers.', icon: 'chart', to: '/tools' },
      { title: 'News & Events', text: 'Company news, webinars and workshops.', icon: 'star', to: '/news-events' },
    ],
  },
  '/resources/whitepapers': {
    title: 'Whitepapers', sub: 'Whitepapers', heading: 'Guides, playbooks and checklists',
    cards: whitepapers.map((w) => ({ title: w.title, meta: `${w.cat} · ${w.pages} pages`, text: w.desc, icon: 'box' })),
  },
  '/resources/glossary': {
    title: 'Glossary', sub: 'Glossary', heading: 'IT infrastructure terms in plain language',
    cards: glossary.map((g) => ({ title: g.term, meta: g.full, text: g.def })), style: 'process',
  },
  '/resources/faq': {
    title: 'FAQs', sub: 'FAQ', heading: 'Common questions, direct answers',
    cards: faqs.map((f) => ({ title: f.q, meta: f.cat, text: f.a })), style: 'process',
    cta: 'Question not answered here?',
  },
  '/tools': {
    title: 'Tools', sub: 'Tools', heading: 'Calculators that give you real numbers',
    cards: tools.map((t) => ({ title: t.t, text: t.d, icon: t.ic, to: `/tools/${t.slug}` })),
  },
  '/news-events': {
    title: 'News & Events', sub: 'Company', heading: 'News & Events', anchor: 'events',
    cards: news.map((n) => ({ title: n.title, meta: `${n.type} · ${fmtDate(n.date)}`, text: n.desc })), style: 'process',
  },
  '/careers': {
    title: 'Careers', sub: 'Careers', heading: 'People who solve the problem, even at 2 a.m.',
    desc: `${jobs.length} roles currently open. Send your resume even if no role matches right now — we keep it in our talent database.`,
    cards: jobs.map((j) => ({ title: j.title, meta: `${j.dept} · ${j.loc} · ${j.type} · ${j.exp}`, text: `${j.desc} Skills: ${j.skills.join(', ')}.` })),
    style: 'process',
  },
  '/services/plans': {
    title: 'SLA & Support Plans', sub: 'Plans', heading: 'SLA & Support Plans',
    desc: 'Three tiers with transparent scope, defined response times and indicative pricing. The final quote follows the assessment.',
    cards: slaPlans.map((p) => ({
      title: `${p.tier} — ${p.badge}`,
      meta: `${p.price} ${p.unit}`,
      text: `Best for: ${p.best}. ${p.features.map((f) => `${f.k}: ${f.v}`).join(' · ')}`,
    })),
    style: 'process', cta: 'Not sure which plan fits?',
  },
}

// Tool pages
tools.forEach((t) => {
  infoPages[`/tools/${t.slug}`] = {
    title: t.t, sub: 'Tool', heading: t.t, desc: t.d,
    cards: tools.filter((x) => x.slug !== t.slug).map((x) => ({ title: x.t, text: x.d, icon: x.ic, to: `/tools/${x.slug}` })),
    cardsHeading: 'More tools',
  }
})

// Case study detail pages
caseStudies.forEach((c) => {
  infoPages[`/case-studies/${c.slug}`] = {
    title: c.title, sub: c.client, heading: c.title, desc: `${c.size}. ${c.challenge}`,
    trail: { label: 'Case Studies', to: '/case-studies' },
    cards: [
      ...c.metrics.map((m) => ({ title: m.value, text: m.label, icon: 'chart' })),
      { title: 'Solution', text: c.solution, icon: 'gear' },
      { title: 'Deployed stack', text: c.stack.join(' · '), icon: 'server' },
      { title: 'Outcome', text: c.result, icon: 'star' },
    ],
    extraQuote: c.quote,
  }
})

// Blog post pages
posts.forEach((p) => {
  infoPages[`/blog/${p.slug}`] = {
    title: p.title, sub: `${p.cat} · ${fmtDate(p.date)} · ${p.read}`, heading: p.title, desc: p.excerpt,
    trail: { label: 'Blog', to: '/blog' },
    cards: p.body.map((b) => ({ title: b.h, text: b.p })), style: 'process',
  }
})

export const blogDate = fmtDate

/* ---------- Images (downloaded from proxinet.in, see data/pxImages.js) ---------- */
export { bannerFor as bannerImage, imageFor } from './pxImages'
