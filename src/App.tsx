import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import BrandPage from './pages/BrandPage';
import ServicePage from './pages/ServicePage';
import SuburbPage from './pages/SuburbPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="brand/:brandId" element={<BrandPage />} />
          <Route path="service/:serviceId" element={<ServicePage />} />
          <Route path="phone-repair/:suburbId" element={<SuburbPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
