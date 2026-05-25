import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logoImage from 'figma:asset/33550db75458060d4d897bcdc8d170a678e1b3a0.png';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (page: string) => {
    (window as any).navigateTo?.(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#000000] backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button onClick={() => handleNavigation('home')} className="block">
              <img 
                src={logoImage} 
                alt="MythOS Logo" 
                className="h-16 w-auto"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleNavigation('products')} className="text-[#B0B0B0] hover:text-white transition-colors">
              Products
            </button>
            <button onClick={() => handleNavigation('business')} className="text-[#B0B0B0] hover:text-white transition-colors">
              For Businesses
            </button>
            <button onClick={() => handleNavigation('about')} className="text-[#B0B0B0] hover:text-white transition-colors">
              About Us
            </button>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => handleNavigation('investors')}
              className="text-sm text-[#B0B0B0] hover:text-white transition-colors"
            >
              For Investors
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-t border-white/10">
          <div className="px-4 py-6 space-y-4">
            <button onClick={() => handleNavigation('products')} className="block w-full text-left text-[#B0B0B0] hover:text-white transition-colors py-2">
              Products
            </button>
            <button onClick={() => handleNavigation('business')} className="block w-full text-left text-[#B0B0B0] hover:text-white transition-colors py-2">
              For Businesses
            </button>
            <button onClick={() => handleNavigation('about')} className="block w-full text-left text-[#B0B0B0] hover:text-white transition-colors py-2">
              About Us
            </button>
            <button onClick={() => handleNavigation('investors')} className="block w-full text-left text-[#B0B0B0] hover:text-white transition-colors py-2">
              For Investors
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}