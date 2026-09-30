import { company } from '../data/proxinet/company'

// Change these values to rebrand the whole site in one place.
export const site = {
  name: company.name,
  shortName: company.short,
  tagline: company.tagline,
  promise: company.promise,
  address: company.offices[0].line,
  offices: company.offices,
  phone: company.phones[0],
  phones: company.phones,
  email: company.email,
  hours: 'Mon–Sat · 9:30 AM – 6:30 PM · NOC 24×7',
  year: new Date().getFullYear(),
  social: {
    facebook: company.social.facebook,
    twitter: company.social.twitter,
    instagram: company.social.instagram,
    linkedin: company.social.linkedin,
  },
}
