import { X, Instagram, Mail } from 'lucide-react';

interface EventInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  blurb: string;
}

/**
 * Generic inquiry modal for event CTAs (sponsor, apply to compete, etc.).
 * Routes to the team's real channels (Instagram DM + email), matching the
 * site's existing modal pattern.
 */
export function EventInquiryModal({ isOpen, onClose, title, blurb }: EventInquiryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md rounded-xl border border-white/20 bg-[#000000] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-[#B0B0B0] transition-colors hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="mb-8 text-center">
          <h2 className="mb-3 text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-headline)' }}>
            {title}
          </h2>
          <p className="text-lg text-[#B0B0B0]">{blurb}</p>
        </div>

        <a
          href="https://www.instagram.com/mythosrebellion/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex w-full items-center justify-center gap-4 rounded-lg bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F56040] p-5 text-white transition-opacity hover:opacity-90"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:scale-110">
            <Instagram size={24} />
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold">@mythosrebellion</div>
            <div className="text-xs opacity-90">DM us to get started</div>
          </div>
        </a>

        <a
          href="mailto:hello@mythosrebellion.com"
          className="mt-3 flex w-full items-center justify-center gap-3 rounded-lg border border-white/15 p-4 text-white transition-colors hover:bg-white/5"
        >
          <Mail size={18} style={{ color: '#FF4500' }} />
          <span className="text-sm font-semibold">hello@mythosrebellion.com</span>
        </a>
      </div>
    </div>
  );
}
