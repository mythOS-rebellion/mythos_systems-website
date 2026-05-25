import { useState, useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ForBusinessesPage } from './pages/ForBusinessesPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { InvestorPage } from './components/InvestorPage';
import { FAQ } from './components/FAQ';
import { SanDiegoPage } from './pages/SanDiegoPage';
import { DFWPage } from './pages/DFWPage';
import { PartnerPage } from './pages/PartnerPage';

type PageType = 'home' | 'products' | 'business' | 'about' | 'investors' | 'faq' | 'sandiego' | 'dfw' | 'partner';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  // Make setCurrentPage available globally for navigation
  useEffect(() => {
    (window as any).navigateTo = (page: PageType) => {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    };
  }, []);

  // Render the appropriate page
  switch (currentPage) {
    case 'products':
      return <ProductsPage />;
    case 'business':
      return <ForBusinessesPage />;
    case 'about':
      return <AboutUsPage />;
    case 'investors':
      return <InvestorPage />;
    case 'faq':
      return <FAQ />;
    case 'sandiego':
      return <SanDiegoPage />;
    case 'dfw':
      return <DFWPage />;
    case 'partner':
      return <PartnerPage />;
    default:
      return <HomePage />;
  }
}