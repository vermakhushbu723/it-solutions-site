// Site photos: real photos in public/images/photos (see photoTopics.js for the source ids).
// <key>.jpg (1600x900) is used for cards, content images and page banners; the home slider keeps the original px images.
import { photoPool, photoTopics } from './photoTopics'

const photo = (key) => `/images/photos/${key}.jpg`
const px = (file) => encodeURI(`/images/px/${file}`)

export const logo = px('LOGO-1.png')

export const home = {
  slides: [
    // The original ProXinet hero images (public/images/px).
    {
      title: 'Trusted Partner for Secure & Scalable IT Infrastructure.',
      text: 'From cloud migration to cybersecurity, we empower businesses with',
      highlight: 'cutting-edge technology and unparalleled expertise.',
      cta: 'Get Started', to: '/contact', img: px('Security Solution.png'),
    },
    { title: 'Backup Solutions', to: '/solutions/backup-dr', img: px('Backup Solutions.png'), align: 'right' },
    { title: 'Network Solutions', to: '/solutions/network', img: px('Network Infrastructure.png') },
    { title: 'Data Center Solutions', to: '/solutions/data-center', img: px('Data Center Solutions.png'), align: 'right' },
    { title: 'Managed IT Services', to: '/services', img: px('Managed IT Services.png'), text: 'Small in-house IT team? We manage the whole infrastructure for you.' },
    { title: 'Cloud Solutions', to: '/solutions/cloud', img: px('Cloud Solutions.png'), align: 'right' },
  ],
  about: photo('about'),
  portfolio: photo('portfolio'),
  solutions: photo('solutions'),
  meeting: photo('meeting'), // from livestorm.co/blog/host-all-hands-meeting
  contact: photo('contact'),
}

export const about = {
  banner: photo('about'),
  overview: photo('about'),
  believe: photo('values'),
  vision: photo('vision'),
}

export const contactImg = photo('contact')

// Most specific topic in a path: '/solutions/cloud/aws' -> 'aws', then 'cloud', then 'solutions'.
const topicFor = (pathname) => {
  const segs = pathname.split('/').filter(Boolean)
  for (let i = segs.length - 1; i >= 0; i--) if (photoTopics[segs[i]]) return segs[i]
  return null
}

const hash = (s) => [...s].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7)

/** Banner (page-title background) for a route. */
export function bannerFor(pathname) {
  return photo(topicFor(pathname) || 'about')
}

/** Content / card image for a route; pages without their own topic get one from the generic pool. */
export const imageFor = (pathname) => photo(topicFor(pathname) || photoPool[hash(pathname) % photoPool.length])
