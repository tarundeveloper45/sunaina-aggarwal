import { useState } from 'react';
import Seo from '../components/Seo';
import { Cta, Gallery, PageHero } from '../components/ui';
import { GALLERY_ALL, GALLERY_CATS } from '../data/content';

export default function GalleryPage() {
  const [cat, setCat] = useState('all');
  const items = cat === 'all' ? GALLERY_ALL : GALLERY_ALL.filter((g) => g.cat === cat);

  return (
    <>
      <Seo
        path="/gallery/" title="Healing Sessions & Classes Photo Gallery" crumbs={[['Gallery', '/gallery/']]}
        desc="Photos of healing sessions, Access Bars classes, Pranic Healing workshops, certificates and community events with Sunaina Aggarwal in Delhi and Gurugram."
      />
      <PageHero title="Photo Gallery" text="Moments from one-to-one sessions, classes, workshops, certifications and community events." crumbs={[['Gallery']]} />
      <section>
        <div className="container">
          <div className="filters" role="group" aria-label="Filter photos">
            {GALLERY_CATS.map(([id, label]) => (
              <button type="button" key={id} className={'filter' + (cat === id ? ' on' : '')} aria-pressed={cat === id} onClick={() => setCat(id)}>{label}</button>
            ))}
          </div>
          <Gallery items={items} animate={false} />
        </div>
      </section>
      <Cta title="Be part of our next class or session" text="See the schedule or send a message to book your place." />
    </>
  );
}
