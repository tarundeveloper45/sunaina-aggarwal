import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { Cta, PageHero, TestimonialSlider } from '../components/ui';
import { TESTIMONIALS } from '../data/content';

export default function Testimonials() {
  return (
    <>
      <Seo
        path="/testimonials/" title="Client Testimonials & Healing Reviews" crumbs={[['Testimonials', '/testimonials/']]}
        desc="Read what clients and students say about their healing, counseling and class experiences with Sunaina Aggarwal at EL Healing Centre in Delhi and Gurugram."
      />
      <PageHero title="Testimonials" text="Real experiences from clients and students who have walked the healing path with Sunaina." crumbs={[['Testimonials']]} />
      <section>
        <div className="container">
          <TestimonialSlider items={TESTIMONIALS} />
          <div className="prose" style={{ marginTop: 50, textAlign: 'center' }}>
            <h2>Share your experience</h2>
            <p>Your words help others find the courage to begin. If you have attended a session or class, we would love to hear from you.</p>
            <Link className="btn btn-primary" to="/contact-us/">Send Your Feedback</Link>
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}
