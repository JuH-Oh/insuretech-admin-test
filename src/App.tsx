import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import DashboardPage from '@/pages/dashboard';
import ClaimsPage from '@/pages/claims';
import TypeAPage from '@/pages/type-a';
import TypeBPage from '@/pages/type-b';
import TypeCPage from '@/pages/type-c';
import FieldCheckPage from '@/pages/field';
import EstimationPage from '@/pages/estimation';
import ApprovePage from '@/pages/approve';
import OpinionPage from '@/pages/opinion';
import AppealsPage from '@/pages/appeals';
import IndemnityPage from '@/pages/indemnity';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/claims" element={<ClaimsPage />} />
        <Route path="/type-a" element={<TypeAPage />} />
        <Route path="/type-b" element={<TypeBPage />} />
        <Route path="/type-c" element={<TypeCPage />} />
        <Route path="/field" element={<FieldCheckPage />} />
        <Route path="/estimation" element={<EstimationPage />} />
        <Route path="/approve" element={<ApprovePage />} />
        <Route path="/opinion" element={<OpinionPage />} />
        <Route path="/appeals" element={<AppealsPage />} />
        <Route path="/indemnity" element={<IndemnityPage />} />
      </Route>
    </Routes>
  );
}
