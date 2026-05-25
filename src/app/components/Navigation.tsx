import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems: { label: string; page: string }[] = [
  { label: "Products", page: "products" },
  { label: "For Businesses", page: "business" },
  { label: "About Us", page: "about" },
  { label: "For Investors", page: "investors" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const handleNavigation = (page: string) => {
    (window as any).navigateTo?.(page);
    setOpen(false);
  };

  return (
    <>
      {/* Logo — fixed top-left, transparent, links home */}
      <button
        onClick={() => handleNavigation("home")}
        aria-label="MythOS home"
        className="fixed left-4 top-3 z-50 transition-opacity hover:opacity-80 md:left-6 md:top-4"
      >
        <img src="/MythOS_logo_transparent.png" alt="MythOS" className="h-11 w-auto md:h-16" />
      </button>

      {/* Desktop centered pill nav */}
      <nav className="fixed left-1/2 top-0 z-50 hidden -translate-x-1/2 md:block">
        <div className="flex items-center gap-3 rounded-b-2xl bg-black px-4 py-2 sm:gap-6 md:gap-12 md:rounded-b-3xl md:px-8 lg:gap-14">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNavigation(item.page)}
              className="text-[10px] font-medium uppercase tracking-wider transition-colors sm:text-xs md:text-sm"
              style={{ color: "rgba(245, 245, 240, 0.7)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F5F0")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245, 245, 240, 0.7)")}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="fixed right-4 top-3 z-50 rounded-full border border-white/20 bg-black/70 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-white/10 md:hidden"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile menu panel */}
      {open && (
        <div className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/95 px-6 pb-6 pt-20 backdrop-blur-md md:hidden">
          <div className="flex flex-col">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigation(item.page)}
                className="border-b border-white/5 py-3.5 text-left text-sm font-medium uppercase tracking-wider text-[#B0B0B0] transition-colors hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
