import { useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Play,
  FileText,
  ScanFace,
  Hand,
  Sparkles,
  Eye,
  Glasses,
  Wallet,
  Volume2,
  Mic,
} from 'lucide-react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { InvestorDeckModal } from './InvestorDeckModal';
import { DeckViewerModal } from './DeckViewerModal';
import { GlassesDemoModal } from './GlassesDemoModal';
import { MirrorDemoModal } from './MirrorDemoModal';

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ y: 24, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, color = '#0047FF' }: { children: ReactNode; color?: string }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2">
      <span className="h-2 w-2 rounded-full" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
      <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color }}>
        {children}
      </span>
    </div>
  );
}

export function InvestorPage() {
  const [deckOpen, setDeckOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [glassesOpen, setGlassesOpen] = useState(false);
  const [mirrorOpen, setMirrorOpen] = useState(false);

  const pillars = [
    { label: 'The market', desc: '$7–10B in smart mirrors, $120B+ in smart glasses, multi-trillion globally. We sit on top of all of it.', color: '#0047FF' },
    { label: 'The moat', desc: 'Five reinforcing edges: SaaS depth, hardware lock-in, 0.7% payments, a consumer network, and one AI brain.', color: '#9D4EDD' },
    { label: 'The entry', desc: 'A $500K bridge today, ahead of a priced $3–5M round. Early — by design.', color: '#FF4500' },
  ];

  const mirrorSteps = [
    { icon: <Eye size={20} />, title: 'Client sits down', desc: 'The mirror activates — no app, no friction.' },
    { icon: <ScanFace size={20} />, title: 'Face capture & analysis', desc: 'It reads face shape, hair, and features in seconds.' },
    { icon: <Hand size={20} />, title: 'Browse styles by gesture', desc: 'Flip through cuts and colors with a wave of the hand.' },
    { icon: <Sparkles size={20} />, title: 'AI previews them', desc: 'Generates a photo-real preview of the client with the cut.' },
    { icon: <Volume2 size={20} />, title: 'Streaming mode', desc: 'After the consult, the mirror becomes their screen — directional speakers keep the sound in that chair, never bleeding into the next one.' },
    { icon: <Mic size={20} />, title: 'Talk with Mylo', desc: 'The same AI brain that runs the shop lives in the mirror — clients just talk to Mylo, hands-free.' },
  ];

  const builds = [
    {
      icon: <Wallet size={22} />,
      name: 'MythOS Wallet',
      tag: 'Payments',
      desc: 'Payments at 0.7% — undercutting the transaction tax and closing the loop.',
      color: '#FF4500',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navigation />

      {/* ===== 1. HOOK ===== */}
      <section className="relative overflow-hidden border-b border-white/10 px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -right-32 -top-24 h-[420px] w-[420px] rounded-full bg-[#0047FF]/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-[360px] w-[360px] rounded-full bg-[#FF4500]/[0.06] blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow>MythOS · Bridge Round · May 2026</Eyebrow>
            <h1 className="mythos-headline-medium text-white sm:whitespace-nowrap">
              What if we told you unicorns are real?
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#B0B0B0]">
              Every generational company looked obvious in hindsight and absurd at the time. MythOS is building the
              operating system for local economies — software, hardware, and payments that compound city by city.
              The bridge round is your seat at the table before the priced round.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {pillars.map((t, i) => (
              <Reveal key={t.label} delay={0.1 + i * 0.08}>
                <div className="h-full rounded-xl border border-white/10 bg-[#111] p-6">
                  <div className="mb-3 h-1 w-10" style={{ background: t.color }} />
                  <h3 className="mb-2 text-lg font-bold text-white">{t.label}</h3>
                  <p className="text-sm leading-relaxed text-[#B0B0B0]">{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 2. VIEW THE DECK ===== */}
      <section className="border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-[#0047FF]/30 bg-gradient-to-br from-[#0047FF]/10 via-[#0A0A0A] to-[#9D4EDD]/10 p-8 sm:p-12">
              <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                <div className="max-w-xl">
                  <Eyebrow>The thesis · 21 slides</Eyebrow>
                  <h2 className="mythos-headline-medium text-white">The whole story, in five minutes.</h2>
                  <p className="mt-4 text-[#B0B0B0]">
                    The problem, the operating system, the hardware, the traction, and the ask — read it right here.
                  </p>
                </div>
                <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => setDeckOpen(true)}
                    data-mythos-track="investors-view-deck-hero"
                    className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#0047FF] px-8 py-4 font-semibold text-white transition-all hover:gap-4 hover:shadow-xl hover:shadow-[#0047FF]/40"
                  >
                    <Play size={20} fill="currentColor" />
                    View the Deck
                  </button>
                  <button
                    onClick={() => setRequestOpen(true)}
                    data-mythos-track="investors-request-copy-hero"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    <FileText size={18} />
                    Request a copy
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 3. THE MIRROR / HARDWARE ===== */}
      <section className="border-b border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow color="#9D4EDD">The hardware</Eyebrow>
            <h2 className="mythos-headline-large max-w-3xl text-white">A smart mirror at every chair.</h2>
            <p className="mt-5 max-w-2xl text-lg text-[#B0B0B0]">
              Software gets copied. Hardware gets installed. The MythOS Mirror turns every barber and salon chair into
              an AI experience — and a moat.
            </p>
            <button
              onClick={() => setMirrorOpen(true)}
              className="group mt-7 inline-flex items-center gap-3 rounded-full bg-[#0047FF] px-8 py-4 font-semibold text-white transition-all hover:gap-4 hover:shadow-xl hover:shadow-[#0047FF]/40"
            >
              <Play size={20} fill="currentColor" />
              Explore the build
            </button>
          </Reveal>

          <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
            {/* Mirror image (placeholder until asset added) */}
            <Reveal>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10">
                <img
                  src="/mirror.png"
                  alt="The MythOS Smart Mirror — in-chair hairstyle preview"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>

            {/* In-chair experience */}
            <div className="space-y-6">
              {mirrorSteps.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.08}>
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[#0047FF]/40 bg-[#0047FF]/10 text-[#0047FF]">
                      {s.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{s.title}</h3>
                      <p className="text-sm text-[#B0B0B0]">{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={0.3}>
                <p className="border-l-2 border-[#FF4500] pl-4 text-sm italic text-[#B0B0B0]">
                  "Decide with confidence. Cut with confidence." Six mirrors per shop means switching off MythOS is a
                  hardware rip-out — that's the moat.
                </p>
              </Reveal>
            </div>
          </div>

          {/* See it live — Minty Barber */}
          <Reveal>
            <div className="mt-12 flex flex-col items-start gap-4 rounded-xl border border-[#0047FF]/30 bg-[#0047FF]/5 p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[#B0B0B0]">
                Want to see our AI try-on tech in action? See it live on one of our customers' websites:
              </p>
              <a
                href="https://www.mintybarber.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-[#0047FF] px-6 py-3 font-semibold text-white transition-all hover:gap-3"
              >
                Visit Minty Barber
                <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>

          {/* ===== Mylo Glasses — dedicated build under the mirror ===== */}
          <div className="mt-20 border-t border-white/10 pt-16">
            <Reveal>
              <Eyebrow color="#FF4500">On the face</Eyebrow>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="mythos-headline-large text-white">Mylo Glasses.</h2>
                <span className="rounded-full border border-[#FF4500]/40 bg-[#FF4500]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#FF4500]">
                  Prototype · roadmap
                </span>
              </div>
              <p className="mt-5 max-w-2xl text-lg text-[#B0B0B0]">
                The mirror is the operating system of the chair. Mylo Glasses are the operating system of the human —
                one premium device with a full in-lens display, putting Mylo on the face of every operator and,
                eventually, everyone on The Network.
              </p>
              <button
                onClick={() => setGlassesOpen(true)}
                className="group mt-7 inline-flex items-center gap-3 rounded-full bg-[#FF4500] px-8 py-4 font-semibold text-white transition-all hover:gap-4 hover:shadow-xl hover:shadow-[#FF4500]/40"
              >
                <Play size={20} fill="currentColor" />
                Explore the build
              </button>
            </Reveal>

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              <Reveal>
                <div className="h-full rounded-2xl border border-white/10 bg-[#111] p-7">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg" style={{ background: "#FF45001A", color: "#FF4500" }}>
                    <Glasses size={22} />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">For operators</h3>
                  <p className="text-sm leading-relaxed text-[#B0B0B0]">
                    Walk in and Mylo briefs you on every client before they sit — last visit's notes, their cut, their
                    preferences. Ask a question and it answers on your glasses while the result renders on the client's
                    mirror.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="h-full rounded-2xl border border-white/10 bg-[#111] p-7">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg" style={{ background: "#0047FF1A", color: "#0047FF" }}>
                    <Sparkles size={22} />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">For everyone else</h3>
                  <p className="text-sm leading-relaxed text-[#B0B0B0]">
                    Your city in your line of sight. At a farmers market Mylo points you to the vendor that matches what
                    you're after; land somewhere new and it surfaces the spots that feel like home.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="mt-4 rounded-2xl border border-[#FF4500]/30 bg-[#FF4500]/5 p-7">
                <h3 className="text-lg font-bold text-white">Profile portability, not facial recognition.</h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#B0B0B0]">
                  Facial recognition tells a business <span className="text-white">who</span> you are. MythOS tells them{" "}
                  <span className="text-white">who you are, what you need, and how to serve you</span> — from a profile{" "}
                  <span className="text-white">you</span> write and control. No biometrics, no surveillance, legally
                  clean. Mylo filters it down to only what's relevant for that business, in that moment.
                </p>
              </div>
            </Reveal>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {[
                { num: '$120B+', label: 'US TAM ceiling — the largest in the MythOS lineup' },
                { num: '$15–25B', label: 'core B2B across ~3M units — barbershops, salons, restaurants, retail' },
                { num: '$899', label: 'one premium SKU · Apple-tier hardware margins at scale' },
              ].map((s, i) => (
                <Reveal key={s.label} delay={0.12 + i * 0.06}>
                  <div className="h-full rounded-xl border border-white/10 bg-[#111] p-6">
                    <div className="mythos-headline-medium text-white">{s.num}</div>
                    <p className="mt-2 text-sm text-[#B0B0B0]">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* One more build */}
          <Reveal>
            <p className="mt-16 mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#707070]">
              And one more build on the roadmap
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {builds.map((b, i) => (
              <Reveal key={b.name} delay={i * 0.1}>
                <div className="flex h-full items-start gap-4 rounded-xl border border-white/10 bg-[#111] p-6">
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg"
                    style={{ background: `${b.color}1A`, color: b.color }}
                  >
                    {b.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white">{b.name}</h3>
                      <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#707070]">
                        {b.tag}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[#B0B0B0]">{b.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. BIG TECH TAX REPORT ===== */}
      <section className="border-b border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow color="#FF4500">Research project · in partnership with UT Dallas</Eyebrow>
            <h2 className="mythos-headline-large max-w-3xl text-white">
              How much is <span className="text-[#FF4500]">Big Tech</span> costing your business?
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-[#B0B0B0]">
              We're quantifying the "Visibility Tax" — what local businesses are forced to spend just to be found
              online — straight from the source.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              { num: '$238B', label: 'Google ad revenue in 2023 alone' },
              { num: '72%', label: 'of SMBs say ad costs rose year over year' },
              { num: '1,000s', label: 'of owner interviews feeding the report' },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="rounded-xl border border-white/10 bg-[#111] p-6">
                  <div className="mythos-stat-number bg-gradient-to-b from-white to-[#8cb4d8] bg-clip-text text-transparent">
                    {s.num}
                  </div>
                  <p className="mt-2 text-sm text-[#B0B0B0]">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-6 text-sm text-[#707070]">
              The findings become the wedge: every dollar of "tax" we document is a dollar MythOS gives back.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== 5. TRACTION ===== */}
      <section className="border-b border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow>Traction</Eyebrow>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { num: '2,732', label: 'unique humans already in the ecosystem' },
              { num: '11,974', label: 'customers reachable through partners' },
              { num: 'MVP', label: 'The Network MVP built — public launch ahead' },
              { num: 'LOIs', label: 'signed commitments from local businesses' },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.07}>
                <div className="h-full rounded-xl border border-white/10 bg-[#111] p-6">
                  <div className="mythos-headline-medium text-white">{s.num}</div>
                  <p className="mt-2 text-sm text-[#B0B0B0]">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. THE ASK ===== */}
      <section className="border-b border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <Eyebrow>The ask</Eyebrow>
              <h2 className="mythos-headline-large text-white">
                <span className="text-[#0047FF]">$500K</span> bridge to ship the proof.
              </h2>
              <p className="mt-5 max-w-md text-lg text-[#B0B0B0]">
                Enough to put mirrors in real chairs, prove the unit economics in one city, and step into a priced
                <span className="text-white"> $3–5M</span> round from strength.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-3">
                {[
                  { k: 'First mirror batch', v: 'Hardware in real shops' },
                  { k: 'San Diego + Dallas', v: 'Prove the model city by city' },
                  { k: 'The team', v: 'Ship faster, sign partners' },
                ].map((row) => (
                  <div key={row.k} className="flex items-center justify-between rounded-xl border border-white/10 bg-[#111] px-6 py-5">
                    <span className="font-semibold text-white">{row.k}</span>
                    <span className="text-right text-sm text-[#B0B0B0]">{row.v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== 7. CONTACT ===== */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="mythos-headline-medium text-white">Start a conversation.</h2>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setDeckOpen(true)}
                data-mythos-track="investors-view-deck-contact"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#0047FF] px-8 py-4 font-semibold text-white transition-all hover:gap-4"
              >
                <Play size={18} fill="currentColor" />
                View the Deck
              </button>
              <button
                onClick={() => setRequestOpen(true)}
                data-mythos-track="investors-request-copy-contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Request the deck & intro <ArrowRight size={18} />
              </button>
            </div>
            <div className="mt-10 space-y-1 text-[#B0B0B0]">
              <p className="font-semibold text-white">Nate Adams</p>
              <p className="text-sm">Founder &amp; CEO · MythOS Systems</p>
              <p className="text-sm">
                <a href="mailto:nateadams@mythosrebellion.com" data-mythos-track="investors-contact-email" className="underline decoration-white/20 transition-colors hover:text-white hover:decoration-white">
                  nateadams@mythosrebellion.com
                </a>
              </p>
              <p className="text-sm">
                <a href="tel:+12144309485" data-mythos-track="investors-contact-phone" className="underline decoration-white/20 transition-colors hover:text-white hover:decoration-white">
                  214-430-9485
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />

      <DeckViewerModal isOpen={deckOpen} onClose={() => setDeckOpen(false)} />
      <GlassesDemoModal isOpen={glassesOpen} onClose={() => setGlassesOpen(false)} />
      <MirrorDemoModal isOpen={mirrorOpen} onClose={() => setMirrorOpen(false)} />
      <InvestorDeckModal isOpen={requestOpen} onClose={() => setRequestOpen(false)} />
    </div>
  );
}
