import icons from '../data/icons.json';

export function Icon({ name, w = 2 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: icons[name] || '' }} />
  );
}

export const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1a8 8 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.6.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.200 8.200 0 1 1 12 20.2z" /></svg>
);

export const SOCIAL_ICONS = {
  facebook: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 22v-8h2.7l.5-3.3h-3.2V8.6c0-1 .4-1.700 1.800-1.700h1.500V4.100c-.3 0-1.300-.1-2.400-.1-2.500 0-4.200 1.500-4.200 4.300v2.400H7.500V14h2.700v8z" /></svg>,
  instagram: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>,
  youtube: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 8.200a3 3 0 0 0-2.100-2.100C18 5.600 12 5.600 12 5.600s-6 0-7.900.5A3 3 0 0 0 2 8.200 31 31 0 0 0 1.600 12 31 31 0 0 0 2 15.800a3 3 0 0 0 2.100 2.100c1.900.5 7.900.5 7.900.5s6 0 7.900-.5a3 3 0 0 0 2.100-2.100c.4-1.200.4-3.800.4-3.800s0-2.600-.4-3.800zM10 15V9l5.200 3z" /></svg>,
  pinterest: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.600 19.300c-.1-.8-.2-2 0-2.900l1.200-5s-.3-.6-.3-1.500c0-1.400.8-2.500 1.800-2.500.9 0 1.300.7 1.300 1.400 0 .9-.5 2.100-.8 3.300-.2 1 .5 1.800 1.500 1.800 1.800 0 3.200-1.900 3.200-4.700 0-2.400-1.800-4.200-4.300-4.200-2.900 0-4.600 2.200-4.600 4.500 0 .9.3 1.800.8 2.300.1.1.1.2.1.3l-.3 1.200c0 .2-.2.2-.4.1-1.300-.6-2.100-2.500-2.100-4 0-3.300 2.400-6.300 6.900-6.300 3.600 0 6.400 2.600 6.400 6 0 3.600-2.300 6.500-5.400 6.500-1.100 0-2.100-.6-2.400-1.200l-.7 2.500c-.2.900-.9 2.100-1.300 2.800A10 10 0 1 0 12 2z" /></svg>,
};
