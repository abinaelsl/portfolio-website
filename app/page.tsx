import Link from "next/link";

// ── Social links ─────────────────────────────────────────────────────────────
const socials = [
  {
    label: "GitHub",
    href: "https://github.com/abinaelsl",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abinaelsl24/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@abinaelsl",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/abinaelsl",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "ResearchGate",
    href: "#", // TODO: your ResearchGate profile URL
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
        <path d="M19.586 0H4.414A4.414 4.414 0 000 4.414v15.172A4.414 4.414 0 004.414 24h15.172A4.414 4.414 0 0024 19.586V4.414A4.414 4.414 0 0019.586 0zM9.5 16.5H7.75V9.25H9.5v7.25zm-.875-8.313a1.063 1.063 0 110-2.125 1.063 1.063 0 010 2.125zM18.5 16.5h-1.625l-2.063-3.438L12.75 16.5H11.25l2.625-4.125L11.5 9.25h1.625l1.875 3.063 1.875-3.063H18.5l-2.375 3.125L18.5 16.5z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#", // TODO: your TikTok profile URL
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:abinaelgame@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

// ── Papers ────────────────────────────────────────────────────────────────────
const papers = [
  {
    title: "Toward Net Zero: Thermal Performance Analysis of Type 36 Social Housing",
    authors: "Abinael Sarungallo Lumempouw",
    venue: "ResearchGate · 2023",
    href: "https://www.researchgate.net/publication/406981225_Abinael_Type_36_House_Paper_Final",
    tags: ["Net Zero", "Building Energy", "Housing"],
  },
  // TODO: add more papers here
];

// ── Projects ──────────────────────────────────────────────────────────────────
const projects = [
  {
    name: "StatusMaxx",
    tagline: "Match your payment cards to the best merchant promos — launched in Japan.",
    description:
      "StatusMaxx helps users discover credit card promotions matched to their wallet. Built with Expo/React Native (iOS & Android), a Python pipeline for daily promo extraction, and Supabase as the backend.",
    href: "#", // TODO: add StatusMaxx landing page or App Store link
    tags: ["React Native", "Expo", "Supabase", "Japan"],
    accent: "indigo",
  },
];

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-semibold text-sm tracking-tight text-gray-900">
          Abinael S.L.
        </span>
        <nav className="flex items-center gap-6 text-sm text-gray-600">
          <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
          <a href="#research" className="hover:text-indigo-600 transition-colors">Research</a>
          <a href="#projects" className="hover:text-indigo-600 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-indigo-600 transition-colors">Contact</a>
        </nav>
      </div>
    </header>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-start gap-8">
        {/* Avatar placeholder — replace src with your photo in /public/avatar.jpg */}
        <div className="shrink-0 w-24 h-24 rounded-full bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center text-indigo-500 text-3xl font-bold select-none">
          A
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 leading-tight">
            Abinael Sarungallo Lumempouw
          </h1>
          <p className="mt-2 text-base text-gray-600 leading-relaxed">
            Student at <span className="text-gray-900 font-medium">Kyushu University</span> ·{" "}
            Founder at <span className="text-indigo-600 font-medium">StatusMaxx</span> ·{" "}
            Researching{" "}
            <span className="text-gray-900 font-medium">Net Zero Buildings</span>
          </p>
          {/* Social icons */}
          <div className="mt-4 flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-600 transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-4">
        About
      </h2>
      <p className="text-gray-700 leading-relaxed text-base">
        I&apos;m a graduate student at Kyushu University (Kyudai) focused on sustainable building
        design and energy systems. My research investigates pathways to net-zero carbon emissions
        in residential buildings, with a focus on affordable housing typologies.
      </p>
      <p className="mt-4 text-gray-700 leading-relaxed text-base">
        Outside academia, I co-founded{" "}
        <span className="text-indigo-600 font-medium">StatusMaxx</span>, a fintech app that
        surfaces the best credit-card promotions for your wallet — currently live in Japan. I also
        create content on YouTube and TikTok around tech, startups, and university life in Japan.
      </p>
    </section>
  );
}

// ── Research ──────────────────────────────────────────────────────────────────
function Research() {
  return (
    <section id="research" className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-6">
        Research
      </h2>
      <ul className="space-y-6">
        {papers.map((p) => (
          <li key={p.title}>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <p className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors leading-snug">
                {p.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">{p.authors}</p>
              <p className="text-sm text-gray-400">{p.venue}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────
function Projects() {
  return (
    <section id="projects" className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-6">
        Projects
      </h2>
      <div className="space-y-6">
        {projects.map((p) => (
          <div
            key={p.name}
            className="rounded-xl border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{p.name}</h3>
                <p className="text-sm text-indigo-600 font-medium mt-0.5">{p.tagline}</p>
              </div>
              {p.href !== "#" && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-xs font-medium text-indigo-600 border border-indigo-200 rounded-full px-3 py-1 hover:bg-indigo-50 transition-colors"
                >
                  Visit ↗
                </a>
              )}
            </div>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">{p.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Content ───────────────────────────────────────────────────────────────────
function Content() {
  const channels = [
    {
      platform: "YouTube",
      handle: "@abinaelsl",
      href: "https://www.youtube.com/@abinaelsl",
      description: "Videos on tech, startups, and student life in Japan.",
      color: "bg-red-50 text-red-600 border-red-100",
    },
    {
      platform: "Instagram",
      handle: "@abinaelsl",
      href: "https://instagram.com/abinaelsl",
      description: "Photos and reels from Japan and everyday life.",
      color: "bg-pink-50 text-pink-600 border-pink-100",
    },
    {
      platform: "TikTok",
      handle: "@abinaelsl", // TODO: confirm TikTok handle
      href: "#",            // TODO: your TikTok profile URL
      description: "Short-form content on productivity and Japan life.",
      color: "bg-gray-50 text-gray-800 border-gray-200",
    },
  ];

  return (
    <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-6">
        Content
      </h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {channels.map((c) => (
          <a
            key={c.platform}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-xl border p-4 hover:shadow-sm transition-all ${c.color}`}
          >
            <p className="font-semibold">{c.platform}</p>
            <p className="text-sm font-mono mt-0.5 opacity-70">{c.handle}</p>
            <p className="mt-2 text-sm opacity-80">{c.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

// ── Footer / Contact ──────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer id="contact" className="border-t border-gray-100 mt-auto">
      <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-gray-900">Abinael Sarungallo Lumempouw</p>
          <a
            href="mailto:abinaelgame@gmail.com"
            className="text-sm text-indigo-600 hover:underline"
          >
            abinaelgame@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-600 transition-colors"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 pb-6">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Abinael Sarungallo Lumempouw
        </p>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <About />
        <Research />
        <Projects />
        <Content />
      </main>
      <Footer />
    </>
  );
}
