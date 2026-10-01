// Images downloaded from proxinet.in into public/images/px, matched to each page's topic.
const px = (f) => `/images/px/${f}`

export const logo = px('LOGO-1.png')

export const home = {
  slides: [
    { title: 'Security Solution', to: '/solutions/cyber-security', img: px('cloud-1-1400x553.jpg') },
    { title: 'Cloud Solutions', to: '/solutions/cloud', img: px('cc-1400x648.jpg') },
    { title: 'Data Center Solutions', to: '/solutions/data-center', img: px('sli345-1400x678.jpg') },
    { title: 'Backup Solutions', to: '/solutions/backup-dr', img: px('cloud-1400x788.jpg') },
    { title: 'Network Solutions', to: '/solutions/network', img: px('about-min-1400x788.png') },
    { title: 'Managed IT Services', to: '/services', img: px('sli432-1400x678.jpg'), text: 'Small in-house IT team? We manage the whole infrastructure for you.' },
    { title: 'Our Prestigious Clients', to: '/clients', img: px('clients-handing-1400x678.jpg'), text: 'Over 200 organisations across manufacturing, BFSI, pharma, education, retail, legal and hospitality.' },
  ],
  about: px('about.jpg'),
  portfolio: px('solutions1.jpg'),
  solutions: px('services-1200x800.jpg'),
  contact: px('callcenter.jpg'),
}

export const about = {
  banner: px('about-min.png'),
  overview: px('about.jpg'),
  believe: px('values.png'),
  vision: px('newmission.png'),
}

export const contactImg = px('contact.png')

// Banner (page-title background) per route.
const banners = {
  '/about': px('about-min.png'),
  '/partners': px('clients-handing-1400x678.jpg'),
  '/clients': px('clients-handing-1400x678.jpg'),
  '/case-studies': px('clients-handing-1400x678.jpg'),
  '/testimonials': px('clients-handing-1400x678.jpg'),
  '/careers': px('career-1400x553.jpg'),
  '/contact': px('about2.jpg'),
  '/solutions': px('services-1200x800.jpg'),
  '/services': px('sli432-1400x678.jpg'),
  '/services/plans': px('sli432-1400x678.jpg'),
  '/industries': px('solutions1.jpg'),
  '/resources': px('career-1400x553.jpg'),
  '/blog': px('career-1400x553.jpg'),
  '/news-events': px('career-1400x553.jpg'),
  '/tools': px('sli345-1400x678.jpg'),
  '/procurement': px('about2.jpg'),

  '/solutions/cloud': px('cloud-1400x788.jpg'),
  '/solutions/cloud/microsoft-azure': px('cloud-1400x788.jpg'),
  '/solutions/cloud/aws': px('cloud-1-1400x553.jpg'),
  '/solutions/cloud/microsoft-365': px('new.jpg'),
  '/solutions/cloud/google-cloud': px('sli312-1400x678.jpg'),
  '/solutions/cyber-security': px('security-1.jpg'),
  '/solutions/cyber-security/email-security': px('email-1400x553.jpg'),
  '/solutions/cyber-security/ssl-vpn': px('SSL-AND-VPN-1400x553.jpg'),
  '/solutions/cyber-security/data-loss-prevention': px('Data-Loss-Prevention-1400x553.jpg'),
  '/solutions/cyber-security/mobile-device-management': px('mobile-1400x553.jpg'),
  '/solutions/cyber-security/web-proxy-filtering': px('content-1400x678.jpg'),
  '/solutions/data-center': px('sli345-1400x678.jpg'),
  '/solutions/data-center/server-virtualization': px('virtual1-1-min.jpg'),
  '/solutions/backup-dr': px('cloud-1400x788.jpg'),
  '/solutions/network': px('about-min-1400x788.png'),
  '/solutions/network/enterprise-wifi': px('about2-1400x522.jpg'),
}

// Fallback banner per top-level section.
const sectionBanner = {
  solutions: px('sli345-1400x678.jpg'),
  services: px('c1-min-1200x800.jpg'),
  industries: px('solutions1.jpg'),
  about: px('about-min.png'),
  'case-studies': px('clients-handing-1400x678.jpg'),
  blog: px('career-1400x553.jpg'),
  resources: px('career-1400x553.jpg'),
  tools: px('sli345-1400x678.jpg'),
  partners: px('clients-handing-1400x678.jpg'),
}

const familyBanner = {
  cloud: px('cloud-1400x788.jpg'),
  'cyber-security': px('security-1.jpg'),
  'data-center': px('DataIn4-1400x733.jpg'),
  'backup-dr': px('cloud-1400x788.jpg'),
  network: px('about-min-1400x788.png'),
  collaboration: px('about2-1400x522.jpg'),
  'physical-security': px('security-1.jpg'),
}

export function bannerFor(pathname) {
  const path = pathname.replace(/\/$/, '') || '/'
  if (banners[path]) return banners[path]
  const [a, b] = path.split('/').filter(Boolean)
  if (a === 'solutions' && familyBanner[b]) return familyBanner[b]
  return sectionBanner[a] || px('about2.jpg')
}

// Content image (shown next to the intro text) per route.
const pageImages = {
  '/solutions/cloud': px('123.jpg'),
  '/solutions/cloud/microsoft-azure': px('123.jpg'),
  '/solutions/cloud/aws': px('aws-800x800.png'),
  '/solutions/cloud/microsoft-365': px('share-point.jpg'),
  '/solutions/cloud/google-cloud': px('GSuite.jpg'),
  '/solutions/cloud/hybrid-cloud': px('324bob.png'),
  '/solutions/cloud/cloud-migration': px('gh.jpg'),
  '/solutions/cloud/cloud-cost-optimization': px('hh.jpg'),
  '/solutions/cloud/virtual-desktop-avd': px('drive.jpg'),
  '/solutions/cyber-security': px('endpoint.png'),
  '/solutions/cyber-security/endpoint-security': px('endpoint.png'),
  '/solutions/cyber-security/ssl-vpn': px('ssl-vpn.png'),
  '/solutions/cyber-security/mobile-device-management': px('Microsoft-Intune-1400x553.jpg'),
  '/solutions/cyber-security/web-proxy-filtering': px('content12.jpg'),
  '/solutions/data-center': px('engineer-making.jpg'),
  '/solutions/data-center/servers': px('a15.jpg'),
  '/solutions/data-center/san-storage': px('net.jpg'),
  '/solutions/data-center/nas-storage': px('ibm1.jpg'),
  '/solutions/data-center/hyperconverged-hci': px('a12.jpg'),
  '/solutions/backup-dr': px('a16.jpg'),
  '/solutions/backup-dr/veeam-backup': px('a16.jpg'),
  '/solutions/backup-dr/cloud-backup': px('backup.jpg'),
  '/solutions/backup-dr/ransomware-recovery': px('a3.jpg'),
  '/solutions/network': px('a18.jpg'),
  '/solutions/network/structured-cabling': px('net-1.jpg'),
  '/solutions/network/switching-routing': px('a21.jpg'),
  '/solutions/network/enterprise-wifi': px('ju.jpg'),
  '/services/project-management': px('pro-mgmt.jpg'),
  '/services/247-noc-helpdesk': px('itil-800x800.png'),
  '/services/managed-it-services': px('itil-800x800.png'),
  '/news-events': px('unnamed.jpg'),
}

// Pool used for cards and any page without a specific image.
const pool = [
  'about.jpg', '123.jpg', 'engineer-making.jpg', 'a15.jpg', 'a18.jpg', 'pro-mgmt.jpg', 'gh.jpg',
  'content12.jpg', 'a16.jpg', 'net.jpg', 'a21.jpg', 'hh.jpg', 'a12.jpg', 'ju.jpg', 'a3.jpg', 'dell.jpg',
].map(px)

const hash = (s) => [...s].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7)

export const imageFor = (pathname) => pageImages[pathname] || pool[hash(pathname) % pool.length]

export const cloudLogos = [px('aws12.jpg'), px('azure.jpg'), px('cloude.png')]
