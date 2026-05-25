import { useEffect } from 'react';
import { X, Maximize2 } from 'lucide-react';

interface DeckViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeckViewerModal({ isOpen, onClose }: DeckViewerModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const openFullscreen = () => {
    window.open('/mythos-deck.html', '_blank', 'noopener');
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Controls */}
      <div className="absolute right-3 top-3 z-10 flex items-center gap-2">
        <button
          onClick={openFullscreen}
          aria-label="Open deck in new tab"
          className="flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-sm font-medium text-[#B0B0B0] transition-colors hover:bg-white/10 hover:text-white"
        >
          <Maximize2 size={16} />
          <span className="hidden sm:inline">Open in tab</span>
        </button>
        <button
          onClick={onClose}
          aria-label="Close deck"
          className="flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          <X size={18} />
          <span className="hidden sm:inline">Close</span>
          <span className="ml-1 hidden text-xs text-[#707070] md:inline">Esc</span>
        </button>
      </div>

      <iframe
        src="/mythos-deck.html"
        title="MythOS · Bridge Round Deck"
        className="h-full w-full border-0"
      />
    </div>
  );
}
