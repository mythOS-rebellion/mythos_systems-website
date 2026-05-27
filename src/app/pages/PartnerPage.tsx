import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { BIDChamberModal } from '../components/BIDChamberModal';
import { EarlyAdopterModal } from '../components/EarlyAdopterModal';
import { AffiliateModal } from '../components/AffiliateModal';
import { JobApplicationModal } from '../components/JobApplicationModal';
import { GetInvolvedModal } from '../components/GetInvolvedModal';
import FlowArt, { FlowSection } from '../components/ui/story-scroll';

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const ACCENT = '#FF4500';
const HEAD = 'text-[clamp(2rem,4.6vw,3.4rem)] font-bold leading-[1.08] tracking-tight';

export function PartnerPage() {
  const [isBIDModalOpen, setIsBIDModalOpen] = useState(false);
  const [isEarlyAdopterModalOpen, setIsEarlyAdopterModalOpen] = useState(false);
  const [isAffiliateModalOpen, setIsAffiliateModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const tracks = [
    {
      num: '01',
      short: 'Districts & Chambers',
      title: 'Business Improvement Districts & Chambers of Commerce',
      blurb:
        'You’ve been advocating for local businesses long before we showed up. Now let’s give your members the tools they actually need.',
      listTitle: 'What you get',
      items: [
        'Discounted MythOS Pro for every business in your district or chamber',
        'Free onboarding to The Network for every member',
        'Commission on businesses that sign up through your organization',
        'Co-branded marketing materials, so members know you brought them this',
      ],
      cta: 'Partner with us',
      onClick: () => setIsBIDModalOpen(true),
    },
    {
      num: '02',
      short: 'Small Businesses',
      title: 'Small Businesses & Early Adopters',
      blurb:
        'Host your business on The Network before the citywide rollout, accept Myth Credits from customers, and get two weeks of MythOS Pro free. Early presence means early visibility.',
      listTitle: 'What you get',
      items: [
        'Two weeks of MythOS Pro, free',
        'Free local discovery on The Network',
        'Myth Credits that local customers can spend at your business',
      ],
      cta: 'Be first in your city',
      onClick: () => setIsEarlyAdopterModalOpen(true),
    },
    {
      num: '03',
      short: 'Creators & Affiliates',
      title: 'Creators & Affiliates',
      blurb:
        'If you have an audience that cares about supporting local, fighting monopolies, or just discovering their city differently, let’s work together.',
      listTitle: '',
      items: [],
      cta: 'Join as an affiliate',
      onClick: () => setIsAffiliateModalOpen(true),
    },
    {
      num: '04',
      short: 'Join the Team',
      title: 'Join the Team',
      blurb:
        'We’re hiring people who want to fight, not just work. A company that proves you can compete with Big Tech without becoming Big Tech. Fair pay, real equity, a mission that matters.',
      listTitle: 'Who we need',
      items: [
        'People who execute',
        'People who care',
        'People who understand this isn’t just another startup, it’s a rebellion',
      ],
      cta: 'Submit application',
      onClick: () => setIsJobModalOpen(true),
    },
  ];

  return (
    <div className="relative bg-[#000000] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60]"
        style={{ backgroundImage: GRAIN, backgroundSize: '200px 200px', opacity: 0.05, mixBlendMode: 'overlay' }}
      />
      <Navigation />

      <FlowArt aria-label="Become a partner">
        {/* ===== HERO ===== */}
        <FlowSection aria-label="For partners" style={{ backgroundColor: '#000000', color: '#fff' }}>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }} />
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
              MythOS · For Partners
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-center">
            <h1 className="mythos-headline-large max-w-4xl text-white">
              Build the rebellion <span style={{ color: ACCENT }}>with us.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#B0B0B0] md:text-xl">
              MythOS isn’t something we build alone. It’s built with the people who’ve been fighting for local all
              along.
            </p>
          </div>

          {/* Who we're looking for: previews the sections below */}
          <div>
            <div className="mb-6 font-mono text-base font-semibold uppercase tracking-[0.28em] sm:text-lg" style={{ color: ACCENT }}>
              Who we’re looking for
            </div>
            <div className="grid grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-4">
              {tracks.map((t) => (
                <div key={t.num} className="flex items-baseline gap-3 border-t border-white/15 pt-5">
                  <span className="font-mono text-base font-bold" style={{ color: ACCENT }}>
                    {t.num}
                  </span>
                  <span className="text-xl font-semibold leading-snug text-white md:text-2xl">{t.short}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-[#707070]">Scroll ↓</p>
          </div>
        </FlowSection>

        {/* ===== TRACKS ===== */}
        {tracks.map((t) => (
          <FlowSection key={t.num} aria-label={t.title} style={{ backgroundColor: '#000000', color: '#fff' }}>
            <div className="border-t border-white/10 pt-6">
              <span className="font-mono text-sm font-bold" style={{ color: ACCENT }}>
                {t.num}
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-center gap-8">
              <h2 className={`${HEAD} max-w-4xl text-white`} style={{ fontFamily: 'var(--font-headline)' }}>
                {t.title}
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-[#B0B0B0] md:text-xl">{t.blurb}</p>

              {t.items.length > 0 && (
                <div>
                  {t.listTitle && (
                    <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#707070]">
                      {t.listTitle}
                    </div>
                  )}
                  <ul className="space-y-3">
                    {t.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[#C9C5BA]">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: ACCENT }} />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              onClick={t.onClick}
              className="group inline-flex w-fit items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold text-white transition-all hover:gap-3 hover:shadow-lg"
              style={{ backgroundColor: ACCENT, boxShadow: '0 0 0 transparent' }}
            >
              {t.cta}
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </FlowSection>
        ))}

        {/* ===== CLOSE ===== */}
        <FlowSection aria-label="Get in touch" style={{ backgroundColor: '#000000', color: '#fff' }}>
          <div className="border-t border-white/10 pt-6">
            <span className="font-mono text-sm font-bold" style={{ color: ACCENT }}>
              Get in touch
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-6">
            <h2 className={`${HEAD} text-white`} style={{ fontFamily: 'var(--font-headline)' }}>
              Let’s build this together.
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-[#B0B0B0] md:text-xl">
              MythOS only works if we’re all in this. Everyone who’s been waiting for someone to actually fight back.
              That’s us, that’s you.
            </p>
          </div>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="group inline-flex w-fit items-center gap-2 rounded-full px-9 py-4 text-lg font-semibold text-white transition-all hover:gap-3 hover:shadow-lg"
            style={{ backgroundColor: ACCENT }}
          >
            Contact us
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </FlowSection>
      </FlowArt>

      {/* Modals */}
      <BIDChamberModal isOpen={isBIDModalOpen} onClose={() => setIsBIDModalOpen(false)} />
      <EarlyAdopterModal isOpen={isEarlyAdopterModalOpen} onClose={() => setIsEarlyAdopterModalOpen(false)} />
      <AffiliateModal isOpen={isAffiliateModalOpen} onClose={() => setIsAffiliateModalOpen(false)} />
      <JobApplicationModal isOpen={isJobModalOpen} onClose={() => setIsJobModalOpen(false)} />
      <GetInvolvedModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
}
