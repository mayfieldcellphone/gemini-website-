import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { UIProvider } from './contexts/UIContext';
import RedirectHandler from './components/RedirectHandler';

const Home = lazy(() => import('./pages/Home'));
const BrandPage = lazy(() => import('./pages/BrandPage'));
const ServicePage = lazy(() => import('./pages/ServicePage'));
const SuburbPage = lazy(() => import('./pages/SuburbPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const AfterHoursPage = lazy(() => import('./pages/AfterHoursPage'));
const SecondHandPhones = lazy(() => import('./pages/SecondHandPhones'));
const AccessoriesPage = lazy(() => import('./pages/AccessoriesPage'));
const CorporateRepairs = lazy(() => import('./pages/CorporateRepairs'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const SitemapPage = lazy(() => import('./pages/SitemapPage'));
const FreeQuotePage = lazy(() => import('./pages/FreeQuotePage'));
const RepairGuides = lazy(() => import('./pages/RepairGuides'));
const PillarPage = lazy(() => import('./pages/PillarPage'));
const ModelRepairPage = lazy(() => import('./pages/ModelRepairPage'));
const SuburbHubPage = lazy(() => import('./pages/SuburbHubPage'));
const WarrantyGuidePage = lazy(() => import('./pages/WarrantyGuidePage'));
const InsuranceClaimPage = lazy(() => import('./pages/InsuranceClaimPage'));
const PaymentOptionsPage = lazy(() => import('./pages/PaymentOptionsPage'));
const TradeInPage = lazy(() => import('./pages/TradeInPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <UIProvider>
      <RedirectHandler />
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/quote" element={<FreeQuotePage />} />
        <Route path="/free-quote" element={<FreeQuotePage />} />
        <Route path="/promo" element={<FreeQuotePage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="brand/:brandId" element={<BrandPage />} />
          <Route path="service/:serviceId" element={<ServicePage />} />
          <Route path="repair-guides" element={<RepairGuides />} />
          <Route path="repair-guides/:slug" element={<PillarPage />} />
          
          {/* Model Specific Routes */}
          <Route path="iphone/:modelSlug" element={<ModelRepairPage />} />
          <Route path="samsung/:modelSlug" element={<ModelRepairPage />} />
          <Route path="google/:modelSlug" element={<ModelRepairPage />} />

          {/* Suburb Hub Routes */}
          <Route path="phone-repair/:suburbSlug" element={<SuburbHubPage />} />
          <Route path="phone-repair/:suburbSlug/:serviceKeyword" element={<SuburbHubPage />} />
          <Route path="location/:suburbSlug" element={<SuburbHubPage />} />

          {/* Warranty & Insurance & Financing & Trade-In Guides */}
          <Route path="phone-repair-warranty-australia-guide" element={<WarrantyGuidePage />} />
          <Route path="insurance-claim-repairs" element={<InsuranceClaimPage />} />
          <Route path="payment-options" element={<PaymentOptionsPage />} />
          <Route path="trade-in" element={<TradeInPage />} />

          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="after-hours" element={<AfterHoursPage />} />
          <Route path="second-hand-phones" element={<SecondHandPhones />} />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route path="corporate-repairs" element={<CorporateRepairs />} />
          <Route path="sitemap" element={<SitemapPage />} />
          <Route path=":serviceKeyword/:suburbId" element={<SuburbPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </UIProvider>
  );
}
