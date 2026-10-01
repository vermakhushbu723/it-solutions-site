// Technology alliances shown on /partners and in the logo strip.
// Logos are the proxinet.in alliance images (public/images/alliances/a1..a22.jpg).
// `solutions` are paths of existing solution pages that use this partner's products.
import { partners as tiers } from './proxinet/proof'

const logo = (n) => `/images/alliances/a${n}.jpg`
// Same logos with the white margin trimmed — used large on the detail page
const logoHd = (src) => src.replace("/alliances/", "/alliances-trim/").replace(".jpg", ".png")

const list = [
  {
    slug: 'vmware', name: 'VMware', logo: logo(1), category: 'Virtualization',
    intro: 'Server virtualization and private cloud platforms that let one physical host run many workloads with high availability.',
    offer: ['vSphere cluster design with HA and DRS', 'P2V and V2V migrations', 'vSAN and resource pool planning', 'Licence review and optimisation'],
    solutions: ['/solutions/data-center/server-virtualization', '/solutions/data-center/hyperconverged-hci', '/solutions/cloud/hybrid-cloud'],
  },
  {
    slug: 'veeam', name: 'Veeam', logo: logo(2), category: 'Backup & DR',
    intro: 'Backup, replication and recovery for virtual, physical and cloud workloads, with automatic restore verification.',
    offer: ['Backup & Replication deployment', 'Immutable, ransomware-safe repositories', 'Microsoft 365 backup', 'Scheduled restore testing'],
    solutions: ['/solutions/backup-dr/veeam-backup', '/solutions/backup-dr/ransomware-recovery', '/solutions/backup-dr/cloud-backup'],
  },
  {
    slug: 'veritas', name: 'Veritas', logo: logo(3), category: 'Backup & DR',
    intro: 'Enterprise data protection for large and mixed environments, covering physical, virtual and cloud workloads.',
    offer: ['NetBackup design and rollout', 'Long-term retention policies', 'Cloud tiering of backup data', 'Recovery runbooks'],
    solutions: ['/solutions/backup-dr', '/solutions/backup-dr/disaster-recovery-draas'],
  },
  {
    slug: 'sapphire', name: 'Sapphire', logo: logo(4), category: 'Monitoring & Management',
    intro: 'IT infrastructure management and monitoring tools that give a single view of devices, networks and service health.',
    offer: ['Infrastructure monitoring setup', 'Alerting and escalation rules', 'Service dashboards', 'Health and SLA reporting'],
    solutions: ['/solutions/network/network-monitoring', '/services/247-noc-helpdesk'],
  },
  {
    slug: 'sonicwall', name: 'SonicWall', logo: logo(5), category: 'Firewall',
    intro: 'Next-generation firewalls and secure remote access for offices and branches of every size.',
    offer: ['NGFW sizing and deployment', 'Rule hardening and IPS tuning', 'SSL VPN for remote users', 'Firmware and licence management'],
    solutions: ['/solutions/cyber-security/firewall-utm', '/solutions/cyber-security/ssl-vpn'],
  },
  {
    slug: 'ruckus', name: 'Ruckus', logo: logo(6), category: 'Wireless',
    intro: 'Enterprise Wi-Fi and switching built for high-density spaces such as campuses, hotels and offices.',
    offer: ['Predictive Wi-Fi survey', 'Access point and controller setup', 'Guest network isolation', 'Post-install heatmap validation'],
    solutions: ['/solutions/network/enterprise-wifi', '/solutions/network/switching-routing'],
  },
  {
    slug: 'rsa', name: 'RSA', logo: logo(7), category: 'Identity & Access',
    intro: 'Strong authentication and identity security, including multi-factor sign-in for users and administrators.',
    offer: ['MFA rollout for VPN and apps', 'Token and authenticator setup', 'Access policy design', 'Audit and compliance reports'],
    solutions: ['/solutions/cyber-security/identity-access-management', '/solutions/cyber-security/zero-trust'],
  },
  {
    slug: 'nutanix', name: 'Nutanix', logo: logo(8), category: 'Hyperconverged',
    intro: 'Hyperconverged infrastructure that combines compute, storage and virtualization in one simple, scalable stack.',
    offer: ['HCI cluster sizing', 'Migration from legacy SAN', 'Scale-out planning', 'Built-in DR configuration'],
    solutions: ['/solutions/data-center/hyperconverged-hci', '/solutions/data-center/server-virtualization'],
  },
  {
    slug: 'netapp', name: 'NetApp', logo: logo(9), category: 'Storage',
    intro: 'Unified storage for files and blocks, with snapshots and replication for fast recovery.',
    offer: ['SAN and NAS design', 'Snapshot and replication schedules', 'Capacity and tiering plans', 'Performance baselining'],
    solutions: ['/solutions/data-center/san-storage', '/solutions/data-center/nas-storage'],
  },
  {
    slug: 'microsoft', name: 'Microsoft', logo: logo(10), category: 'Cloud & Productivity',
    intro: 'Azure, Microsoft 365, Teams and Intune — cloud infrastructure and productivity tools for the modern workplace.',
    offer: ['Azure landing zones and migration', 'Microsoft 365 tenant setup and mail migration', 'Teams and SharePoint governance', 'Intune device compliance'],
    solutions: ['/solutions/cloud/microsoft-azure', '/solutions/cloud/microsoft-365', '/solutions/collaboration/microsoft-teams', '/solutions/cloud/virtual-desktop-avd'],
  },
  {
    slug: 'mcafee', name: 'McAfee', logo: logo(11), category: 'Endpoint Security',
    intro: 'Endpoint and data protection that guards laptops, desktops and servers against malware and data loss.',
    offer: ['Endpoint protection rollout', 'Central policy management', 'Device and data control', 'Threat reporting'],
    solutions: ['/solutions/cyber-security/endpoint-security', '/solutions/cyber-security/data-loss-prevention'],
  },
  {
    slug: 'hp', name: 'HP', logo: logo(12), category: 'Compute & Endpoints',
    intro: 'Business laptops, desktops, workstations and servers for offices of every size.',
    offer: ['Device procurement and imaging', 'Server supply and commissioning', 'Warranty registration', 'Lifecycle and refresh planning'],
    solutions: ['/solutions/data-center/servers', '/services/procurement-licensing'],
  },
  {
    slug: 'fortinet', name: 'Fortinet', logo: logo(13), category: 'Network Security',
    intro: 'Security-driven networking: next-generation firewalls, SD-WAN and secure access from one platform.',
    offer: ['FortiGate NGFW deployment', 'SD-WAN for multi-branch links', 'IPS and application control', 'HA pair configuration'],
    solutions: ['/solutions/cyber-security/firewall-utm', '/solutions/network/sd-wan', '/solutions/cyber-security/ssl-vpn'],
  },
  {
    slug: 'emc', name: 'EMC', logo: logo(14), category: 'Storage',
    intro: 'Enterprise storage arrays for databases and virtualization that need high performance and reliability.',
    offer: ['Block storage design', 'Replication for DR', 'Tiering and thin provisioning', 'Storage health checks'],
    solutions: ['/solutions/data-center/san-storage', '/solutions/backup-dr/disaster-recovery-draas'],
  },
  {
    slug: 'dell', name: 'Dell Technologies', logo: logo(15), category: 'Server & Storage',
    intro: 'Servers, storage and business PCs — from a single office to a full data center refresh.',
    offer: ['PowerEdge server sizing and supply', 'Storage and backup appliances', 'Business laptop and desktop rollouts', 'Warranty and AMC coverage'],
    solutions: ['/solutions/data-center/servers', '/solutions/data-center/san-storage', '/solutions/data-center/hyperconverged-hci'],
  },
  {
    slug: 'commvault', name: 'Commvault', logo: logo(16), category: 'Backup & DR',
    intro: 'Data protection and management across on-premises and cloud workloads from a single console.',
    offer: ['Backup platform deployment', 'Cloud and SaaS data protection', 'Ransomware recovery planning', 'Retention and compliance policies'],
    solutions: ['/solutions/backup-dr', '/solutions/backup-dr/ransomware-recovery', '/solutions/backup-dr/cloud-backup'],
  },
  {
    slug: 'citrix', name: 'Citrix', logo: logo(17), category: 'Virtual Desktops',
    intro: 'Virtual apps and desktops that give users secure access to their work from any device.',
    offer: ['VDI design and sizing', 'Published apps and desktops', 'Endpoint and mobile management', 'Secure remote access'],
    solutions: ['/solutions/cloud/virtual-desktop-avd', '/solutions/cyber-security/mobile-device-management'],
  },
  {
    slug: 'cisco', name: 'Cisco', logo: logo(18), category: 'Networking',
    intro: 'Switching, routing, wireless and collaboration for reliable enterprise networks.',
    offer: ['Core, distribution and access design', 'Routing and VLAN segmentation', 'Wireless controllers and APs', 'Voice and video collaboration'],
    solutions: ['/solutions/network/switching-routing', '/solutions/network/enterprise-wifi', '/solutions/collaboration/ip-telephony'],
  },
  {
    slug: 'check-point', name: 'Check Point', logo: logo(19), category: 'Network Security',
    intro: 'Firewall and threat prevention that protects networks, cloud and remote users from advanced attacks.',
    offer: ['Security gateway deployment', 'Threat prevention policies', 'Remote access VPN', 'Central security management'],
    solutions: ['/solutions/cyber-security/firewall-utm', '/solutions/cyber-security/zero-trust'],
  },
  {
    slug: 'atempo', name: 'Atempo', logo: logo(20), category: 'Data Protection',
    intro: 'Backup, archiving and data movement for very large file sets and long-term retention needs.',
    offer: ['File backup and archiving', 'Large dataset migration', 'Long-term retention', 'Recovery testing'],
    solutions: ['/solutions/backup-dr', '/solutions/data-center/nas-storage'],
  },
  {
    slug: 'aruba', name: 'Aruba', logo: logo(21), category: 'Wireless & Switching',
    intro: 'Wired and wireless networking with cloud management and built-in access control.',
    offer: ['Wi-Fi 6/6E access points', 'Campus switching', 'Network access control', 'Cloud-managed monitoring'],
    solutions: ['/solutions/network/enterprise-wifi', '/solutions/network/switching-routing', '/solutions/network/network-monitoring'],
  },
  {
    slug: 'arcserve', name: 'Arcserve', logo: logo(22), category: 'Backup & DR',
    intro: 'Backup and business continuity for small and mid-sized organisations, on-site and in the cloud.',
    offer: ['Unified backup appliances', 'Cloud backup copies', 'Instant VM recovery', 'Business continuity planning'],
    solutions: ['/solutions/backup-dr/cloud-backup', '/solutions/backup-dr/disaster-recovery-draas'],
  },
]

// Add the partnership tier from the ProXinet data where one exists.
const tierFor = (name) => tiers.find((t) => t.name.toLowerCase() === name.toLowerCase())?.tier

export const alliances = list.map((a) => ({ ...a, logoHd: logoHd(a.logo), tier: tierFor(a.name) }))
export const findAlliance = (slug) => alliances.find((a) => a.slug === slug)
