import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const BrandPage = lazy(() => import('./pages/BrandPage'));
const ServicePage = lazy(() => import('./pages/ServicePage'));
const SuburbPage = lazy(() => import('./pages/SuburbPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const AfterHoursPage = lazy(() => import('./pages/AfterHoursPage'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="brand/:brandId" element={<BrandPage />} />
            <Route path="service/:serviceId" element={<ServicePage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogPostPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-of-service" element={<TermsOfService />} />
            <Route path="after-hours" element={<AfterHoursPage />} />
            <Route path=":serviceKeyword/:suburbId" element={<SuburbPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
