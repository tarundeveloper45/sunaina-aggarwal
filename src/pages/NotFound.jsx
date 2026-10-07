import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

export default function NotFound() {
  return (
    <>
      <Seo
        path="/404.html" title="Page Not Found" noindex
        desc="The page you are looking for could not be found. Visit the EL Healing Centre home page or contact us for help in Delhi and Gurugram."
      />
      <section className="page-hero">
        <div className="container">
          <h1>Page not found</h1>
          <p>The page you’re looking for may have moved. Let’s bring you back to calm ground.</p>
          <div className="hero-actions" style={{ justifyContent: 'center', marginTop: 24 }}>
            <Link className="btn btn-primary" to="/">Go to Home</Link>
            <Link className="btn btn-outline" to="/contact-us/">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
