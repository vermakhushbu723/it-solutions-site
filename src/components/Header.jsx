import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site } from '../config/site'
import { menu } from '../data/pages'
import Icon from './Icon'
import Logo from './Logo'

export default function Header() {
  const [sticky, setSticky] = useState(false)
  const [open, setOpen] = useState(false)
  const [openSub, setOpenSub] = useState(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 120)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setOpenSub(null)
  }, [pathname])

  return (
    <header className={`site-header ${sticky ? 'is-sticky' : ''}`}>
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label={site.name}>
          <Logo />
        </Link>

        <nav className={`main-nav ${open ? 'open' : ''}`}>
          <ul>
            {menu.map((item) => (
              <li
                key={item.label}
                className={item.children ? 'has-children' : ''}
                data-open={openSub === item.label}
              >
                <NavLink to={item.to} end={item.to === '/'}>
                  {item.label}
                </NavLink>
                {item.children && (
                  <>
                    <button
                      className="sub-toggle"
                      aria-label={`Toggle ${item.label} menu`}
                      onClick={() => setOpenSub(openSub === item.label ? null : item.label)}
                    >
                      <Icon name="chevron" size={16} />
                    </button>
                    <ul className="sub-menu">
                      {item.children.map((c) => (
                        <li key={c.label}>
                          {c.href ? (
                            <a href={c.href} target="_blank" rel="noreferrer">{c.label}</a>
                          ) : (
                            <NavLink to={c.to}>{c.label}</NavLink>
                          )}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}
          </ul>
          <Link to="/contact" className="btn btn-primary quote-mobile">Get A Quote</Link>
        </nav>

        <Link to="/contact" className="btn btn-primary quote-btn">Get A Quote</Link>
        <button className="menu-toggle" aria-label="Open menu" onClick={() => setOpen(!open)}>
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  )
}
