import type { Metadata } from "next";
import { SubHeader } from "@/app/components/sub-header";
import { PageFooter } from "@/app/components/page-footer";
import { Reveal } from "@/app/lib/motion";
import { CrossMark } from "@/app/components/orbital";

export const metadata: Metadata = {
  title: "Master's Plan",
  description:
    "A guide and timeline for Abinael's master's journey — the research student path at Kyushu University, backup options, and application strategy.",
  openGraph: {
    title: "Master's Plan · Abinael S.L.",
    description:
      "A guide and timeline for Abinael's master's journey — the research student path at Kyushu University, backup options, and application strategy.",
    type: "article",
  },
  alternates: { canonical: "/mastersplan" },
};

// ── shared inline components ─────────────────────────────────────────────────

function SectionLabel({
  children,
  index,
}: {
  children: React.ReactNode;
  index: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <CrossMark className="text-accent" />
      <h2 className="label text-accent shrink-0">{children}</h2>
      <span aria-hidden className="h-px flex-1 bg-line" />
      <span className="label text-faint shrink-0">{index}</span>
    </div>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[var(--radius-panel)] border border-line bg-surface/60 backdrop-blur-sm p-5 ${className}`}
    >
      {children}
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] px-2 py-0.5 rounded border border-accent/30 text-accent">
      {children}
    </span>
  );
}

function TagMuted({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] px-2 py-0.5 rounded border border-line text-muted">
      {children}
    </span>
  );
}

// ── data ─────────────────────────────────────────────────────────────────────

const profileStats = [
  { label: "Undergrad", value: "ISI Kyushu University" },
  { label: "Graduation", value: "Oct 2026" },
  { label: "GPA", value: "3.21 / 4.0" },
  { label: "TOEFL iBT", value: "110" },
  { label: "Japanese", value: "Near-N1 (4 yr)" },
  { label: "Research", value: "Energy retrofit policy" },
];

const timeline = [
  {
    date: "Jul 10, 2026",
    title: "ISGS Interview",
    detail: "Oral interview for the International Master's Course at ISGS, Kyushu University. Result pending Jul 27.",
    status: "done",
  },
  {
    date: "Jul 27, 2026",
    title: "ISGS Result",
    detail: "Final admission decision for ISGS. If accepted → enroll Oct 2026. If not → activate Plan B (research student).",
    status: "pending",
  },
  {
    date: "Sep 25, 2026",
    title: "Osaka U Pre-Application",
    detail: "Declare language (Eng/JP) + chosen fundamental subject (Math/Physics/Chemistry) for Osaka U Sustainable Energy & Environmental Engineering.",
    status: "deadline",
  },
  {
    date: "Oct 2026",
    title: "Graduate ISI 🎓",
    detail: "Receive Bachelor of Science and Arts from Kyushu University. Residence card expires Nov 2026 — visa action required.",
    status: "milestone",
  },
  {
    date: "Oct 2026",
    title: "Start Research Student",
    detail: "Enroll as kenkyūsei under Prof. Hazarika Hemanta, Dept. of Civil Engineering. Student visa extended. Tuition ~¥35,000/mo.",
    status: "milestone",
  },
  {
    date: "Oct 26–30, 2026",
    title: "Osaka U Application",
    detail: "Submit application documents for the winter exam (Apr 2027 enrollment). Written exam + oral exam in winter.",
    status: "deadline",
  },
  {
    date: "Nov 2026",
    title: "Visa Change",
    detail: "Switch from undergrad Student status to research-student Student status. Smooth change-of-status at Fukuoka Immigration.",
    status: "action",
  },
  {
    date: "Dec 2026",
    title: "Tohoku G2SD Application",
    detail: "Apply to Tohoku University G2SD (Global Governance & Sustainable Development) for Apr 2027 intake. Document screening + online interview, no written exam.",
    status: "deadline",
  },
  {
    date: "Jan 6–14, 2027",
    title: "Nagoya U G30 Application",
    detail: "First-round application to Nagoya University G30 Civil & Environmental Engineering (100% English). Document screening + oral exam (~20 min).",
    status: "deadline",
  },
  {
    date: "Feb 2027",
    title: "Tohoku G2SD Exam",
    detail: "Online interview for Tohoku G2SD (if applied in Dec). Result expected ~Mar 2027.",
    status: "exam",
  },
  {
    date: "Feb–Mar 2027",
    title: "Osaka U Exam Period",
    detail: "Written exam (1 fundamental subject + Environmental Engineering) and oral exam for Osaka U winter intake.",
    status: "exam",
  },
  {
    date: "Mar 2027",
    title: "Tohoku G2SD Result",
    detail: "Admission decision from Tohoku G2SD for Apr 2027 enrollment.",
    status: "result",
  },
  {
    date: "Apr 2027",
    title: "Decision Point",
    detail: "If accepted to Tohoku G2SD → start Master's. If not → continue research student and prepare for Kyushu Civil Eng General Exam.",
    status: "milestone",
  },
  {
    date: "May 2027",
    title: "Nagoya G30 Round 2",
    detail: "Second-round (rolling) application for Nagoya G30 if seats remain. Backup for Oct 2027 intake.",
    status: "deadline",
  },
  {
    date: "May–Jun 2027",
    title: "Tohoku G2SD (Oct Intake)",
    detail: "Application + interview for Tohoku G2SD October 2027 intake (if Apr intake didn't work out).",
    status: "deadline",
  },
  {
    date: "Jul 2027",
    title: "Kyushu U Civil Eng General Exam",
    detail: "Backup plan: take the General Entrance Exam for Kyushu University Graduate School of Engineering, Civil Engineering. Multiple subjects, Japanese/English.",
    status: "exam",
  },
  {
    date: "Oct 2027",
    title: "Start Master's 🎉",
    detail: "Enroll in a master's program — whether Osaka U, Nagoya U, Tohoku U, or Kyushu U. Two years of research begin.",
    status: "milestone",
  },
];

const statusColors: Record<string, string> = {
  done: "text-accent",
  pending: "text-muted",
  deadline: "text-accent",
  milestone: "text-ink",
  action: "text-muted",
  exam: "text-accent",
  result: "text-muted",
};

const statusDot: Record<string, string> = {
  done: "bg-accent",
  pending: "bg-faint",
  deadline: "bg-accent",
  milestone: "bg-ink",
  action: "bg-faint",
  exam: "bg-accent",
  result: "bg-faint",
};

const backupOptions = [
  {
    rank: "B-1",
    name: "Kyushu U — IGSES G-30",
    program: "Interdisciplinary Graduate School of Engineering Sciences",
    language: "100% English",
    intake: "October",
    deadline: "~Apr–May for Oct intake",
    degree: "Master of Engineering / Science / Philosophy",
    exam: "Written tests + interview (Fukuoka)",
    fit: "⭐⭐⭐",
    note: "Same university, different school. English-medium, interdisciplinary. Would need a new supervisor in IGSES.",
    href: "https://www.tj.kyushu-u.ac.jp/en/exam/master/master_g-30.php",
  },
  {
    rank: "B-2",
    name: "Kyushu U — Graduate School of Design",
    program: "Design Science (Personal Merits pathway)",
    language: "English pathway",
    intake: "Oct 2026 or Apr 2027",
    deadline: "Check if Oct 2026 still open",
    degree: "Master of Design",
    exam: "Documents + portfolio + interview (no written exam)",
    fit: "⭐⭐⭐",
    note: "Portfolio-based, no written exam. Could be strong if the net-zero house project + Energy3D work is presented well.",
    href: "https://www.design.kyushu-u.ac.jp/en/admission",
  },
];

const parallelOptions = [
  {
    rank: "1",
    name: "Osaka University",
    program: "Sustainable Energy & Environmental Engineering",
    language: "English or Japanese (your choice)",
    intake: "April 2027",
    deadline: "Pre-app Sep 25, 2026 · Submit Oct 26–30, 2026",
    degree: "Master of Engineering",
    exam: "Written (1 fundamental: Math/Physics/Chemistry + Major Subject) + Oral",
    fit: "⭐⭐⭐⭐⭐",
    supervisors: "Prof. Shimoda (urban energy systems), Prof. Kii (urban policy)",
    note: "Best research fit. Exam format is manageable — only 1 fundamental subject. Must contact supervisor beforehand.",
    href: "https://see.eng.osaka-u.ac.jp/en/exam/masters_1",
  },
  {
    rank: "2",
    name: "Nagoya University",
    program: "G30 Civil & Environmental Engineering",
    language: "100% English",
    intake: "October 2027",
    deadline: "Jan 6–14, 2027 (first round)",
    degree: "Master of Civil and Environmental Engineering",
    exam: "Document screening + oral exam (~20 min). No written exam.",
    fit: "⭐⭐⭐⭐",
    supervisors: "Assoc. Prof. Nakamura (green infrastructure), Prof. Hayashi (renewable energy)",
    note: "No written exam — document screening + interview only. 100% English. Oct 2027 start (one year later than Osaka).",
    href: "https://admissions.g30.nagoya-u.ac.jp/graduate-programs/civil_environmental",
  },
  {
    rank: "3",
    name: "Tohoku University",
    program: "G2SD — Global Governance & Sustainable Development",
    language: "English",
    intake: "April or October 2027",
    deadline: "~Dec 2026 (Apr intake) or ~Mar–Apr 2027 (Oct intake)",
    degree: "Master's (2 years)",
    exam: "Document screening + online interview. No written exam.",
    fit: "⭐⭐⭐⭐",
    supervisors: "Prof. Aoki (pro-social behavior, environmental policy), Prof. Sato (environmental policy)",
    note: "Behavioral economics + environmental policy = directly connects to ISGS research on nudges/boosts. Small cohort (~5/yr).",
    href: "https://www.intcul.tohoku.ac.jp/g2sd",
  },
];

const scholarshipOptions = [
  {
    name: "MEXT Scholarship (University Recommendation)",
    amount: "¥143,000–145,000/mo + full tuition",
    deadline: "Via Kyushu U internal selection (~Spring 2027)",
    note: "University nominates outstanding students to MEXT. Prof. Hazarika could recommend. Full coverage.",
  },
  {
    name: "JASSO Honors Scholarship",
    amount: "¥48,000/mo",
    deadline: "After enrollment (auto-eligible if GPA ≥ 3.0)",
    note: "For privately financed international students already in Japan. Application through the university.",
  },
  {
    name: "Kyushu University International Student Scholarship",
    amount: "Tuition waiver (50–100%)",
    deadline: "After enrollment",
    note: "University-specific aid. Already received this during undergrad — strong track record.",
  },
  {
    name: "ADB-Japan Scholarship Program",
    amount: "Full tuition + monthly stipend + housing + travel",
    deadline: "~Nov–Dec 2026 (varies by university)",
    note: "Funds students from ADB developing member countries (Indonesia ✓) at participating universities including Kyushu U.",
  },
];

const visaOptions = [
  {
    name: "Research Student (Kenkyūsei) Visa",
    type: "Student status — extended",
    duration: "1 year (renewable)",
    work: "Part-time up to 28h/week",
    cost: "Tuition ~¥35,000/mo (cheaper than master's ¥535,800/yr)",
    note: "Smooth change-of-status from undergrad Student visa. Keeps you in Fukuoka, in the lab, and legally resident.",
    active: true,
  },
  {
    name: "Designated Activities (Job Hunting) Visa",
    type: "Tokutei Katsudo — employment-seeking",
    duration: "6 months (renewable up to 1 year)",
    work: "Part-time up to 28h/week",
    cost: "No tuition (not enrolled)",
    note: "Fallback if NO program is secured by Nov 2026. Apply at Fukuoka Immigration Bureau before current visa expires.",
    active: false,
  },
  {
    name: "J-Find (Future Creation Talent) Visa",
    type: "Designated Activities sub-type",
    duration: "Up to 2 years",
    work: "Job hunting + business preparation",
    cost: "No tuition",
    note: "For graduates of distinguished universities. Kyushu U qualifies. Longer than the standard job-hunting visa.",
    active: false,
  },
];

// ── page ─────────────────────────────────────────────────────────────────────

export default function MastersPlanPage() {
  return (
    <>
      <SubHeader backHref="/" backLabel="Abinael S.L." />
      <main className="flex-1">
        <article className="max-w-2xl mx-auto px-6 pt-16 pb-20">
          {/* ── Header ── */}
          <Reveal>
            <p className="label text-accent">Master's Plan · 2026–2027</p>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl uppercase tracking-tight leading-[0.95] text-ink">
              The Research Student Path
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              A guide and timeline for navigating the master's application process —
              the primary plan (research student at Kyushu University under Prof. Hazarika),
              backup options, parallel applications, and visa strategy.
            </p>
          </Reveal>

          {/* ── Status / Profile ── */}
          <Reveal delay={0.05}>
            <div className="mt-8 border-t border-line pt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {profileStats.map((s) => (
                  <div key={s.label}>
                    <p className="label text-faint">{s.label}</p>
                    <p className="mt-1 text-sm font-medium text-ink">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ── The Situation ── */}
          <Reveal delay={0.08}>
            <section className="mt-16">
              <SectionLabel index="01 / Context">The Situation</SectionLabel>
              <p className="text-muted leading-relaxed text-base">
                Abinael graduates from Kyushu University's School of Interdisciplinary
                Science and Innovation (ISI) in October 2026. His undergraduate thesis
                used Energy3D simulation to show that a "Cooling Survival Kit" — glass-wool
                roof insulation, external window shading, inverter AC — reduces annual
                electricity consumption in Indonesia's Type 36 starter homes by{" "}
                <strong className="text-ink">57%</strong> (10,550 → 4,520 kWh), with
                a payback period under one year.
              </p>
              <p className="mt-4 text-muted leading-relaxed text-base">
                Yet these retrofits are not incorporated into national standards,
                subsidized-housing finance, or building codes. This gap between
                engineering viability and policy adoption is the research problem
                that drives the master's plan.
              </p>
              <Card className="mt-6">
                <p className="label text-accent mb-3">Key Constraints</p>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex gap-2">
                    <span className="text-accent shrink-0">→</span>
                    ISI is interdisciplinary, not pure engineering — need an exam format that fits
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent shrink-0">→</span>
                    Residence card expires Nov 2026 — visa action is time-critical
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent shrink-0">→</span>
                    ISGS interview done Jul 10, result Jul 27 — if accepted, plan simplifies
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent shrink-0">→</span>
                    IPMA application rejected — all eggs in the ISGS / research-student basket
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent shrink-0">→</span>
                    Does NOT want to return to Indonesia — need programs that keep Japan residency viable
                  </li>
                </ul>
              </Card>
            </section>
          </Reveal>

          {/* ── Primary Plan ── */}
          <Reveal delay={0.08}>
            <section className="mt-16">
              <SectionLabel index="02 / Primary">The Research Student Path</SectionLabel>
              <p className="text-muted leading-relaxed text-base">
                Prof. Hazarika Hemanta — Abinael's undergraduate supervisor in the
                Geodisaster Prevention Lab, Faculty of Civil Engineering — has offered
                a research student (kenkyūsei) position. This is the primary plan:
                enroll as a research student in October 2026, spend one year preparing
                for the General Entrance Exam, then enter the Civil Engineering
                Master's program in October 2027.
              </p>

              {/* Hazarika Lab card */}
              <Card className="mt-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-heading font-bold uppercase tracking-wide text-lg text-ink">
                      Prof. Hazarika Hemanta
                    </p>
                    <p className="label text-accent mt-1">
                      Geodisaster Prevention Lab · Civil Engineering
                    </p>
                  </div>
                  <Tag>Primary Supervisor</Tag>
                </div>
                <p className="mt-4 text-sm text-muted leading-relaxed">
                  Professor at Kyushu University's Graduate School of Engineering,
                  Department of Civil Engineering. Research focuses on geo-disaster
                  risk mitigation, climate change adaptation from geotechnical
                  perspectives, and developing disaster mitigation systems using
                  drones, IoT, and AI. 149+ publications, 2,198+ citations.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  <TagMuted>Soil-structure interaction</TagMuted>
                  <TagMuted>Disaster mitigation</TagMuted>
                  <TagMuted>Climate adaptation</TagMuted>
                  <TagMuted>Sustainable materials</TagMuted>
                </div>
                <div className="mt-5 pt-4 border-t border-line">
                  <p className="label text-faint mb-2">Connection to Research</p>
                  <p className="text-sm text-muted leading-relaxed">
                    Hazarika supervised the undergraduate thesis (Energy3D simulation
                    of Indonesian housing retrofit). The master's research extends
                    this engineering work into economic policy evaluation — bridging
                    building physics with microeconomic incentive design.
                  </p>
                </div>
              </Card>

              {/* Steps */}
              <div className="mt-8 space-y-4">
                {[
                  {
                    step: "Step 1",
                    title: "Enroll as Research Student (Oct 2026)",
                    detail:
                      "Submit application (deadline Aug 17, 2026 for residents in Japan). Application fee ¥9,800. Required: application form, graduation certificate, transcript, supervisor consent, application fee. Student visa extended smoothly — same status, new program.",
                  },
                  {
                    step: "Step 2",
                    title: "Preparation Year (Oct 2026 – Jul 2027)",
                    detail:
                      "Audit graduate-level courses in civil engineering, economics, and policy. Continue lab work under Hazarika. Prepare for the General Entrance Exam: mathematics, structural mechanics, geotechnics, and specialized subjects. Build relationships with faculty.",
                  },
                  {
                    step: "Step 3",
                    title: "General Entrance Exam (Jul 2027)",
                    detail:
                      "Take the General Entrance Examination for the Graduate School of Engineering, Civil Engineering, Kyushu University. Multiple subjects, available in Japanese and English. This is the backup path's final gate — but with one year of targeted prep, it becomes very manageable.",
                  },
                  {
                    step: "Step 4",
                    title: "Enter Master's Program (Oct 2027)",
                    detail:
                      "If exam passed → enroll as a regular master's student. Two years of research. Tuition ¥535,800/yr (with possible waiver). Degree: Master of Engineering. If not passed → consider IGSES G-30 (Oct 2027 intake, deadline ~Apr 2027) or Graduate School of Design.",
                  },
                ].map((s, i) => (
                  <Reveal key={s.step} delay={i * 0.04}>
                    <div className="flex gap-4">
                      <div className="shrink-0 w-16">
                        <p className="label text-accent">{s.step}</p>
                      </div>
                      <div className="flex-1 border-l-2 border-line pl-4 pb-2">
                        <p className="font-medium text-ink">{s.title}</p>
                        <p className="mt-1 text-sm text-muted leading-relaxed">
                          {s.detail}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          </Reveal>

          {/* ── Research Direction ── */}
          <Reveal delay={0.08}>
            <section className="mt-16">
              <SectionLabel index="03 / Research">The Research Direction</SectionLabel>
              <Card>
                <p className="font-heading font-bold text-ink uppercase tracking-wide">
                  Economic Policy Evaluation of Residential Energy Retrofit Incentives
                  in Developing Economies
                </p>
                <p className="mt-2 text-sm text-muted">
                  A Microeconomic Analysis of Indonesia's Type 36 Housing Policy Framework
                </p>
                <div className="mt-5 pt-4 border-t border-line space-y-4">
                  <div>
                    <p className="label text-accent mb-1">Research Question</p>
                    <p className="text-sm text-muted leading-relaxed">
                      What incentive structures, regulatory mechanisms, and institutional
                      arrangements are required to achieve large-scale residential
                      energy-retrofit adoption in a developing-economy context where
                      engineering net returns are favorable, yet household demand is
                      suppressed by affordability and aggregate uptake remains low?
                    </p>
                  </div>
                  <div>
                    <p className="label text-accent mb-1">Methodology</p>
                    <div className="text-sm text-muted leading-relaxed space-y-1">
                      <p><span className="text-ink font-medium">Phase 1:</span> Literature review — energy-efficiency gap literature (Jaffe & Stavins 1994; Allcott & Greenstone 2012; Gerarden et al. 2017)</p>
                      <p><span className="text-ink font-medium">Phase 2:</span> Empirical analysis — discrete-choice random-utility model (logit/mixed-logit). Data: Susenas, PLN records, PUPR data</p>
                      <p><span className="text-ink font-medium">Phase 3:</span> Policy simulation — ranked evaluation of instruments (mandatory standards, consumer subsidies, green financing, behavioral nudges)</p>
                    </div>
                  </div>
                  <div>
                    <p className="label text-accent mb-1">Unique Contributions</p>
                    <ul className="text-sm text-muted space-y-1.5">
                      <li className="flex gap-2"><span className="text-accent shrink-0">1.</span> <span><strong className="text-ink">Rationed comfort extension</strong> — treats comfort as rationed (not satiated), so retrofit adoption trades cash savings against recovered habitability under a binding budget constraint</span></li>
                      <li className="flex gap-2"><span className="text-accent shrink-0">2.</span> <span><strong className="text-ink">Engineering-to-economics coupling</strong> — building physics simulation (Energy3D) provides physically grounded parameters to the household choice model</span></li>
                    </ul>
                  </div>
                </div>
              </Card>
            </section>
          </Reveal>

          {/* ── Backup Options (Kyudai) ── */}
          <Reveal delay={0.08}>
            <section className="mt-16">
              <SectionLabel index="04 / Backup">Kyudai Backup Options</SectionLabel>
              <p className="text-muted leading-relaxed text-base mb-6">
                If the Civil Engineering General Exam doesn't work out, two other
                Kyushu University programs offer alternative pathways — both with
                English-medium instruction and less traditional exam formats.
              </p>
              <div className="space-y-5">
                {backupOptions.map((opt) => (
                  <Reveal key={opt.rank}>
                    <Card className="hover:border-line-strong transition-colors duration-200">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-heading font-bold uppercase tracking-wide text-lg text-ink">
                            {opt.name}
                          </p>
                          <p className="label text-accent mt-1">{opt.program}</p>
                        </div>
                        <span className="font-mono text-xs text-faint shrink-0">
                          {opt.fit}
                        </span>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="label text-faint">Language</p>
                          <p className="text-muted mt-0.5">{opt.language}</p>
                        </div>
                        <div>
                          <p className="label text-faint">Intake</p>
                          <p className="text-muted mt-0.5">{opt.intake}</p>
                        </div>
                        <div>
                          <p className="label text-faint">Deadline</p>
                          <p className="text-muted mt-0.5">{opt.deadline}</p>
                        </div>
                        <div>
                          <p className="label text-faint">Degree</p>
                          <p className="text-muted mt-0.5">{opt.degree}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-line">
                        <p className="label text-faint mb-1">Exam Format</p>
                        <p className="text-sm text-muted">{opt.exam}</p>
                      </div>
                      <p className="mt-3 text-sm text-muted leading-relaxed">
                        {opt.note}
                      </p>
                      <a
                        href={opt.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 label inline-flex items-center gap-1 text-accent hover:opacity-80 transition-opacity"
                      >
                        Program website
                        <span aria-hidden>↗</span>
                      </a>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </section>
          </Reveal>

          {/* ── Parallel Applications ── */}
          <Reveal delay={0.08}>
            <section className="mt-16">
              <SectionLabel index="05 / Parallel">Parallel Applications</SectionLabel>
              <p className="text-muted leading-relaxed text-base mb-6">
                While at Kyushu as a research student, apply to other top Japanese
                universities. These programs have simpler exam formats — some require
                only document screening and an interview, no written exam at all.
              </p>
              <div className="space-y-5">
                {parallelOptions.map((opt) => (
                  <Reveal key={opt.rank}>
                    <Card className="hover:border-line-strong transition-colors duration-200">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <span className="font-display text-2xl text-accent/40 shrink-0">
                            {opt.rank}
                          </span>
                          <div>
                            <p className="font-heading font-bold uppercase tracking-wide text-lg text-ink">
                              {opt.name}
                            </p>
                            <p className="label text-accent mt-1">{opt.program}</p>
                          </div>
                        </div>
                        <span className="font-mono text-xs text-faint shrink-0">
                          {opt.fit}
                        </span>
                      </div>
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="label text-faint">Language</p>
                          <p className="text-muted mt-0.5">{opt.language}</p>
                        </div>
                        <div>
                          <p className="label text-faint">Intake</p>
                          <p className="text-muted mt-0.5">{opt.intake}</p>
                        </div>
                        <div>
                          <p className="label text-faint">Deadline</p>
                          <p className="text-muted mt-0.5">{opt.deadline}</p>
                        </div>
                        <div>
                          <p className="label text-faint">Degree</p>
                          <p className="text-muted mt-0.5">{opt.degree}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-line">
                        <p className="label text-faint mb-1">Exam Format</p>
                        <p className="text-sm text-muted">{opt.exam}</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-line">
                        <p className="label text-faint mb-1">Potential Supervisors</p>
                        <p className="text-sm text-muted">{opt.supervisors}</p>
                      </div>
                      <p className="mt-3 text-sm text-muted leading-relaxed">
                        {opt.note}
                      </p>
                      <a
                        href={opt.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 label inline-flex items-center gap-1 text-accent hover:opacity-80 transition-opacity"
                      >
                        Program website
                        <span aria-hidden>↗</span>
                      </a>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </section>
          </Reveal>

          {/* ── Funding ── */}
          <Reveal delay={0.08}>
            <section className="mt-16">
              <SectionLabel index="06 / Funding">Scholarships & Funding</SectionLabel>
              <p className="text-muted leading-relaxed text-base mb-6">
                Several funding options are available once enrolled — from full
                MEXT coverage to university tuition waivers.
              </p>
              <div className="space-y-4">
                {scholarshipOptions.map((sch, i) => (
                  <Reveal key={sch.name} delay={i * 0.03}>
                    <div className="border-l-2 border-line hover:border-accent transition-colors duration-200 pl-4 py-2">
                      <div className="flex items-start justify-between gap-4">
                        <p className="font-medium text-ink">{sch.name}</p>
                        <span className="font-mono text-xs text-accent shrink-0 text-right">
                          {sch.amount}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted">{sch.note}</p>
                      <p className="mt-1 label text-faint">{sch.deadline}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          </Reveal>

          {/* ── Visa ── */}
          <Reveal delay={0.08}>
            <section className="mt-16">
              <SectionLabel index="07 / Visa">Visa Pathways</SectionLabel>
              <div className="space-y-4">
                {visaOptions.map((v, i) => (
                  <Reveal key={v.name} delay={i * 0.03}>
                    <Card
                      className={
                        v.active
                          ? "border-accent/40 bg-accent-soft"
                          : ""
                      }
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium text-ink">{v.name}</p>
                          <p className="label text-accent mt-1">{v.type}</p>
                        </div>
                        {v.active && <Tag>Primary</Tag>}
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="label text-faint">Duration</p>
                          <p className="text-muted mt-0.5">{v.duration}</p>
                        </div>
                        <div>
                          <p className="label text-faint">Work Rights</p>
                          <p className="text-muted mt-0.5">{v.work}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="label text-faint">Cost</p>
                          <p className="text-muted mt-0.5">{v.cost}</p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-muted leading-relaxed">
                        {v.note}
                      </p>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </section>
          </Reveal>

          {/* ── Timeline ── */}
          <Reveal delay={0.08}>
            <section className="mt-16">
              <SectionLabel index="08 / Timeline">Master Timeline</SectionLabel>
              <div className="relative">
                {/* vertical line */}
                <div
                  aria-hidden
                  className="absolute left-2 top-2 bottom-2 w-px bg-line"
                />
                <div className="space-y-6">
                  {timeline.map((item, i) => (
                    <Reveal key={i} delay={i * 0.02}>
                      <div className="relative pl-10">
                        {/* dot */}
                        <div
                          className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-bg ${
                            statusDot[item.status]
                          }`}
                        />
                        <p
                          className={`label tabular-nums ${
                            statusColors[item.status]
                          }`}
                        >
                          {item.date}
                        </p>
                        <p className="mt-1 font-medium text-ink">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm text-muted leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          </Reveal>

          {/* ── Strategy Summary ── */}
          <Reveal delay={0.08}>
            <section className="mt-16">
              <SectionLabel index="09 / Strategy">Strategy Summary</SectionLabel>
              <Card className="bg-surface/80">
                <div className="space-y-4 text-sm text-muted leading-relaxed">
                  <div>
                    <p className="font-medium text-ink mb-1">If ISGS is accepted (Jul 27):</p>
                    <p>Enroll in ISGS Oct 2026. The research student path becomes unnecessary. This is the simplest, fastest route — a fully funded English-medium master's with Prof. Kurita in applied microeconomics, directly aligned with the research topic.</p>
                  </div>
                  <div className="pt-3 border-t border-line">
                    <p className="font-medium text-ink mb-1">If ISGS is rejected:</p>
                    <p>Activate the research student path under Prof. Hazarika (Oct 2026). Simultaneously apply to Osaka U (deadline Oct 30), Tohoku G2SD (deadline Dec 2026), and Nagoya G30 (deadline Jan 2027). If any parallel application succeeds before Apr 2027, leave the research student position. If none succeed, take the Kyushu Civil Eng General Exam in Jul 2027 for Oct 2027 enrollment.</p>
                  </div>
                  <div className="pt-3 border-t border-line">
                    <p className="font-medium text-ink mb-1">Worst case:</p>
                    <p>If no master's program is secured by Nov 2026, switch to Designated Activities (job hunting) visa. Stay in Japan, job hunt, and reapply to programs for Apr/Oct 2028 intake. The J-Find visa (2 years, Kyushu U qualifies) is a strong fallback.</p>
                  </div>
                </div>
              </Card>
            </section>
          </Reveal>

          {/* ── Back link ── */}
          <Reveal>
            <div className="mt-12 border-t border-line pt-8">
              <a
                href="/"
                className="label group inline-flex items-center gap-1 text-muted hover:text-accent transition-colors"
              >
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:-translate-x-0.5"
                >
                  ←
                </span>
                Back to portfolio
              </a>
            </div>
          </Reveal>
        </article>
      </main>
      <PageFooter />
    </>
  );
}
