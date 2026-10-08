import services from './services.json';

export const SERVICES = services;
export const SERVICE_BY = Object.fromEntries(services.map((s) => [s.slug, s]));

export const faqHome = [
  ['What is Pranic Healing?', 'Pranic Healing is a no-touch energy healing system that cleanses and energizes the body’s energy field (prana) to support physical, emotional and mental wellbeing. It is practised alongside — never instead of — medical care.'],
  ['Where are the sessions held?', 'Sessions and classes are held in Delhi (Paschim Vihar) and Gurugram (DLF Phase 1). Many one-to-one healing and counseling sessions can also be taken online.'],
  ['Do I need any prior experience?', 'No. Every session and class is beginner friendly. Sunaina explains each step so you always feel comfortable and informed.'],
  ['How do I book a session?', 'Use the Contact Us page, call, or message on WhatsApp. You will get a confirmation with the time, place and what to expect.'],
];

export const faqContact = [
  ['How quickly will I get a reply?', 'Usually within the same day on WhatsApp, and within 24 hours by email.'],
  ['Can I book for a family member?', 'Absolutely. Mention their name and concern in the message and we will arrange a suitable slot.'],
  ['Do you offer sessions on weekends?', 'Yes, weekend slots are available. Please book in advance as they fill quickly.'],
];

// Upcoming classes. date = YYYY-MM-DD. Past dates are hidden automatically.
export const SCHEDULE = [
  { date: '2026-10-09', time: '6:30 pm', title: 'Bars & Body Process Swaps', place: 'Paschim Vihar, New Delhi', centre: 'Delhi', price: 1000, seats: 10, text: 'Practise and exchange Access Bars and Body Process in a supportive group.' },
  { date: '2026-10-10', time: '11:00 am', title: 'Bars Class', place: 'DLF Phase 1, Gurugram', centre: 'Gurugram', price: 20000, seats: 8, text: 'Access Bars class — learn to give Access Bars to family and friends.' },
  { date: '2026-10-14', time: '6:30 pm', title: 'Bars & Body Process Swaps', place: 'DLF Phase 1, Gurugram', centre: 'Gurugram', price: 1000, seats: 10, text: 'Practise and exchange Access Bars and Body Process in a supportive group.' },
  { date: '2026-10-16', time: '6:30 pm', title: 'Bars & Body Process Swaps', place: 'Paschim Vihar, New Delhi', centre: 'Delhi', price: 1000, seats: 10, text: 'Practise and exchange Access Bars and Body Process in a supportive group.' },
  { date: '2026-10-17', time: '11:00 am', title: 'Bars Class', place: 'DLF Phase 1, Gurugram', centre: 'Gurugram', price: 20000, seats: 8, text: 'Access Bars class — learn to give Access Bars to family and friends.' },
  { date: '2026-10-21', time: '6:30 pm', title: 'Bars & Body Process Swaps', place: 'DLF Phase 1, Gurugram', centre: 'Gurugram', price: 1000, seats: 10, text: 'Practise and exchange Access Bars and Body Process in a supportive group.' },
];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const dateParts = (iso) => { const [y, m, d] = iso.split('-').map(Number); return { day: String(d), month: MONTHS[m - 1], weekday: DAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()] }; };
export const longDate = (iso) => { const p = dateParts(iso); return `${p.weekday} ${p.day} ${p.month}`; };

// Intake concerns (used by the home page and the booking form)
export const CONCERNS = [
  { id: 'heavy', label: 'Feeling heavy or stuck', hint: 'Emotional weight, stress, low energy', services: ['pranic-healing', 'access-bars', 'healing'] },
  { id: 'talk', label: 'I want to talk it through', hint: 'Relationships, decisions, clarity', services: ['counseling'] },
  { id: 'mind', label: 'My mind won’t switch off', hint: 'Sleep, overthinking, restlessness', services: ['access-bars', 'personalised-meditation'] },
  { id: 'business', label: 'My business needs direction', hint: 'Growth, blocks, Feng Shui', services: ['business-mentoring', 'feng-shui-home-office'] },
];
export const TRIAGE = [
  { concern: 'mind', ico: 'mind', title: 'Emotional & Mind', text: 'Stress, overthinking, restless sleep, grief or burnout.', next: 'Access Bars & Counseling' },
  { concern: 'heavy', ico: 'sun', title: 'Physical & Energy', text: 'Fatigue, feeling drained, tension that keeps coming back.', next: 'Pranic Healing & Energetic Facelift' },
  { concern: 'business', ico: 'home', title: 'Space & Prosperity', text: 'Feeling stuck in work or money, or friction at home or office.', next: 'Feng Shui & Mentoring' },
];


export const TESTIMONIALS = [
  { name: 'Rajat Gupta', role: 'Client', text: 'Almost immediately after our sessions, I noticed a shift in my self belief, clarity, and overall well-being.' },
  { name: 'Neha Gupta', role: 'Client', text: 'She helped me in over coming my fears also, she was always so kind and helpful to guide and assist in her best possible way.' },
];

export const VIDEOS = ['if8dsJ7qBAA', '9_TWPhpCfOI'];

// Blog posts. Body blocks: h2 | p | lead | ul | note. Inline: **bold**, [label](/path)
export const POSTS = [
  {
    slug: 'what-is-pranic-healing-and-how-does-it-work',
    title: 'What Is Pranic Healing and How Does It Work?', seo: 'What Is Pranic Healing & How It Works',
    img: 'energy-healing-session-hands-over-client.webp', alt: 'Hands held over a client during an energy healing session',
    desc: 'Learn what Pranic Healing is, how a session works, who it helps and what to expect — explained simply by Delhi NCR energy healer Sunaina Aggarwal.',
    excerpt: 'A simple guide to the no-touch energy healing system and what happens in a session.',
    body: [
      ['lead', 'Pranic Healing is a no-touch energy healing system based on the idea that the body has an energy field — called *prana* — which can be cleansed and strengthened to support wellbeing.'],
      ['h2', 'The core idea'],
      ['p', 'According to Pranic Healing, the physical body is surrounded and interpenetrated by an energy body. When this energy becomes congested or depleted through stress, emotional trauma or illness, we feel tired, tense or unwell. A practitioner scans the energy field, removes used-up energy, and projects fresh prana to the affected area.'],
      ['h2', 'What happens in a session?'],
      ['p', 'You sit or lie down comfortably. The healer uses their hands, usually a few inches away from your body, to scan and cleanse. There is no pressure, manipulation or medication. Many clients feel warmth, tingling or deep relaxation; some simply feel calm and sleepy.'],
      ['h2', 'Who can benefit?'],
      ['ul', ['People feeling stressed, drained or emotionally heavy', 'Those with sleep disturbance or restlessness', 'Anyone wanting to support recovery alongside medical care', 'People who want to improve focus, calm and positivity']],
      ['h2', 'An important note'],
      ['p', 'Pranic Healing is complementary. It does not replace medical diagnosis or treatment. Continue to follow your doctor’s advice and treat healing as additional support.'],
      ['h2', 'Try a session'],
      ['p', 'Sunaina Aggarwal, a former Pranic Healing instructor, offers sessions in Delhi and Gurugram and online. Explore [Pranic Healing](/services/healing/#pranic-healing) or [book a session](/contact-us/).'],
    ],
  },
  {
    slug: 'access-bars-session-what-to-expect',
    title: 'Access Bars: What to Expect in Your First Session', seo: 'Access Bars: What to Expect',
    img: 'crystal-healing-sphere.webp', alt: 'Calm healer offering a crystal sphere, symbolising gentle energy work',
    desc: 'Curious about Access Bars? Find out how the 32-point process works, how long a session lasts and what you may feel, with certified facilitator Sunaina Aggarwal.',
    excerpt: 'Everything you need to know before your first Access Bars session or class.',
    body: [
      ['lead', 'Access Bars is a gentle, hands-on process in which 32 points on the head are lightly touched. These points are said to relate to different areas of life such as awareness, creativity, healing, money and control.'],
      ['h2', 'How a session works'],
      ['p', 'You lie down fully clothed. The facilitator places fingertips lightly on points around your head. There is no force or manipulation, and most people simply relax, with many falling asleep. A session usually lasts 60–90 minutes.'],
      ['h2', 'What might I feel?'],
      ['p', 'Experiences vary: deep relaxation, a quieter mind, emotional release or feeling lighter. Some feel little during the session and notice changes in sleep or mood over the next few days.'],
      ['h2', 'How to prepare'],
      ['ul', ['Wear comfortable clothes', 'Drink water before and after', 'Arrive with an open, relaxed mindset']],
      ['h2', 'Learn to give Bars'],
      ['p', 'Access Bars is also taught in a class so you can share it with family and friends. See the [upcoming schedule](/schedules/) or read about [Access Bars sessions](/services/access-bars/).'],
      ['note', 'Access Bars is complementary and not a substitute for medical treatment.'],
    ],
  },
  {
    slug: 'feng-shui-tips-for-home-and-office',
    title: '7 Simple Feng Shui Tips for Your Home and Office', seo: '7 Simple Feng Shui Tips for Home',
    img: 'energetic-facial-treatment.webp', alt: 'Calm, uncluttered space reflecting Feng Shui principles',
    desc: 'Seven easy Feng Shui tips to improve energy flow at home and in the workplace — from decluttering to entrance and desk placement — by expert Sunaina Aggarwal.',
    excerpt: 'Seven practical Feng Shui ideas you can apply this weekend, with no renovation needed.',
    body: [
      ['lead', 'Feng Shui is about arranging your space so energy (chi) flows freely. You do not need a renovation — small changes can make rooms feel calmer and more supportive.'],
      ['h2', '1. Declutter first'], ['p', 'Clutter blocks energy. Remove broken, unused or unloved items, especially near the entrance and under beds.'],
      ['h2', '2. Keep the entrance welcoming'], ['p', 'The main door is where energy enters. Keep it clean, well lit and free of shoes and boxes.'],
      ['h2', '3. Position your desk with a view'], ['p', 'Where possible, sit facing the door with a solid wall behind you. It supports focus and a sense of security.'],
      ['h2', '4. Bring in natural light and plants'], ['p', 'Open curtains daily and add healthy plants. Avoid dried or dying plants.'],
      ['h2', '5. Fix leaks and broken things'], ['p', 'Dripping taps and broken clocks symbolically drain resources. Repair them promptly.'],
      ['h2', '6. Balance the five elements'], ['p', 'Wood, fire, earth, metal and water should be present in a balanced way through colours, materials and décor.'],
      ['h2', '7. Create a calm bedroom'], ['p', 'Keep electronics minimal, use soft lighting and choose a stable bed position.'],
      ['p', 'For a personalised assessment of your home, shop or office, explore [Feng Shui consultation](/services/feng-shui-home-office/) or [get in touch](/contact-us/).'],
    ],
  },
];

export const GALLERY = [
  { file: 'access-bars-session-sunaina-aggarwal.webp', w: 720, h: 1280, alt: 'Sunaina Aggarwal giving an Access Bars session to a client' },
  { file: 'group-healing-class-gurugram.webp', w: 1100, h: 825, alt: 'Group healing class at EL Healing Centre, Gurugram' },
  { file: 'energy-healing-session-sunaina-aggarwal.webp', w: 720, h: 1280, alt: 'Sunaina Aggarwal performing an energy healing session' },
  { file: 'access-bars-workshop-gurugram.webp', w: 1100, h: 825, alt: 'Access Bars workshop with students at EL Healing Centre' },
  { file: 'pranic-healing-session-delhi.webp', w: 720, h: 1280, alt: 'Client resting during a healing session in Delhi' },
  { file: 'healing-session-practice-at-home.webp', w: 960, h: 1280, alt: 'Students practising Access Bars on each other' },
  { file: 'access-bars-class-students-practising.webp', w: 720, h: 1280, alt: 'Students practising Access Bars in class' },
  { file: 'counseling-session-sunaina-aggarwal.webp', w: 720, h: 1280, alt: 'Sunaina Aggarwal in a one-to-one counseling session' },
  { file: 'access-bars-practitioner-certificate-class.webp', w: 1100, h: 825, alt: 'Student receiving an Access Bars Practitioner certificate' },
];

export const GALLERY_CATS = [['all', 'All'], ['sessions', 'Healing sessions'], ['classes', 'Classes & workshops'], ['certificates', 'Certificates'], ['community', 'Community & events']];
export const GALLERY_ALL = [
  { cat: 'sessions', file: 'access-bars-session-sunaina-aggarwal.webp', w: 720, h: 1280, alt: 'Sunaina Aggarwal giving an Access Bars session to a client' },
  { cat: 'classes', file: 'group-healing-class-gurugram.webp', w: 1100, h: 825, alt: 'Group healing class at EL Healing Centre, Gurugram' },
  { cat: 'sessions', file: 'energy-healing-session-sunaina-aggarwal.webp', w: 720, h: 1280, alt: 'Sunaina Aggarwal performing an energy healing session' },
  { cat: 'classes', file: 'access-bars-workshop-gurugram.webp', w: 1100, h: 825, alt: 'Access Bars workshop with students at EL Healing Centre' },
  { cat: 'certificates', file: 'advanced-pranic-healing-course-certificates.webp', w: 1100, h: 825, alt: 'Participants holding Certificates of Attendance for an Advanced Pranic Healing course' },
  { cat: 'sessions', file: 'pranic-healing-session-delhi.webp', w: 720, h: 1280, alt: 'Client resting during a healing session in Delhi' },
  { cat: 'classes', file: 'healing-session-practice-at-home.webp', w: 960, h: 1280, alt: 'Students practising Access Bars on each other' },
  { cat: 'certificates', file: 'pranic-healing-course-students-with-certificates.webp', w: 1100, h: 825, alt: 'Pranic Healing course students with their certificates' },
  { cat: 'classes', file: 'access-bars-class-students-practising.webp', w: 720, h: 1280, alt: 'Students practising Access Bars in class' },
  { cat: 'sessions', file: 'counseling-session-sunaina-aggarwal.webp', w: 720, h: 1280, alt: 'Sunaina Aggarwal in a one-to-one counseling session' },
  { cat: 'certificates', file: 'access-bars-practitioner-certificate-class.webp', w: 1100, h: 825, alt: 'Student receiving an Access Bars Practitioner certificate' },
  { cat: 'certificates', file: 'pranic-healing-workshop-participants-certificates.webp', w: 1100, h: 619, alt: 'Pranic Healing workshop participants with certificates' },
  { cat: 'certificates', file: 'access-bars-practitioner-certificate.webp', w: 720, h: 1280, alt: 'Access Bars Practitioner certificate presentation' },
  { cat: 'community', file: 'healing-community-event-group-photo.webp', w: 864, h: 1152, alt: 'Group photo of the healing community at an event' },
  { cat: 'community', file: 'community-outreach-clothes-drive.webp', w: 1100, h: 619, alt: 'Group with a stack of clothes during a community outreach drive' },
];
