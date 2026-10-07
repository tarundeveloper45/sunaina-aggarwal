import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServicePage from './pages/ServicePage';
import Schedules from './pages/Schedules';
import Testimonials from './pages/Testimonials';
import { BlogIndex, BlogPost } from './pages/Blog';
import Contact from './pages/Contact';
import GalleryPage from './pages/GalleryPage';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about-us" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServicePage />} />
        <Route path="schedules" element={<Schedules />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="blog" element={<BlogIndex />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="contact-us" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
