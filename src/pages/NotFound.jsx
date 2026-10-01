import { Link } from 'react-router-dom'
import { usePageTitle } from '../components/Common'

export default function NotFound() {
  usePageTitle('Page Not Found')
  return (
    <section className="not-found">
      <div className="container">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    </section>
  )
}
