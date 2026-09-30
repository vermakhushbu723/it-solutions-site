import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { ScrollToTop } from './Common'

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
