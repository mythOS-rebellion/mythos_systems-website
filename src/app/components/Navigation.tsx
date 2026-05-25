const navItems: { label: string; page: string }[] = [
  { label: "Products", page: "products" },
  { label: "For Businesses", page: "business" },
  { label: "About Us", page: "about" },
  { label: "For Investors", page: "investors" },
];

export function Navigation() {
  const handleNavigation = (page: string) => (window as any).navigateTo?.(page);

  return (
    <>
      {/* Logo — fixed top-left, transparent, links home */}
      <button
        onClick={() => handleNavigation("home")}
        aria-label="MythOS home"
        className="fixed left-4 top-3 z-50 transition-opacity hover:opacity-80 md:left-6 md:top-4"
      >
        <img src="/MythOS_logo_transparent.png" alt="MythOS" className="h-12 w-auto md:h-16" />
      </button>

      <nav className="fixed left-1/2 top-0 z-50 -translate-x-1/2">
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
    </>
  );
}
