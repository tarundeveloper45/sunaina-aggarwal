import { useEffect } from 'react';
import { applyHead } from '../seo';

// During pre-render the page's SEO props are stored globally so the build script can write them into <head>.
export default function Seo(props) {
  if (typeof document === 'undefined') globalThis.__SEO__ = props;
  const key = props.path + props.title;
  useEffect(() => { applyHead(props); }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}
