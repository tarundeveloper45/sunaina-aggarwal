// Site-wide settings. Edit contact details, socials and locations here.
export const SITE = {
  brand: 'EL Healing Centre',
  person: 'Sunaina Aggarwal',
  domain: 'https://www.sunainaaggarwal.com',
  phone: '+91-9810266631',
  phoneRaw: '+919810266631',
  wa: '919810266631',
  email: 'sunainaph@gmail.com',
  gsc: 'k7Lz33su5bGt2G4yvQI35Cn6ojgXu4sryW4IItMuDrk',
  published: '2026-10-03',
  social: {
    facebook: 'https://www.facebook.com/p/El-Healing-Centre-100057870181439/',
    instagram: 'https://www.instagram.com/elhealingcentre/',
    youtube: 'https://www.youtube.com/@SunainaAggarwal-PranicHealing',
    pinterest: 'https://www.pinterest.com/sunainaaggarwalpranichealing/',
  },
  locs: [
    {
      name: 'Delhi', street: 'G-87, Pushkar Enclave, Paschim Vihar', locality: 'New Delhi', region: 'Delhi', postal: '110063',
      title: 'EL Healing Centre, Paschim Vihar, Delhi – map',
      map: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14003.080751597045!2d77.095295!3d28.666599000000005!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03db4300e6a1%3A0xbe06cdc8c6e0f210!2sEL%20Healing%20Centre%20-%20Pranic%20Healing%20%2C%20Access%20Bars%20Session!5e0!3m2!1sen!2sus!4v1791031688586!5m2!1sen!2sus',
    },
    {
      name: 'Gurugram', street: 'E5/6, Block E, DLF Phase 1, Sector 26A', locality: 'Gurugram', region: 'Haryana', postal: '122002',
      title: 'Sunaina Aggarwal, Energy Healer, DLF Phase 1, Gurugram – map',
      map: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14029.972276497492!2d77.100224!3d28.464694!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19005fd9965d%3A0xe94db9ccc0435657!2sSunaina%20Aggarwal%20%7C%20Energy%20Healer%20in%20Gurugram!5e0!3m2!1sen!2sus!4v1791031708620!5m2!1sen!2sus',
    },
  ],
};

export const abs = (path) => SITE.domain + path;
// Image URL for the page (respects the base path)
import DIMS from './data/imageDims.json';
// [width, height] of a photo in /public/assets/img — used for width/height attributes
export const dims = (file) => DIMS[file] || [1100, 825];
export const img = (file) => import.meta.env.BASE_URL + 'assets/img/' + file;
// Absolute URL on the real domain (for SEO tags — never includes the base path)
export const absImg = (file) => SITE.domain + '/assets/img/' + file;

// Order of the Services dropdown
export const MENU_SERVICES = [
  'counseling', 'healing', 'pranic-healing', 'access-bars', 'access-consciousness-facilitator', 'access-body-process',
  'personalised-meditation', 'feng-shui-home-office', 'energetic-facials', 'business-mentoring',
  'astrology', 'tarot-reading', 'numerology',
];
