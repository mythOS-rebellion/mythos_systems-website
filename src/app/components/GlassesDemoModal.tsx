import { useEffect } from 'react';
import { X, Maximize2 } from 'lucide-react';

const DEMO_URL = '/glasses-demo/glasses/index.html';

interface GlassesDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlassesDemoModal({ isOpen, onClose }: GlassesDemoModalProps) {
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

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute right-3 top-3 z-10 flex items-center gap-2">
        <button
          onClick={() => window.open(DEMO_URL, '_blank', 'noopener')}
          aria-label="Open demo in new tab"
          className="flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-sm font-medium text-[#B0B0B0] transition-colors hover:bg-white/10 hover:text-white"
        >
          <Maximize2 size={16} />
          <span className="hidden sm:inline">Open in tab</span>
        </button>
        <button
          onClick={onClose}
          aria-label="Close demo"
          className="flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          <X size={18} />
          <span className="hidden sm:inline">Close</span>
          <span className="ml-1 hidden text-xs text-[#707070] md:inline">Esc</span>
        </button>
      </div>

      <iframe
        src={DEMO_URL}
        title="MythOS Glasses - interactive build demo"
        className="h-full w-full border-0"
        allow="accelerometer; gyroscope; magnetometer; xr-spatial-tracking; fullscreen"
      />
    </div>
  );
}
