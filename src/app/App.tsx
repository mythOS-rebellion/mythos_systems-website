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

/** Map state-routing page names → URL paths. Plain home stays at "/". */
const PATH_FOR: Record<PageType, string> = {
  home: '/',
  products: '/products',
  business: '/for-businesses',
  about: '/about',
  investors: '/investors',
  faq: '/faq',
  sandiego: '/san-diego',
  dfw: '/dfw',
  partner: '/partner',
};

const PAGE_FOR_PATH = (() => {
  const m: Record<string, PageType> = {};
  for (const k of Object.keys(PATH_FOR) as PageType[]) m[PATH_FOR[k]] = k;
  return m;
})();

function pageFromUrl(): PageType {
  if (typeof window === 'undefined') return 'home';
  return PAGE_FOR_PATH[window.location.pathname] ?? 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>(() => pageFromUrl());

  // Make setCurrentPage available globally for navigation. The pushState
  // call is what lets the analytics tracker (getinfo.js) register an SPA
  // navigation as a page_view with the right url_path; without it every
  // event records as "/".
  useEffect(() => {
    (window as any).navigateTo = (page: PageType) => {
      const path = PATH_FOR[page] ?? '/';
      if (window.location.pathname !== path) {
        window.history.pushState({ page }, '', path);
      }
      setCurrentPage(page);
      window.scrollTo(0, 0);
    };

    // Honor back/forward by reading the URL.
    const onPop = () => setCurrentPage(pageFromUrl());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
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