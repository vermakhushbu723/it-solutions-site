import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site } from '../config/site'
import { menu } from '../data/pages'
import Icon from './Icon'
import Logo from './Logo'

// Recursive menu list: top level, dropdown, and fly-out third level.
function MenuItems({ items, openKeys, toggle, depth = 0 }) {
  return items.map((item) => {
    const key = `${depth}-${item.label}`
    const hasChildren = !!item.children
    return (
      <li key={key} data-open={openKeys.includes(key)}>
        <NavLink to={item.to} end={item.to === '/'}>
          {item.label}
          {hasChildren && <Icon name="chevron" size={12} className="nav-chev" />}
        </NavLink>
        {hasChildren && (
          <>
            <button className="sub-toggle" aria-label={`Toggle ${item.label}`} onClick={() => toggle(key)}>
              <Icon name="chevron" size={16} className={openKeys.includes(key) ? 'rot-180' : ''} />
            </button>
            <ul className="dropdown">
              <MenuItems items={item.children} openKeys={openKeys} toggle={toggle} depth={depth + 1} />
            </ul>
          </>
        )}
      </li>
    )
  })
}

// microsoft.com-style header: 54px white bar, logo then a left-aligned 13px menu, text actions on the right.
export default function Header() {
  const [open, setOpen] = useState(false)
  const [openKeys, setOpenKeys] = useState([])
  const [scrolled, setScrolled] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setOpenKeys([])
  }, [pathname, hash])

  const toggle = (key) =>
    setOpenKeys((keys) => (keys.includes(key) ? keys.filter((k) => k !== key) : [...keys, key]))

  return (
    <header className={`site-header ms-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <button className="menu-toggle" aria-label="Open menu" onClick={() => setOpen(true)}>
          <Icon name="menu" size={20} />
        </button>
        <Link to="/" className="brand" aria-label={site.name}>
          <Logo />
        </Link>

        {open && <div className="nav-backdrop" onClick={() => setOpen(false)} />}
        <nav className={`main-nav ${open ? 'open' : ''}`} aria-label="Main">
          <ul>
            <MenuItems items={menu} openKeys={openKeys} toggle={toggle} />
          </ul>
          <Link to="/contact" className="btn btn-quote quote-mobile">Get A Quote</Link>
        </nav>

        <div className="header-actions">
          <a href={`tel:${site.phone?.replace(/\s/g, '') || ''}`} className="header-action hide-sm">
            Call us <Icon name="phone" size={16} />
          </a>
          <Link to="/contact" className="header-action quote-btn">
            Get A Quote <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
    </header>
  )
}
