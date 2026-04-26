import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
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
const SecondHandPhones = lazy(() => import('./pages/SecondHandPhones'));
const AccessoriesPage = lazy(() => import('./pages/AccessoriesPage'));
const CorporateRepairs = lazy(() => import('./pages/CorporateRepairs'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AboutUs = lazy(() => import('./pages/AboutUs'));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="brand/:brandId" element={<BrandPage />} />
        <Route path="service/:serviceId" element={<ServicePage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-of-service" element={<TermsOfService />} />
        <Route path="after-hours" element={<AfterHoursPage />} />
        <Route path="second-hand-phones" element={<SecondHandPhones />} />
        <Route path="accessories" element={<AccessoriesPage />} />
        <Route path="corporate-repairs" element={<CorporateRepairs />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path=":serviceKeyword/:suburbId" element={<SuburbPage />} />
      </Route>
    </Routes>
  );
}
