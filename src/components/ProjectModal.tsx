import { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Check, Loader2 } from 'lucide-react';

interface ProjectModalProps {
  open: boolean;
  onClose: () => void;
}

const PROJECT_TYPES = [
  { id: 'web-app', label: 'Web Application', icon: '🌐', desc: 'Full-stack web platform or SaaS product' },
  { id: 'mobile-app', label: 'Mobile App', icon: '📱', desc: 'iOS, Android or cross-platform app' },
  { id: 'ecommerce', label: 'E-Commerce', icon: '🛒', desc: 'Online store with payments & inventory' },
  { id: 'dashboard', label: 'Dashboard / Analytics', icon: '📊', desc: 'Data visualisation & admin panels' },
  { id: 'api', label: 'API / Backend', icon: '⚙️', desc: 'REST or GraphQL API, microservices' },
  { id: 'ai-ml', label: 'AI / ML Integration', icon: '🤖', desc: 'AI-powered features or automation' },
  { id: 'other', label: 'Something Else', icon: '💡', desc: 'Tell us what you have in mind' },
];

const BUDGET_RANGES = [
  { id: 'under-1k', label: 'Under $1,000', sub: 'Small scope / MVP' },
  { id: '1k-5k', label: '$1,000 – $5,000', sub: 'Starter project' },
  { id: '5k-15k', label: '$5,000 – $15,000', sub: 'Mid-size product' },
  { id: '15k-50k', label: '$15,000 – $50,000', sub: 'Full product build' },
  { id: '50k-plus', label: '$50,000+', sub: 'Enterprise / complex system' },
  { id: 'discuss', label: 'Let\'s discuss', sub: 'Flexible / not sure yet' },
];

const TIMELINE_OPTIONS = [
  { id: 'asap', label: 'ASAP', sub: 'Within 2 weeks' },
  { id: '1month', label: '1 Month', sub: 'Quick turnaround' },
  { id: '1-3months', label: '1 – 3 Months', sub: 'Standard timeline' },
  { id: '3-6months', label: '3 – 6 Months', sub: 'Larger scope' },
  { id: '6months-plus', label: '6+ Months', sub: 'Long-term engagement' },
  { id: 'flexible', label: 'Flexible', sub: 'No hard deadline' },
];

const STEPS = ['Project Type', 'Details', 'Budget & Timeline', 'Your Details', 'Review'];

type FormData = {
  projectType: string;
  projectDescription: string;
  features: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  company: string;
};

const empty: FormData = {
  projectType: '',
  projectDescription: '',
  features: '',
  budget: '',
  timeline: '',
  name: '',
  email: '',
  phone: '',
  company: '',
};

export default function ProjectModal({ open, onClose }: ProjectModalProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const set = (key: keyof FormData, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const canNext = () => {
    if (step === 0) return !!form.projectType;
    if (step === 1) return form.projectDescription.trim().length > 10;
    if (step === 2) return !!form.budget && !!form.timeline;
    if (step === 3) return !!form.name && !!form.email && form.email.includes('@');
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400)); // simulate send
    setLoading(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    document.body.removeAttribute('data-modal-open');
    onClose();
    setTimeout(() => { setStep(0); setForm(empty); setSubmitted(false); }, 300);
  };

  const selectedType = PROJECT_TYPES.find((t) => t.id === form.projectType);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">Start Your Project</h2>
            {!submitted && (
              <p className="text-xs text-muted-foreground mt-0.5">
                Step {step + 1} of {STEPS.length} — {STEPS[step]}
              </p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        {!submitted && (
          <div className="h-1 bg-secondary">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-8 min-h-[360px]">

          {/* ── SUBMITTED ── */}
          {submitted && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground">We've got your request!</h3>
              <p className="text-muted-foreground max-w-sm">
                Thanks <span className="text-foreground font-semibold">{form.name}</span>! We'll review your project details and get back to you at{' '}
                <span className="text-primary">{form.email}</span> within 24 hours.
              </p>
              <button onClick={handleClose} className="mt-4 btn-cta px-8 py-3 text-base">
                Close
              </button>
            </div>
          )}

          {/* ── STEP 0: Project Type ── */}
          {!submitted && step === 0 && (
            <div>
              <p className="text-muted-foreground mb-6">What kind of software do you need built?</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROJECT_TYPES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => set('projectType', t.id)}
                    className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-200 ${
                      form.projectType === t.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                    }`}
                  >
                    <span className="text-2xl">{t.icon}</span>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{t.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{t.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 1: Project Details ── */}
          {!submitted && step === 1 && (
            <div className="space-y-5">
              <p className="text-muted-foreground">Tell us more about what you want to build.</p>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Project Description <span className="text-primary">*</span>
                </label>
                <textarea
                  rows={4}
                  value={form.projectDescription}
                  onChange={(e) => set('projectDescription', e.target.value)}
                  placeholder="Describe your project idea, goals, and what problem it solves..."
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Key Features / Requirements
                </label>
                <textarea
                  rows={3}
                  value={form.features}
                  onChange={(e) => set('features', e.target.value)}
                  placeholder="e.g. user authentication, payment integration, real-time chat, admin dashboard..."
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm"
                />
              </div>
            </div>
          )}

          {/* ── STEP 2: Budget & Timeline ── */}
          {!submitted && step === 2 && (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-foreground mb-3">Budget Range <span className="text-primary">*</span></p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {BUDGET_RANGES.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => set('budget', b.id)}
                      className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                        form.budget === b.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                      }`}
                    >
                      <p className="font-semibold text-foreground text-xs">{b.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{b.sub}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-3">Desired Timeline <span className="text-primary">*</span></p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TIMELINE_OPTIONS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => set('timeline', t.id)}
                      className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                        form.timeline === t.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                      }`}
                    >
                      <p className="font-semibold text-foreground text-xs">{t.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{t.sub}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 3: Personal Details ── */}
          {!submitted && step === 3 && (
            <div className="space-y-4">
              <p className="text-muted-foreground">Who should we get back to?</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    placeholder="+1 555 000 0000"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Company / Organisation</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => set('company', e.target.value)}
                    placeholder="Acme Inc. (optional)"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 4: Review ── */}
          {!submitted && step === 4 && (
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm">Review your project request before submitting.</p>
              <div className="rounded-xl border border-border divide-y divide-border text-sm">
                <Row label="Project Type" value={selectedType ? `${selectedType.icon} ${selectedType.label}` : '—'} />
                <Row label="Description" value={form.projectDescription} />
                {form.features && <Row label="Key Features" value={form.features} />}
                <Row label="Budget" value={BUDGET_RANGES.find(b => b.id === form.budget)?.label ?? '—'} />
                <Row label="Timeline" value={TIMELINE_OPTIONS.find(t => t.id === form.timeline)?.label ?? '—'} />
                <Row label="Name" value={form.name} />
                <Row label="Email" value={form.email} />
                {form.phone && <Row label="Phone" value={form.phone} />}
                {form.company && <Row label="Company" value={form.company} />}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!submitted && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-secondary/30">
            <button
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext()}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <><Check className="w-4 h-4" /> Submit Request</>}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4 px-4 py-3">
      <span className="text-muted-foreground w-28 shrink-0">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}
