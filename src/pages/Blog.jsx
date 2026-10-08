import { Link, useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { Crumbs, Cta, PageHero, Picture, Rich } from '../components/ui';
import { SITE, abs } from '../config';
import { POSTS } from '../data/content';
import NotFound from './NotFound';

export function BlogIndex() {
  return (
    <>
      <Seo
        path="/blog/" title="Healing, Access Bars & Feng Shui Blog" crumbs={[['Blog', '/blog/']]}
        desc="Guides and insights on Pranic Healing, Access Bars, Feng Shui, meditation and spiritual wellness from healer Sunaina Aggarwal in Delhi NCR."
      />
      <PageHero title="Healing & Wellness Blog" text="Practical guides and insights on energy healing, meditation, Feng Shui and conscious living." crumbs={[['Blog']]} />
      <section>
        <div className="container">
          <div className="grid g3">
            {POSTS.map((p) => (
              <article className="card post-card reveal" key={p.slug}>
                <Link to={`/blog/${p.slug}/`}><Picture file={p.img} alt={p.alt} w={1400} h={933} /></Link>
                <div className="body">
                  <span className="meta">Guide · {SITE.published}</span>
                  <h3><Link to={`/blog/${p.slug}/`}>{p.title}</Link></h3>
                  <p>{p.excerpt}</p>
                  <Link className="more" to={`/blog/${p.slug}/`}>Read article →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) return <NotFound />;
  const path = `/blog/${p.slug}/`;

  return (
    <>
      <Seo
        path={path} title={p.seo || p.title} desc={p.desc} ogType="article" ogImage={p.img}
        crumbs={[['Blog', '/blog/'], [p.title, path]]}
        schema={[{ '@type': 'BlogPosting', headline: p.title, description: p.desc, image: abs('/assets/img/' + p.img), datePublished: SITE.published, dateModified: SITE.published, author: { '@id': SITE.domain + '/#sunaina' }, publisher: { '@id': SITE.domain + '/#business' }, mainEntityOfPage: abs(path) }]}
      />
      <section className="page-hero">
        <div className="container">
          <Crumbs items={[['Blog', '/blog/'], [p.title]]} />
          <h1 style={{ maxWidth: 860, marginInline: 'auto' }}>{p.title}</h1>
          <p>By {SITE.person} · {SITE.published}</p>
        </div>
      </section>
      <section>
        <div className="container article">
          <Picture className="cover" file={p.img} alt={p.alt} w={1400} h={933} eager />
          <div className="prose">
            {p.body.map(([type, v], i) => {
              if (type === 'h2') return <h2 key={i}>{v}</h2>;
              if (type === 'lead') return <p key={i} className="lead"><Rich text={v} /></p>;
              if (type === 'ul') return <ul key={i}>{v.map((li) => <li key={li}>{li}</li>)}</ul>;
              if (type === 'note') return <p key={i}><em>{v}</em></p>;
              return <p key={i}><Rich text={v} /></p>;
            })}
            <div className="related">
              <h3>Keep reading</h3>
              <ul>{POSTS.filter((o) => o !== p).map((o) => <li key={o.slug}><Link to={`/blog/${o.slug}/`}>{o.title}</Link></li>)}</ul>
            </div>
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}
