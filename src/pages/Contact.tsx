import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ExternalLink } from 'lucide-react';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import Navigation from '@/components/Navigation';
import PageBackground from '@/components/PageBackground';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  // Strip characters that could break mailto: URLs or inject headers
  const sanitize = (val: string) =>
    val.replace(/[\r\n%&?#]/g, ' ').trim().slice(0, 500);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const name    = sanitize(formData.name).slice(0, 100);
    const email   = sanitize(formData.email).slice(0, 100);
    const subject = sanitize(formData.subject).slice(0, 150);
    const message = sanitize(formData.message).slice(0, 2000);

    // Validate email format before building the mailto
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto =
      `mailto:gathaiyalewis1122@gmail.com` +
      `?subject=${encodeURIComponent(subject || `New message from ${name}`)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSent(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSent(false);
    // Enforce max lengths at input level
    const limits: Record<string, number> = { name: 100, email: 100, subject: 150, message: 2000 };
    const val = e.target.value.slice(0, limits[e.target.name] ?? 500);
    setFormData({ ...formData, [e.target.name]: val });
  };

  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: 'gathaiyalewis1122@gmail.com',
      href: 'mailto:gathaiyalewis1122@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+254 702 320 995',
      href: 'tel:+254702320995',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Nairobi, Kenya — Remote Worldwide',
      href: null,
    },
    {
      icon: Clock,
      label: 'Response Time',
      value: 'Within 24 hours',
      href: null,
    },
  ];

  return (
    <div className="relative min-h-screen">
      <PageBackground />
      <Navigation />
      <ThemeToggle />

      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center mb-14">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-4 drop-shadow-lg">
              Get In Touch
            </h1>
            <p className="text-lg text-muted-foreground drop-shadow">
              Have a project in mind? Let's discuss how we can help bring your ideas to life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">

            {/* ── Contact info card ── */}
            <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-md p-8 space-y-6 shadow-xl">
              <h2 className="font-heading text-xl font-bold text-foreground">Contact Information</h2>

              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-semibold text-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                      >
                        {value}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-foreground">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Contact form card ── */}
            <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-md p-8 shadow-xl">
              <h2 className="font-heading text-xl font-bold text-foreground mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                    Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground
                               placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                    Your Email <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground
                               placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1.5">
                    Subject <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    maxLength={150}
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground
                               placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    maxLength={2000}
                    placeholder="Tell us about your project or question..."
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground
                               placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-3.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground
                             hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  {sent ? 'Opening your mail app…' : 'Send Message'}
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  Clicking send will open your default mail app pre-filled with your message.
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
