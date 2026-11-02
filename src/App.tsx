import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  X,
  Zap,
} from 'lucide-react';

const WEB3FORMS_ACCESS_KEY = '537d443b-7542-48d4-b89a-a283021dfcfa';
const PHONE_DISPLAY = '0401 697 323';
const PHONE_HREF = 'tel:0401697323';
const EMAIL = 'info@lsvservices.com.au';
const GOOGLE_REVIEW_URL = 'https://g.page/r/CSCafEnf1Wc0EBM/review';
const IMAGE_BASE = '/';

const services = [
  { title: 'Grounds maintenance', text: 'Mowing, edging, whipper-snipping, hedging and garden beds, on a schedule that suits the site.', icon: Leaf },
  { title: 'Gutter cleaning', text: 'Gutters and downpipes cleared of leaves and debris so water drains where it should, not into the roof.', icon: ShieldCheck },
  { title: 'Solar panel cleaning', text: 'Dust, grime and bird mess removed from panels so they generate at full output again.', icon: Sparkles },
  { title: 'Pressure washing', text: 'Driveways, paths, patios and building exteriors blasted clean of dirt, moss and grime.', icon: Zap },
  { title: 'Licensed weed spraying', text: 'Targeted weed and vegetation control, applied by an AQF3-accredited operator.', icon: Check },
  { title: 'Facilities management', text: 'Ongoing property upkeep handled by one crew: regular visits, reactive callouts, and the small jobs in between.', icon: FileText },
];

const heroImages = [`${IMAGE_BASE}1.webp`, `${IMAGE_BASE}2.webp`, `${IMAGE_BASE}3.webp`, `${IMAGE_BASE}4.webp`];

const reviews = [
  { quote: 'We are very happy with the service that Lachlan provides he is reliable and professional.', author: 'Lee' },
  { quote: 'Fantastic lawn service! Always punctual, friendly, and does a thorough job every time. My yard has never looked better. Highly recommend for anyone wanting reliable, top-notch lawn care.', author: 'Jenny' },
  { quote: 'Lachlan is the nicest person you could meet. Does an amazing job. 100% recommend Tumut Lawns', author: 'Tracy' },
  { quote: 'He is a true professional, taking pride in his work. He is reliable and dependable. As well, he does a great job. I really appreciate him.', author: 'Cate' },
  { quote: 'Lachlan is a dependable, kind and courteous individual who takes pride in his job. It was an absolute pleasure in dealing with him. He is definitely worth a call if you want to forget about having to maintain your lawn.', author: 'Shivek' },
];

const gallery = [
  { src: `${IMAGE_BASE}1.webp`, alt: 'Solar panels cleaned on a regional property' },
  { src: `${IMAGE_BASE}2.webp`, alt: 'Maintained residential lawn and garden' },
  { src: `${IMAGE_BASE}3.webp`, alt: 'Landscaped garden and grounds' },
  { src: `${IMAGE_BASE}4.webp`, alt: 'Maintained streetscape and nature strip' },
  { src: `${IMAGE_BASE}5.webp`, alt: 'Solar panels on a regional property' },
  { src: `${IMAGE_BASE}6.webp`, alt: 'Maintained commercial building grounds' },
  { src: `${IMAGE_BASE}7.webp`, alt: 'Commercial lawn and garden maintenance' },
  { src: `${IMAGE_BASE}8.webp`, alt: 'Maintained accommodation grounds' },
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className={`brand-mark ${light ? 'brand-mark-light' : ''}`} aria-label="LSV Services home">
      <img className="brand-logo" src="/logo.png" alt="LSV Services" />
    </a>
  );
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-label="Google">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

type QuoteFormProps = {
  id: string;
  formType: string;
  eyebrow?: string;
  heading: string;
  intro: string;
  submitClass?: string;
};

function QuoteForm({ id, formType, eyebrow = 'Start a conversation', heading, intro, submitClass = 'button-dark' }: QuoteFormProps) {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus('sending');
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `LSV Services - ${formType}`,
          from_name: 'LSV Services Website',
          botcheck: formData.get('botcheck') ? 'true' : '',
          name: String(formData.get('name') ?? ''),
          phone: String(formData.get('phone') ?? ''),
          email: String(formData.get('email') ?? ''),
          message: String(formData.get('message') ?? ''),
        }),
      });
      const result = await response.json();
      setFormStatus(result.success ? 'success' : 'error');
      if (result.success) form.reset();
    } catch {
      setFormStatus('error');
    }
  }

  return (
    <form id={id} className="quote-card" onSubmit={handleSubmit}>
      <div className="quote-card-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{heading}</h2>
        <p>{intro}</p>
      </div>
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }}
      />
      <div className="form-grid">
        <label>
          <span>Name</span>
          <input name="name" required placeholder="Your name" autoComplete="name" />
        </label>
        <label>
          <span>Phone</span>
          <input name="phone" required type="tel" placeholder="0400 000 000" autoComplete="tel" />
        </label>
      </div>
      <label>
        <span>Email</span>
        <input name="email" required type="email" placeholder="you@example.com" autoComplete="email" />
      </label>
      <label>
        <span>How can we help?</span>
        <textarea name="message" required rows={3} placeholder="Tell us a little about the job..." />
      </label>
      <button className={`button ${submitClass} form-submit`} type="submit" disabled={formStatus === 'sending'}>
        {formStatus === 'sending' ? 'Sending...' : 'Send enquiry'} <ArrowRight size={17} />
      </button>
      {formStatus === 'success' && (
        <p className="form-message success-message"><Check size={15} /> Thanks, your enquiry is on its way.</p>
      )}
      {formStatus === 'error' && (
        <p className="form-message error-message">We could not send that just now. Please call us on {PHONE_DISPLAY}.</p>
      )}
    </form>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHeroIndex((currentIndex) => (currentIndex + 1) % heroImages.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i === null ? null : (i + 1) % gallery.length));
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length));
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  return (
    <div id="top" className="site-shell">
      <div className="site-top">
        <div className="topbar">
          <div className="container topbar-inner">
            <span>Serving the Snowy Valleys, Snowy Monaro, Riverina &amp; ACT</span>
            <a href={PHONE_HREF}><Phone size={14} /> {PHONE_DISPLAY}</a>
          </div>
        </div>
        <header className="site-header">
          <div className="container header-inner">
            <Logo />
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
              {menuOpen ? <X /> : <Menu />}
            </button>
            <nav className={menuOpen ? 'nav-open' : ''}>
              <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
              <a href="#about" onClick={() => setMenuOpen(false)}>Why LSV</a>
              <a href="#work" onClick={() => setMenuOpen(false)}>Our work</a>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="nav-cta">Get a Fast Quote <ArrowRight size={16} /></a>
            </nav>
          </div>
        </header>
      </div>

      <main>
        <section className="hero">
          <div className="hero-image" style={{ backgroundImage: `url(${heroImages[heroIndex]})` }} />
          <div className="hero-overlay" />
          <div className="container hero-content">
            <div className="hero-copy">
              <p className="eyebrow yellow-eyebrow"><span /> Grounds maintenance, done properly</p>
              <h1>Lawn Mowing &amp; Property Services<br /><em>Across Regional NSW &amp; the ACT</em></h1>
              <p className="hero-intro">LSV Services delivers grounds maintenance, gutter cleaning, pressure washing, and licensed weed spraying across the Snowy Valleys, Riverina and Australian Capital Territory.</p>
              <div className="hero-actions">
                <a className="button button-yellow" href="#quote">Get a Fast Quote <ArrowUpRight size={18} /></a>
                <a className="text-link light-link" href={PHONE_HREF}>Call Now <ArrowRight size={17} /></a>
              </div>
              <div className="hero-proof">
                <span><strong>04</strong> years in business</span>
                <span><strong>100%</strong> local operator</span>
                <span><strong>AQF3</strong> accredited</span>
              </div>
            </div>
            <QuoteForm
              id="quote"
              formType="Hero Form Enquiry"
              heading="Tell us what you need."
              intro="We offer fast quotes and quick responses for residential, commercial and government work."
            />
          </div>
          <div className="scroll-cue"><span>Scroll to explore</span><ArrowDownRight size={17} /></div>
        </section>

        <section className="trust-strip">
          <div className="container trust-items">
            <span><ShieldCheck /> Fully insured &amp; compliant</span>
            <span><Clock3 /> Same-day service available</span>
            <span><CalendarCheck /> Punctual and reliable</span>
            <span><Leaf /> Residential, commercial, government</span>
          </div>
        </section>

        <section id="reviews" className="reviews-section">
          <div className="container">
            <div className="reviews-heading">
              <h2>What clients<br /><em>are saying.</em></h2>
              <a className="reviews-cta" href={GOOGLE_REVIEW_URL} target="_blank" rel="noreferrer">Leave a Google review <ArrowUpRight size={16} /></a>
            </div>
          </div>
          <div className="reviews-marquee">
            <div className="reviews-track">
              {[...reviews, ...reviews].map((review, index) => (
                <a className="review-card" href={GOOGLE_REVIEW_URL} target="_blank" rel="noreferrer" key={index}>
                  <div className="review-top">
                    <GoogleLogo />
                    <div className="review-stars">
                      {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} fill="#fbbc04" stroke="#fbbc04" />)}
                    </div>
                  </div>
                  <p className="review-quote">{review.quote}</p>
                  <p className="review-author">{review.author}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section services-section">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">What we do</p>
                <h2>One team for the<br /><em>whole property.</em></h2>
              </div>
              <p>From regular mowing and garden care to the odd jobs most contractors won’t touch, it’s all done by the same crew you’ll get to know. No juggling three different people for one property.</p>
            </div>
            <div className="service-grid">
              {services.map(({ title, text, icon: Icon }, index) => (
                <article className="service-card" key={title}>
                  <span className="service-number">0{index + 1}</span>
                  <Icon className="service-icon" size={25} strokeWidth={1.5} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <a href="#contact" aria-label={`Enquire about ${title}`}><ChevronRight size={18} /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="section work-section">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Recent work</p>
                <h2>Good work<br /><em>speaks for itself.</em></h2>
              </div>
              <p>A look at the places we help keep safe, clean and looked after, from private gardens to large-scale commercial facilities.</p>
            </div>
            <div className="gallery-grid">
              {gallery.map((image, index) => (
                <figure className="gallery-item" key={image.src} onClick={() => setLightboxIndex(index)}>
                  <img src={image.src} alt={image.alt} loading="lazy" />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="about-image" />
          <div className="container about-container">
            <div className="about-copy">
              <p className="eyebrow yellow-eyebrow"><span /> Built for the region</p>
              <h2>The standard you expect.<br /><em>The service you remember.</em></h2>
              <p>LSV Services is a local facilities maintenance provider built on the basics that matter: showing up when we say we will, communicating clearly, and finishing the job properly.</p>
              <p>We work with our own crews to support homes, businesses and government sites across the region, so you get one reliable point of contact, even when the job is bigger than a single service.</p>
              <a className="text-link light-link" href="#contact">Meet your maintenance team <ArrowRight size={17} /></a>
            </div>
            <div className="about-stats">
              <div><strong>01</strong><span>Responsive<br />local operator</span></div>
              <div><strong>02</strong><span>Compliance-led<br />delivery</span></div>
              <div><strong>03</strong><span>No job<br />falls through</span></div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container cta-inner">
            <div>
              <p className="eyebrow yellow-eyebrow"><span /> Ready when you are</p>
              <h2>Let’s get your property<br /><em>back on track.</em></h2>
            </div>
            <a className="button button-yellow" href="#contact">Get a Fast Quote <ArrowUpRight size={18} /></a>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container contact-grid">
            <div className="contact-copy">
              <p className="eyebrow yellow-eyebrow"><span /> Get in touch</p>
              <h2>Get a<br /><em>fast quote.</em></h2>
              <p className="contact-intro">Tell us about the property and what you need looked after, and we’ll get back to you with a quote and a plan to match.</p>
              <ul className="contact-details">
                <li>
                  <Phone size={17} />
                  <div><span>Phone</span><a href={PHONE_HREF}>{PHONE_DISPLAY}</a></div>
                </li>
                <li>
                  <Mail size={17} />
                  <div><span>Email</span><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
                </li>
                <li>
                  <MapPin size={17} />
                  <div><span>Service area</span><p>Snowy Valleys, Snowy Monaro, Riverina and ACT</p></div>
                </li>
                <li>
                  <Clock3 size={17} />
                  <div><span>Availability</span><p>Emergency and same-day services available</p></div>
                </li>
              </ul>
            </div>
            <QuoteForm
              id="quote-contact"
              formType="Contact Page Enquiry"
              eyebrow="Send an enquiry"
              heading="Start your enquiry."
              intro="All fields are required. We respond to every enquiry."
              submitClass="button-yellow"
            />
          </div>
        </section>
      </main>

      {lightboxIndex !== null && (
        <div className="lightbox" onClick={() => setLightboxIndex(null)}>
          <button className="lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="Close"><X size={28} /></button>
          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length)); }}
            aria-label="Previous"
          ><ChevronLeft size={32} /></button>
          <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
            <img src={gallery[lightboxIndex].src} alt={gallery[lightboxIndex].alt} />
            <figcaption>{gallery[lightboxIndex].alt}</figcaption>
          </figure>
          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i === null ? null : (i + 1) % gallery.length)); }}
            aria-label="Next"
          ><ChevronRight size={32} /></button>
        </div>
      )}

      <footer className="footer">
        <div className="container footer-top">
          <div className="footer-brand">
            <Logo light />
            <p>Grounds maintenance, done properly.</p>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
          </div>
          <div className="footer-links">
            <div>
              <p className="footer-label">Explore</p>
              <a href="#services">Services</a>
              <a href="#about">Why LSV</a>
              <a href="#work">Our work</a>
              <a href="#contact">Contact</a>
            </div>
            <div>
              <p className="footer-label">Service areas</p>
              <p>Snowy Valleys<br />Snowy Monaro<br />Riverina<br />ACT</p>
            </div>
            <div>
              <p className="footer-label">Enquiries</p>
              <p>Fast quotes available.<br />Emergency &amp; same-day<br />services available.</p>
              <a className="footer-call" href="#top">Back to top <ArrowUpRight size={14} /></a>
            </div>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} LSV Services. All rights reserved.</span>
          <a href="https://www.itscold.com.au" target="_blank" rel="noreferrer">Website by Go Polar</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
