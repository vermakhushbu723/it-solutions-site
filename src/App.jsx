import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import InfoPage from './pages/InfoPage'
import NotFound from './pages/NotFound'
import { FamilyDetail, IndustryDetail, ServiceDetail, SolutionItemDetail } from './pages/SolutionDetail'
import { Blog, Industries, Partners, Services, Solutions } from './pages/Listings'

// Pages that use the generic InfoPage template (content lives in data/pages.js)
const infoRoutes = [
  'about/leadership', 'about/story', 'about/process', 'about/certifications',
  'clients', 'case-studies', 'case-studies/:slug', 'testimonials', 'procurement',
  'resources', 'resources/whitepapers', 'resources/glossary', 'resources/faq',
  'blog/:slug', 'news-events', 'careers', 'tools', 'tools/:tool', 'services/plans',
]

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="solutions" element={<Solutions />} />
        <Route path="solutions/:family" element={<FamilyDetail />} />
        <Route path="solutions/:family/:slug" element={<SolutionItemDetail />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServiceDetail />} />
        <Route path="industries" element={<Industries />} />
        <Route path="industries/:slug" element={<IndustryDetail />} />
        <Route path="partners" element={<Partners />} />
        <Route path="blog" element={<Blog />} />
        <Route path="contact" element={<Contact />} />
        {infoRoutes.map((p) => (
          <Route key={p} path={p} element={<InfoPage />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
