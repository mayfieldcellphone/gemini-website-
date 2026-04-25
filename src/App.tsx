import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import BrandPage from './pages/BrandPage';
import ServicePage from './pages/ServicePage';
import SuburbPage from './pages/SuburbPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AfterHoursPage from './pages/AfterHoursPage';

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
