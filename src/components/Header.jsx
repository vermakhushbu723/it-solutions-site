import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site } from '../config/site'
import { menu } from '../data/pages'
import Icon from './Icon'
import Logo from './Logo'

// Recursive menu list: top level, dropdown, and fly-out third level.
function MenuItems({ items, openKeys, toggle, depth = 0, onHover }) {
  return items.map((item) => {
    const key = `${depth}-${item.label}`
    const hasChildren = !!item.children
    return (
      <li key={key} data-open={openKeys.includes(key)} onMouseEnter={depth === 0 ? onHover : undefined}>
        <NavLink to={item.to} end={item.to === '/'}>
          {item.label}
          {hasChildren && <span className="plus" aria-hidden="true">+</span>}
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

export default function Header() {
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)
  const [openKeys, setOpenKeys] = useState([])
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false })
  const listRef = useRef(null)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    setOpen(false)
    setOpenKeys([])
  }, [pathname, hash])

  const toggle = (key) =>
    setOpenKeys((keys) => (keys.includes(key) ? keys.filter((k) => k !== key) : [...keys, key]))

  // Sliding underline that follows the hovered top-level item
  const onHover = (e) => {
    const link = e.currentTarget.querySelector('a')
    const list = listRef.current
    if (!link || !list) return
    const a = link.getBoundingClientRect()
    const l = list.getBoundingClientRect()
    setIndicator({ left: a.left - l.left, width: a.width, visible: true })
  }

  return (
    <header className="site-header">
      <div className="header-bar">
        <div className="header-inner">
          <Link to="/" className="brand" aria-label={site.name}>
            <Logo />
          </Link>

          {open && <div className="nav-backdrop" onClick={() => setOpen(false)} />}
          <nav className={`main-nav ${open ? 'open' : ''}`} aria-label="Main">
            <ul ref={listRef} onMouseLeave={() => setIndicator((s) => ({ ...s, visible: false }))}>
              <MenuItems items={menu} openKeys={openKeys} toggle={toggle} onHover={onHover} />
              <span
                className={`nav-indicator ${indicator.visible ? 'show' : ''}`}
                style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
                aria-hidden="true"
              />
            </ul>
            <Link to="/contact" className="btn btn-quote quote-mobile">Get A Quote</Link>
          </nav>

          <Link to="/contact" className="btn btn-quote quote-btn">
            Get A Quote <Icon name="arrow" size={16} />
          </Link>
          <button className="menu-toggle" aria-label="Open menu" onClick={() => setOpen(true)}>
            <Icon name="menu" />
          </button>
        </div>
        <span className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      </div>
    </header>
  )
}
