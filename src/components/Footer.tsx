import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Phone, MapPin, ArrowUpRight, Send } from 'lucide-react';
import GroundLayer from './GroundLayer';
import ProjectModal from './ProjectModal';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

const SERVICES = [
  'Web Applications',
  'Mobile Apps',
  'E-Commerce Platforms',
  'Dashboards & Analytics',
  'API & Backend Systems',
  'AI / ML Integration',
];

const TEAM = [
  {
    name: 'Lewis Mwangi',
    role: 'Full Stack Engineer',
    skills: 'React · Node.js · TypeScript · AWS',
  },
  {
    name: 'Lawrence Andwala',
    role: 'Full Stack Engineer',
    skills: 'Vue.js · Python · Docker · PostgreSQL',
  },
];

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIALS = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/ytlewis' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/lewis-mwangi-50486929a' },
  { icon: XIcon, label: 'X', href: 'https://x.com/YtLewis_' },
];

/** Underground soil background — strata, rocks, roots, worms, moisture */
function SoilBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1440 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Soil strata gradients */}
        <linearGradient id="stratum1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b2008" />
          <stop offset="100%" stopColor="#2e1a06" />
        </linearGradient>
        <linearGradient id="stratum2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2e1a06" />
          <stop offset="100%" stopColor="#1e1004" />
        </linearGradient>
        <linearGradient id="stratum3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e1004" />
          <stop offset="100%" stopColor="#120a02" />
        </linearGradient>
        {/* Rock gradients */}
        <radialGradient id="rock1" cx="35%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#7a6a58" />
          <stop offset="60%" stopColor="#5a4a38" />
          <stop offset="100%" stopColor="#3a2e22" />
        </radialGradient>
        <radialGradient id="rock2" cx="40%" cy="25%" r="55%">
          <stop offset="0%" stopColor="#6e5e4c" />
          <stop offset="60%" stopColor="#4e3e2c" />
          <stop offset="100%" stopColor="#2e2018" />
        </radialGradient>
        <radialGradient id="rock3" cx="30%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#8a7a68" />
          <stop offset="55%" stopColor="#6a5a48" />
          <stop offset="100%" stopColor="#4a3a28" />
        </radialGradient>
        <radialGradient id="rock4" cx="45%" cy="20%" r="50%">
          <stop offset="0%" stopColor="#5e4e3c" />
          <stop offset="100%" stopColor="#2a1e12" />
        </radialGradient>
        {/* Moisture patch */}
        <radialGradient id="moisture" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5c3a10" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3b2008" stopOpacity="0" />
        </radialGradient>
        {/* Worm tunnel gradient */}
        <linearGradient id="wormTunnel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1a0e04" stopOpacity="0" />
          <stop offset="30%" stopColor="#1a0e04" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#1a0e04" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1a0e04" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ── Soil strata layers ── */}
      <rect x="0" y="0" width="1440" height="200" fill="url(#stratum1)" />
      <path d="M0 195 Q240 185 480 200 Q720 215 960 198 Q1200 182 1440 200 L1440 260 L0 260 Z" fill="url(#stratum2)" />
      <path d="M0 255 Q360 240 720 258 Q1080 275 1440 255 L1440 400 L0 400 Z" fill="url(#stratum2)" />
      <path d="M0 395 Q300 380 600 398 Q900 415 1200 395 Q1320 388 1440 400 L1440 600 L0 600 Z" fill="url(#stratum3)" />

      {/* Strata dividing lines */}
      <path d="M0 195 Q240 185 480 200 Q720 215 960 198 Q1200 182 1440 200" fill="none" stroke="#5c3a10" strokeWidth="1.5" opacity="0.5" />
      <path d="M0 255 Q360 240 720 258 Q1080 275 1440 255" fill="none" stroke="#4a2e0a" strokeWidth="1.5" opacity="0.4" />
      <path d="M0 395 Q300 380 600 398 Q900 415 1200 395 Q1320 388 1440 400" fill="none" stroke="#2e1a06" strokeWidth="1.5" opacity="0.4" />

      {/* ── Moisture patches ── */}
      <ellipse cx="200" cy="150" rx="120" ry="60" fill="url(#moisture)" opacity="0.5" />
      <ellipse cx="750" cy="300" rx="150" ry="70" fill="url(#moisture)" opacity="0.4" />
      <ellipse cx="1200" cy="200" rx="130" ry="55" fill="url(#moisture)" opacity="0.45" />
      <ellipse cx="500" cy="450" rx="100" ry="50" fill="url(#moisture)" opacity="0.35" />
      <ellipse cx="1050" cy="480" rx="140" ry="60" fill="url(#moisture)" opacity="0.4" />

      {/* ── Rocks ── */}
      {/* Large rock left */}
      <ellipse cx="110" cy="230" rx="55" ry="38" fill="url(#rock1)" />
      <ellipse cx="108" cy="222" rx="30" ry="16" fill="#8a7a68" opacity="0.3" />
      <path d="M65 240 Q90 220 140 235 Q155 245 145 255 Q120 265 75 252 Z" fill="#2a1e12" opacity="0.3" />

      {/* Medium rock top-right */}
      <ellipse cx="1320" cy="120" rx="42" ry="28" fill="url(#rock2)" />
      <ellipse cx="1318" cy="113" rx="22" ry="11" fill="#7e6e5c" opacity="0.3" />

      {/* Rock cluster centre */}
      <ellipse cx="680" cy="350" rx="35" ry="24" fill="url(#rock3)" />
      <ellipse cx="720" cy="360" rx="25" ry="18" fill="url(#rock1)" />
      <ellipse cx="700" cy="342" rx="18" ry="10" fill="#9a8a78" opacity="0.25" />

      {/* Small rocks scattered */}
      <ellipse cx="350" cy="170" rx="22" ry="15" fill="url(#rock4)" />
      <ellipse cx="900" cy="140" rx="18" ry="12" fill="url(#rock2)" />
      <ellipse cx="1100" cy="310" rx="30" ry="20" fill="url(#rock1)" />
      <ellipse cx="240" cy="420" rx="26" ry="17" fill="url(#rock3)" />
      <ellipse cx="1380" cy="380" rx="20" ry="14" fill="url(#rock4)" />
      <ellipse cx="560" cy="280" rx="16" ry="11" fill="url(#rock2)" />
      <ellipse cx="820" cy="480" rx="28" ry="19" fill="url(#rock1)" />

      {/* Pebbles */}
      {[
        [160,90],[420,130],[600,200],[850,260],[1050,180],[1250,340],[380,380],[700,440],[1150,520],[300,520],[950,550],[1350,500]
      ].map(([cx,cy],i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={6+i%5} ry={4+i%4} fill="#5a4a38" opacity="0.6" />
      ))}

      {/* ── Root systems — left tree ── */}
      {/* Main tap root */}
      <path d="M180 0 C178 40 175 80 170 130 C165 180 155 220 140 280 C130 330 120 380 115 440" fill="none" stroke="#2a1400" strokeWidth="8" strokeLinecap="round" opacity="0.9" />
      {/* Branch roots left */}
      <path d="M170 130 C150 145 120 155 80 160 C50 163 20 158 -10 165" fill="none" stroke="#2a1400" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
      <path d="M155 220 C130 230 100 240 60 248 C30 254 0 250 -20 260" fill="none" stroke="#2a1400" strokeWidth="4" strokeLinecap="round" opacity="0.75" />
      <path d="M140 280 C160 295 190 305 230 310 C260 314 290 310 320 318" fill="none" stroke="#2a1400" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
      <path d="M115 440 C90 455 60 462 20 465 C-10 467 -30 462 -50 470" fill="none" stroke="#2a1400" strokeWidth="3" strokeLinecap="round" opacity="0.65" />
      {/* Fine roots */}
      <path d="M80 160 C65 170 50 185 35 195 C20 205 5 210 -10 220" fill="none" stroke="#3a1e08" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M60 248 C45 260 30 275 15 285" fill="none" stroke="#3a1e08" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
      <path d="M230 310 C245 325 255 345 260 365" fill="none" stroke="#3a1e08" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <path d="M320 318 C340 330 355 348 360 370 C365 390 358 410 355 430" fill="none" stroke="#3a1e08" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />

      {/* ── Root systems — right tree ── */}
      <path d="M1260 0 C1262 40 1265 80 1270 130 C1275 180 1285 220 1300 280 C1310 330 1320 380 1325 440" fill="none" stroke="#2a1400" strokeWidth="8" strokeLinecap="round" opacity="0.9" />
      <path d="M1270 130 C1290 145 1320 155 1360 160 C1390 163 1420 158 1450 165" fill="none" stroke="#2a1400" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
      <path d="M1285 220 C1310 230 1340 240 1380 248 C1410 254 1440 250 1460 260" fill="none" stroke="#2a1400" strokeWidth="4" strokeLinecap="round" opacity="0.75" />
      <path d="M1300 280 C1280 295 1250 305 1210 310 C1180 314 1150 310 1120 318" fill="none" stroke="#2a1400" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
      <path d="M1325 440 C1350 455 1380 462 1420 465 C1450 467 1470 462 1490 470" fill="none" stroke="#2a1400" strokeWidth="3" strokeLinecap="round" opacity="0.65" />
      <path d="M1360 160 C1375 170 1390 185 1405 195 C1420 205 1435 210 1450 220" fill="none" stroke="#3a1e08" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M1380 248 C1395 260 1410 275 1425 285" fill="none" stroke="#3a1e08" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
      <path d="M1120 318 C1100 330 1085 348 1080 370 C1075 390 1082 410 1085 430" fill="none" stroke="#3a1e08" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />

      {/* ── Root systems — centre tree ── */}
      <path d="M720 0 C718 50 715 100 710 160 C705 220 695 270 680 340 C668 400 655 460 650 530" fill="none" stroke="#2a1400" strokeWidth="7" strokeLinecap="round" opacity="0.85" />
      <path d="M710 160 C685 175 650 185 610 190 C575 194 540 188 510 196" fill="none" stroke="#2a1400" strokeWidth="4.5" strokeLinecap="round" opacity="0.75" />
      <path d="M710 160 C735 175 770 185 810 190 C845 194 880 188 910 196" fill="none" stroke="#2a1400" strokeWidth="4.5" strokeLinecap="round" opacity="0.75" />
      <path d="M695 270 C665 285 630 295 590 300 C560 304 530 300 500 308" fill="none" stroke="#2a1400" strokeWidth="3.5" strokeLinecap="round" opacity="0.7" />
      <path d="M695 270 C725 285 760 295 800 300 C830 304 860 300 890 308" fill="none" stroke="#2a1400" strokeWidth="3.5" strokeLinecap="round" opacity="0.7" />
      <path d="M680 340 C650 358 615 368 575 372 C545 375 515 370 485 378" fill="none" stroke="#2a1400" strokeWidth="3" strokeLinecap="round" opacity="0.65" />
      <path d="M680 340 C710 358 745 368 785 372 C815 375 845 370 875 378" fill="none" stroke="#2a1400" strokeWidth="3" strokeLinecap="round" opacity="0.65" />
      {/* Fine centre roots */}
      <path d="M610 190 C590 205 570 220 550 235 C530 250 510 260 490 270" fill="none" stroke="#3a1e08" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <path d="M810 190 C830 205 850 220 870 235 C890 250 910 260 930 270" fill="none" stroke="#3a1e08" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <path d="M500 308 C480 325 465 345 460 370" fill="none" stroke="#3a1e08" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M890 308 C910 325 925 345 930 370" fill="none" stroke="#3a1e08" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />

      {/* ── Worm tunnels ── */}
      <path d="M50 300 C100 295 130 310 180 305 C230 300 260 315 310 308" fill="none" stroke="url(#wormTunnel)" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
      <path d="M900 200 C950 193 980 208 1030 202 C1080 196 1110 212 1160 205" fill="none" stroke="url(#wormTunnel)" strokeWidth="5" strokeLinecap="round" opacity="0.45" />
      <path d="M400 480 C460 472 500 488 560 480 C620 472 660 490 720 482" fill="none" stroke="url(#wormTunnel)" strokeWidth="5" strokeLinecap="round" opacity="0.4" />
      <path d="M1050 400 C1100 392 1140 408 1190 400 C1240 392 1280 410 1330 402" fill="none" stroke="url(#wormTunnel)" strokeWidth="4" strokeLinecap="round" opacity="0.4" />

      {/* ── Soil particles / texture dots ── */}
      {[
        [80,50],[200,80],[400,60],[600,90],[800,55],[1000,75],[1200,50],[1380,85],
        [150,180],[450,200],[750,170],[1050,195],[1300,175],
        [100,350],[350,330],[650,360],[950,340],[1250,355],
        [200,500],[500,520],[800,505],[1100,515],[1400,495],
      ].map(([cx,cy],i) => (
        <circle key={`p${i}`} cx={cx} cy={cy} r={2+i%3} fill="#5c3a10" opacity={0.3+i%3*0.1} />
      ))}
    </svg>
  );
}

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    document.body.setAttribute('data-modal-open', 'true');
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.removeAttribute('data-modal-open');
  };

  return (
    <footer className="relative z-10">
      <GroundLayer />

      {/* Soil underground section */}
      <div className="relative overflow-hidden" style={{ background: '#1e1004' }}>
        <SoilBackground />

        {/* Content sits above the SVG */}
        <div className="relative z-10">

          {/* Main footer grid */}
          <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

              {/* ── Brand ── */}
              <div className="lg:col-span-1">
                <Link to="/" className="font-heading text-2xl font-bold text-amber-100 tracking-tight">
                  Codelith
                </Link>
                <p className="text-sm text-amber-200/80 leading-relaxed mt-3 mb-6">
                  A two-person software studio crafting exceptional digital products — from idea to launch.
                </p>

                <button
                  onClick={openModal}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold
                             bg-amber-500 text-stone-900 hover:bg-amber-400 transition-colors"
                >
                  Start a Project <ArrowUpRight className="w-4 h-4" />
                </button>

                <div className="flex gap-3 mt-6">
                  {SOCIALS.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-9 h-9 rounded-full border border-amber-600/60 flex items-center justify-center
                                 text-amber-300 hover:text-amber-100 hover:border-amber-400 transition-all duration-200"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

              {/* ── Pages ── */}
              <div>
                <h4 className="font-heading text-xs font-semibold text-amber-400 uppercase tracking-widest mb-5">
                  Pages
                </h4>
                <ul className="space-y-3">
                  {NAV_LINKS.map(({ to, label }) => (
                    <li key={to}>
                      <Link
                        to={to}
                        className="text-sm text-amber-200/80 hover:text-amber-100 transition-colors flex items-center gap-1.5 group"
                      >
                        <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 text-amber-400">→</span>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Services ── */}
              <div>
                <h4 className="font-heading text-xs font-semibold text-amber-400 uppercase tracking-widest mb-5">
                  Services
                </h4>
                <ul className="space-y-3">
                  {SERVICES.map((s) => (
                    <li key={s} className="text-sm text-amber-200/80 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-amber-500/60 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Contact & Team ── */}
              <div>
                <h4 className="font-heading text-xs font-semibold text-amber-400 uppercase tracking-widest mb-5">
                  Get In Touch
                </h4>
                <ul className="space-y-4 mb-8">
                  <li>
                    <a
                      href="mailto:gathaiyalewis1122@gmail.com"
                      className="flex items-center gap-2.5 text-sm text-amber-200/80 hover:text-amber-100 transition-colors"
                    >
                      <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                      gathaiyalewis1122@gmail.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+254702320995"
                      className="flex items-center gap-2.5 text-sm text-amber-200/80 hover:text-amber-100 transition-colors"
                    >
                      <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                      +254 702 320 995
                    </a>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-amber-200/80">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    Nairobi, Kenya — Remote Worldwide
                  </li>
                </ul>

                <h4 className="font-heading text-xs font-semibold text-amber-400 uppercase tracking-widest mb-4">
                  The Team
                </h4>
                <ul className="space-y-4">
                  {TEAM.map((m) => (
                    <li key={m.name}>
                      <p className="text-sm font-semibold text-amber-100">{m.name}</p>
                      <p className="text-xs text-amber-400">{m.role}</p>
                      <p className="text-xs text-amber-200/60 mt-0.5">{m.skills}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter strip */}
          <div className="border-t border-amber-900/40">
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-sm font-semibold text-amber-100">Stay in the loop</p>
                <p className="text-xs text-amber-200/70 mt-0.5">Get updates on new projects and tech insights.</p>
              </div>
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 w-full sm:w-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 sm:w-64 px-4 py-2.5 rounded-full text-sm bg-amber-950/40 border border-amber-800/30
                             text-amber-100 placeholder:text-amber-200/30 focus:outline-none focus:border-amber-500/50"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full text-sm font-semibold bg-amber-500 text-stone-900
                             hover:bg-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-amber-900/40">
            <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-200/60">
              <p>© {new Date().getFullYear()} Codelith. All rights reserved.</p>
              <div className="flex gap-6">
                <span className="hover:text-amber-200/90 cursor-pointer transition-colors">Privacy Policy</span>
                <span className="hover:text-amber-200/90 cursor-pointer transition-colors">Terms of Service</span>
                <span className="hover:text-amber-200/90 cursor-pointer transition-colors">Cookie Policy</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <ProjectModal open={modalOpen} onClose={closeModal} />
    </footer>
  );
}
